from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import date
from ..database import SessionLocal
from .. import models, schemas

router = APIRouter()


# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# MARK Attendance
@router.post("/", response_model=schemas.AttendanceResponse, status_code=status.HTTP_201_CREATED)
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):

    # Check employee exists
    employee = db.query(models.Employee).filter(
        models.Employee.id == attendance.employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    # Prevent duplicate attendance for same date
    existing_attendance = db.query(models.Attendance).filter(
        models.Attendance.employee_id == attendance.employee_id,
        models.Attendance.date == attendance.date
    ).first()

    if existing_attendance:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Attendance already marked for this date"
        )

    new_attendance = models.Attendance(
        employee_id=attendance.employee_id,
        date=attendance.date,
        status=attendance.status
    )

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    return new_attendance


# GET Attendance by Employee
# GET Attendance by Employee
@router.get("/{employee_id}", response_model=list[schemas.AttendanceResponse])
def get_employee_attendance(
    employee_id: int,
    start_date: date | None = None,
    end_date: date | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    )

    if start_date:
        query = query.filter(models.Attendance.date >= start_date)
    if end_date:
        query = query.filter(models.Attendance.date <= end_date)

    records = query.all()
    return records  # Return empty list if no records

