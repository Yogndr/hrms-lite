# HRMS Lite

## Project Overview
HRMS Lite is a lightweight Human Resource Management System that allows an admin to:
- Manage employee records (add, view, delete employees)
- Track daily attendance for employees
- Filter attendance by date and view total present days

The application is built as a **full-stack web app** with a React frontend, FastAPI backend, and PostgreSQL database.

---

## Tech Stack Used
- **Frontend:** React.js, Vite, Axios
- **Backend:** Python, FastAPI
- **Database:** PostgreSQL
- **Deployment:** Netlify/Vercel (Frontend), Render/Railway (Backend)

---

## Steps to Run the Project Locally

### 1. Clone the repository
``bash

git clone https://github.com/Yogndr/hrms-lite.git
cd hrms-lite


cd hrms-lite-backend

# Create virtual environment
python -m venv .venv
source .venv/Scripts/activate  # Windows
# OR
source .venv/bin/activate      # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Set environment variables
# Create a .env file with your PostgreSQL URL
# Example:
# DATABASE_URL=postgresql://username:password@host:port/dbname

# Run backend
uvicorn app.main:app --reload


cd hrms-lite-frontend

# Install dependencies
npm install

# Start frontend
npm run dev


Assumptions / Limitations

Single admin user (no authentication implemented)

Leave management, payroll, and advanced HR features are out of scope

UI is designed for desktop-first; mobile responsiveness is minimal

Attendance cannot be marked twice for the same date

Assumptions / Limitations

Single admin user (no authentication implemented)

Leave management, payroll, and advanced HR features are out of scope

UI is designed for desktop-first; mobile responsiveness is minimal

Attendance cannot be marked twice for the same date


Assumptions / Limitations

Single admin user (no authentication implemented)

Leave management, payroll, and advanced HR features are out of scope

UI is designed for desktop-first; mobile responsiveness is minimal

Attendance cannot be marked twice for the same date
