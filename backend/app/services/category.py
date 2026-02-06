from fastapi import HTTPException
from sqlmodel import Session

from app.models.category import Category
from app.repositories.category import CategoryRepository
from app.schemas.category import CategoryCreate, CategoryRead, CategoryUpdate

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
        if existing_category:
            raise HTTPException(status_code=400, detail="Category with this name already exists")
        
        if existing_category and not existing_category.active:
            existing_category.active = True
            existing_category.default_budget = category_in.default_budget
            existing_category.description = category_in.description
            existing_category.name = category_in.name
            return self.repository.update(existing_category)
        
        return self.repository.create(data=category_in.dict(), user_id=user_id)

    def list_categories(self, *, user_id: int) -> list[CategoryRead]:
        return self.repository.list(user_id=user_id)
    
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

        if payload.description is not None:
            obj.description = payload.description

        if payload.active is not None:
            obj.active = payload.active

        return self.repository.update(obj)

    def delete(self, *, user_id: int, category_id: int) -> None:
        category = self.get_or_404(user_id=user_id, category_id=category_id)

        if not category.active:
            return category
        
        self.repository.delete(category=category)

    def restore(self, *, user_id: int, category_id: int) -> CategoryRead:
        category = self.get_or_404(user_id=user_id, category_id=category_id)

        if category.active:
            return category
        
        category.active = True
        return self.repository.update(category)
    
    def deactivate(self, *, user_id: int, category_id: int) -> CategoryRead:
        category = self.get_or_404(user_id=user_id, category_id=category_id)

        if not category.active:
            return category
        
        category.active = False
        return self.repository.update(category)
    
    def get_by_id(self, *, user_id: int, category_id: int) -> CategoryRead:
        category = self.get_or_404(user_id=user_id, category_id=category_id)
        return category
    
    def get_by_name(self, *, user_id: int, name: str) -> CategoryRead:
        category = self.repository.get_by_name(name=name, user_id=user_id)
        if category is None or not category.active:
            raise HTTPException(status_code=404, detail="Category not found")
        return category