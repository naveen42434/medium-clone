from fastapi import FastAPI
from Routes.Authentication.auth import router as authRouter
from Routes.blog import router as blogRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "https://familiar-gertruda-student-cit-c4d3a108.koyeb.app",
    "https://medium-clone-git-main-naveenkumars-projects-0bc3db22.vercel.app",
    "https://medium-clone-ashen-iota.vercel.app",
    "https://medium-clone-r7p5s24xs-naveenkumars-projects-0bc3db22.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Health Check": "Success"}


app.include_router(authRouter,prefix="/api/v1/user")
app.include_router(blogRouter,prefix="/api/v1/blog")