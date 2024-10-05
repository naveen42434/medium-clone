import middleware
import schemas
from fastapi import status, HTTPException, APIRouter, Depends
from prisma import Prisma

router = APIRouter(
    tags=['Blogs']
)

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_blogs(blog_data: schemas.BlogCreate, user: schemas.TokenData = Depends(middleware.get_current_user)):
    db = Prisma()
    await db.connect()

    try:
        new_blog = await db.blog.create(
            data={"title": blog_data.title,
                  "content": blog_data.content,
                  "published": blog_data.published,
                  "authorId": user.id}
        )
        return {"id": new_blog.id}

    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        await db.disconnect()

@router.put("/", status_code=status.HTTP_200_OK)
async def update_blogs(blog_data: schemas.BlogUpdate, user: schemas.TokenData = Depends(middleware.get_current_user)):
    db = Prisma()
    await db.connect()

    try:
        blog = await db.blog.find_unique(where={"id": blog_data.id})
        if blog is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")

        if blog.authorId != user.id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You are not authorized to update this blog")

        updated_blog = await db.blog.update(
            where={"id": blog_data.id},
            data={"title": blog_data.title, "content": blog_data.content}
        )
        return {"id": updated_blog.id}

    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        await db.disconnect()

@router.get("/bulk", status_code=status.HTTP_200_OK)
async def get_all_blogs(user: schemas.TokenData = Depends(middleware.get_current_user)):
    db = Prisma()
    await db.connect()

    try:
        blogs = await db.blog.find_many(include={"author": True})

        formatted_blogs = [
            {
                "content": blog.content,
                "title": blog.title,
                "id": blog.id,
                "author": {
                    "name": blog.author.name
                }
            }
            for blog in blogs
        ]

        return {"blogs": formatted_blogs}
    except Exception as e:
        print(f"Error fetching blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Error while fetching blog post")
    finally:
        await db.disconnect()


@router.get("/{blog_id}", status_code=status.HTTP_200_OK)
async def get_blogs(blog_id: int, user: schemas.TokenData = Depends(middleware.get_current_user)):

    db = Prisma()
    await db.connect()

    try:
        blog = await db.blog.find_unique(
            where={"id": blog_id},
            include= {
                "author": True
        })
        if blog is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")

        formatted_blog = {
            "id": blog.id,
            "content": blog.content,
            "title": blog.title,
            "author": {
                "name": blog.author.name
            }
        }

        return {"blog": formatted_blog}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error while fetching blog post")
    finally:
        await db.disconnect()