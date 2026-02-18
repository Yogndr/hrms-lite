from pydantic import BaseModel, EmailStr
from datetime import date
from enum import Enum



class AttendanceStatus(str, Enum):
    present = "present"
    absent = "absent"
    leave = "leave"



class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class EmployeeResponse(EmployeeCreate):
    id: int

    class Config:
        from_attributes = True



class AttendanceCreate(BaseModel):
    employee_id: int   # This refers to Employee.id (DB primary key)
    date: date
    status: AttendanceStatus


class AttendanceResponse(AttendanceCreate):
    id: int
    

    class Config:
        from_attributes = True
