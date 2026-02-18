from fastapi import FastAPI
from .database import engine
from .models import Base
from .routes import employee, attendance
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from .database import engine
 # make sure this matches your setup

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee.router, prefix="/employees", tags=["Employees"])
app.include_router(attendance.router, prefix="/attendance", tags=["Attendance"])





