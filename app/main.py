from fastapi import FastAPI
from app.routes import room, timetable
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(title="Campus Space AI")

# This block allows your React frontend to connect!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(room.router)
app.include_router(timetable.router)

@app.get("/")
def home():
    return {"message": "Campus Space AI API Running Successfully"}
