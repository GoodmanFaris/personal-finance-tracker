from typing import Optional, List
from sqlmodel import Session, select
from app.models.category import Category

class CategoryRepository:
    def __init__(self, session: Session):
        self.session = session

    def create(self, *, data: dict, user_id: int) -> Category:
        obj = Category(**data, user_id=user_id)
        self.session.add(obj)
        self.session.commit()
        self.session.refresh(obj)
        return obj
    
    def list(self, *, user_id: int) -> List[Category]:
        statement = select(Category).where(Category.user_id == user_id, Category.active == True).order_by(Category.id)
        results = self.session.exec(statement).all()
        return results

    def get_by_id(self, *, category_id: int, user_id: int) -> Optional[Category]:
        statement = select(Category).where(Category.id == category_id, Category.user_id == user_id, Category.active == True)
        result = self.session.exec(statement).first()
        return result
    
    def get_by_name(self, *, name: str, user_id: int) -> Optional[Category]:
        statement = select(Category).where(Category.name == name, Category.user_id == user_id, Category.active == True)
        result = self.session.exec(statement).first()
        return result

    def delete(self, *, category: Category) -> None:
        category.active = False
        self.session.add(category)
        self.session.commit()
        self.session.refresh(category)
        return category