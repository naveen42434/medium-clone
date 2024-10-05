import os
from dotenv import load_dotenv
import middleware
import schemas
from fastapi import status, HTTPException,APIRouter
from fastapi.responses import PlainTextResponse
from prisma import Prisma
from Utils import utils

router = APIRouter(
    tags=['Authentication']
)

@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def create_user(user: schemas.UserCreate):

    load_dotenv()
    db = Prisma()
    await db.connect()

    try:
        hashed_password = utils.hash(user.password)
        user_data = user.model_dump(exclude_none=True)
        user_data["password"] = hashed_password

        new_user = await db.user.create(data=user_data)
        access_token = middleware.create_access_token(data = {"id": new_user.id,"secret":os.environ["JWT_SECRET"]})
        return PlainTextResponse(content=access_token)
    except Exception as e:
        raise HTTPException(status_code=411,detail=f"Unexpected error: {str(e)}")
    finally:
        await db.disconnect()


@router.post("/signin", status_code=status.HTTP_200_OK)
async def login(user: schemas.UserLogin):

    load_dotenv()
    db = Prisma()
    await db.connect()

    existing_user = await db.user.find_unique(where={"username": user.username})

    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid credentials"
        )

    if not utils.verify(user.password,existing_user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid credentials"
        )

    access_token = middleware.create_access_token(data={"id": existing_user.id,"secret": os.environ["JWT_SECRET"]})

    return PlainTextResponse(content=access_token)