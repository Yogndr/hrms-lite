from fastapi import FastAPI
from .database import engine
from .models import Base
from .routes import employee, attendance
from fastapi.middleware.cors import CORSMiddleware

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Initialize FastAPI
app = FastAPI(title="HRMS Lite API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, you can restrict to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(employee.router, prefix="/employees", tags=["Employees"])
app.include_router(attendance.router, prefix="/attendance", tags=["Attendance"])

# Run locally
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
