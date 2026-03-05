from datetime import date
from fastapi import HTTPException
from sqlmodel import Session
import logging
from app.models.category import Category
from app.repositories.category import CategoryRepository
from app.schemas.category import CategoryCreate, CategoryRead, CategoryUpdate
from app.services.balance import BalanceService
from app.core.formating import date_to_str_month
from app.core.validators import validate_month

global Already_reset
Already_reset = 1

class CategoryService:
    def __init__(self, session: Session):
        self.session = session
        self.repository = CategoryRepository(session)

    def get_or_404(self, *, user_id: int, category_id: int) -> Category:
        obj = self.repository.get_by_id(user_id=user_id, category_id=category_id)
        if obj is None:
            raise HTTPException(status_code=404, detail="Category not found")
        return obj
    

    def create(self, *, user_id: int, category_in: CategoryCreate) -> CategoryRead:
        if category_in.default_budget < 0:
            raise HTTPException(status_code=400, detail="Default budget cannot be negative")
        
        existing_category = self.repository.get_by_name(name=category_in.name, user_id=user_id)

        month_in = date_to_str_month(date.today())
        if month_in is None:
            raise HTTPException(status_code=400, detail="Invalid month format. Expected YYYY-MM")

        if not validate_month(month_in):
            raise HTTPException(status_code=400, detail="Invalid month format. Expected YYYY-MM")

        if existing_category and existing_category.active:
            raise HTTPException(status_code=400, detail="Category with this name already exists")

        if existing_category and not existing_category.active:
            existing_category.active = True
            existing_category.default_budget = category_in.default_budget
            existing_category.description = category_in.description
            existing_category.name = category_in.name
            existing_category.budget = category_in.default_budget
            existing_category.month = month_in
            return self.repository.update(existing_category)

        payload = category_in.dict(exclude_unset=True)
        payload["budget"] = category_in.default_budget
        payload["month"] = month_in
        payload["active"] = True
        return self.repository.create(data=payload, user_id=user_id)

    def list_categories(self, *, user_id: int) -> list[CategoryRead]:
        return self.repository.list(user_id=user_id)
    
    def total_active_categories(self, *, user_id: int) -> int:
        categories = self.repository.list(user_id=user_id)
        return len(categories)
    
    def list_all_categories_including_inactive(self, *, user_id: int) -> list[CategoryRead]:
        return self.repository.list_all(user_id=user_id)

    def update(self, *, user_id: int, category_id: int, payload: CategoryUpdate) -> CategoryRead:
        obj = self.get_or_404(user_id=user_id, category_id=category_id)

        if not obj.active:
            raise HTTPException(status_code=400, detail="Cannot update an inactive category")
        
        if payload.name is not None and payload.name != obj.name:
            existing_category = self.repository.get_by_name(name=payload.name, user_id=user_id)
            if existing_category:
                raise HTTPException(status_code=400, detail="Category with this name already exists")
            obj.name = payload.name
        
        if payload.default_budget is not None:
            if payload.default_budget < 0:
                raise HTTPException(status_code=400, detail="Default budget cannot be negative")
            obj.default_budget = payload.default_budget
            obj.budget = payload.default_budget

        if payload.description is not None:
            obj.description = payload.description

        if payload.active is not None:
            obj.active = payload.active

        if payload.month is not None:
            if validate_month(payload.month) == False:
                raise HTTPException(status_code=400, detail="Invalid month format. Expected YYYY-MM")
            obj.month = payload.month

        return self.repository.update(obj)

    def delete(self, *, user_id: int, category_id: int) -> None:
        category = self.get_or_404(user_id=user_id, category_id=category_id)

        #current date in format YYYY-MM
        #current_month = date_to_str_month(date.today())

        if not category.active:
            raise HTTPException(status_code=400, detail="Category is already inactive")
        #BalanceService(self.session).recompute_balance(user_id=user_id, month=current_month)
        self.repository.delete(category=category)

    def restore(self, *, user_id: int, category_id: int) -> CategoryRead:
        category = self.get_or_404(user_id=user_id, category_id=category_id)

        if category.active:
            return category
        #current_month = date_to_str_month(date.today())
        category.active = True
        #BalanceService(self.session).recompute_balance(user_id=user_id, month=current_month)
        return self.repository.update(category)
    
    def deactivate(self, *, user_id: int, category_id: int) -> CategoryRead:
        category = self.get_or_404(user_id=user_id, category_id=category_id)
        #current_month = date_to_str_month(date.today())
        if not category.active:
            return category
        
        category.active = False
        #BalanceService(self.session).recompute_balance(user_id=user_id, month=current_month)
        return self.repository.update(category)
    
    def get_by_id(self, *, user_id: int, category_id: int) -> CategoryRead:
        category = self.get_or_404(user_id=user_id, category_id=category_id)
        return category
    
    def get_by_name(self, *, user_id: int, name: str) -> CategoryRead:
        category = self.repository.get_by_name(name=name, user_id=user_id)
        if category is None or not category.active:
            raise HTTPException(status_code=404, detail="Category not found")
        return category
    
    from datetime import date

    def copy_monthly_reset(self, *, user_id: int) -> list[CategoryRead]:
        current_categories = self.list_categories(user_id=user_id)

        if not current_categories:
            return current_categories

        current_month = date_to_str_month(date.today()) 
        
        if current_categories[0].month == current_month:
            return current_categories

        old_month = current_categories[0].month

        for category in current_categories:
            old_name = category.name
            category.name = f"{old_name} - {old_month}"
            category.active = False
            self.repository.update(category)

            self.create(
                user_id=user_id,
                category_in=CategoryCreate(
                    name=old_name,
                    description=category.description,
                    default_budget=category.default_budget,
                    budget=category.default_budget,
                ),
            )

        return self.list_categories(user_id=user_id)
