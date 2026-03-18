🎓 Campus Space
Campus Space is an intelligent, full-stack room management system designed for colleges. It allows students and staff to check live room availability, view infrastructure details (ACs, Projectors, PCs), and see the daily timetable in real-time.

🚀 Key Features
1.Live Status Tracking: Real-time "FREE" or "OCCUPIED" status based on the college timetable.

2.Infrastructure Insights: View exact counts of working ACs, Fans, and Computers for every room.

3.Daily Schedule: A dynamic timeline showing all classes scheduled for the day.

4.Quick-Book: Instantly discover 3 rooms that are currently empty on campus.

5.Modern UI: Built with React, Tailwind CSS, and Framer Motion for smooth animations.

🛠️ Tech Stack
Frontend

React.js (Vite)

Tailwind CSS (Styling)

Lucide React (Icons)

Framer Motion (Animations)

Backend

FastAPI (Python)

MySQL (Database)

Uvicorn (ASGI Server)

📋 Prerequisites
Before you begin, ensure you have the following installed:
Node.js (v18+)
Python (v3.9+)
MySQL Server

⚙️ Installation & Setup
1. Database Setup
Create a database named collagedb in MySQL.

Run the SQL scripts provided in database_setup.sql to create the tables (rooms, subjects, timetable, and room_equipment).

2. Backend Setup
Bash
# Navigate to project root
cd "Collage Room Project"

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn mysql-connector-python pydantic

# Run the server
uvicorn app.main:app --reload
3. Frontend Setup
Bash
# Navigate to frontend folder
cd college-frontend

# Install dependencies
npm install

# Start the development server
npm run dev

📂 Project Structure
Plaintext
.
├── app/                # FastAPI Backend
│   ├── routes/         # API Endpoints
│   ├── main.py         # Entry point
│   └── database.py     # MySQL Connection
├── college-frontend/   # React Frontend
│   ├── src/
│   │   ├── components/ # UI Components
│   │   └── App.jsx     # Main Logic
└── database_setup.sql  # SQL Schema

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📄 License
This project is MIT licensed.
