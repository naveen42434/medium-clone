from pydantic import BaseModel,EmailStr
from typing import Optional

class UserCreate(BaseModel):
    username: str
    password: str
    name: str

class UserLogin(BaseModel):
    username: str
    password: str

class BlogCreate(BaseModel):
    title: str
    content: str
    published: Optional[bool] = False

class BlogUpdate(BaseModel):
    id: int
    title: str
    content: str

class TokenData(BaseModel):
    id: int