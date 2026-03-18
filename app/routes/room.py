from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List
from app.database import get_db
from app.schemas import RoomStatus, Room
from datetime import datetime

router = APIRouter(tags=["Rooms"])

# --- Endpoint 1: Get All Rooms ---
@router.get("/rooms", response_model=List[Room])
def get_all_rooms(conn = Depends(get_db)):
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, room_number, room_type, capacity, floor FROM rooms")
        rooms = cursor.fetchall()
        cursor.close()
        return rooms
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")

# --- Endpoint 2: Check Specific Room Status ---
@router.get("/rooms/{room_number}/status", response_model=RoomStatus)
def check_room_status(
    room_number: str,
    day: str = Query(..., description="e.g., Monday"),
    check_time: str = Query(..., description="e.g., 10:30:00"),
    conn = Depends(get_db)
):
    try:
        cursor = conn.cursor(dictionary=True)

        # Step 1: Get Room Data + Equipment Data 
        room_query = """
            SELECT r.id, r.room_number, r.room_type, r.capacity, 
                   COALESCE(e.ac_count, 0) as ac_count, 
                   COALESCE(e.fan_count, 0) as fan_count, 
                   COALESCE(e.computer_count, 0) as computer_count, 
                   COALESCE(e.cctv, 0) as cctv, 
                   COALESCE(e.projector, 0) as projector
            FROM rooms r
            LEFT JOIN room_equipment e ON r.id = e.room_number 
            WHERE r.room_number = %s
        """
        cursor.execute(room_query, (room_number,))
        room_data = cursor.fetchone()

        if not room_data:
            cursor.close()
            raise HTTPException(status_code=404, detail=f"Room {room_number} not found.")

        room_id = room_data['id']

        # Step 2: Check Timetable for Current Status
        status_query = """
            SELECT s.subject_name
            FROM timetable t
            JOIN subjects s ON t.subject_id = s.id
            WHERE t.room_number = %s AND t.day_of_week = %s AND %s BETWEEN t.start_time AND t.end_time
        """
        cursor.execute(status_query, (room_id, day, check_time))
        lecture_data = cursor.fetchone()

        #  Step 3: Fetch the FULL Daily Schedule
        schedule_query = """
            SELECT s.subject_name, 
                   CAST(t.start_time AS CHAR) as start_time, 
                   CAST(t.end_time AS CHAR) as end_time
            FROM timetable t
            JOIN subjects s ON t.subject_id = s.id
            WHERE t.room_number = %s AND t.day_of_week = %s
            ORDER BY t.start_time
        """
        cursor.execute(schedule_query, (room_id, day))
        schedule_rows = cursor.fetchall()

        # Format the schedule for the frontend
        daily_schedule = []
        for row in schedule_rows:
            # Convert 24h to 12h AM/PM format safely
            st_hour, st_min = int(row['start_time'][:2]), row['start_time'][3:5]
            et_hour, et_min = int(row['end_time'][:2]), row['end_time'][3:5]
            
            st_12 = f"{st_hour % 12 or 12}:{st_min} {'PM' if st_hour >= 12 else 'AM'}"
            et_12 = f"{et_hour % 12 or 12}:{et_min} {'PM' if et_hour >= 12 else 'AM'}"

            # Check if this specific slot is the one currently happening
            is_current = row['start_time'] <= check_time <= row['end_time']
            
            # Auto-detect if it's a Lab or Lecture based on the subject name
            class_type = "Lab" if "Lab" in row['subject_name'] else "Lecture"

            daily_schedule.append({
                "time": f"{st_12} - {et_12}",
                "subject": row['subject_name'],
                "type": class_type,
                "isCurrent": is_current
            })
        
        cursor.close()

        return {
            "room_number": room_number,
            "room_type": room_data['room_type'],
            "capacity": room_data['capacity'],
            "status": "OCCUPIED" if lecture_data else "FREE",
            "subject": lecture_data['subject_name'] if lecture_data else None,
            "checked_day": day,
            "checked_time": check_time,
            "equipment": {
                "ac_count": room_data['ac_count'],
                "fan_count": room_data['fan_count'],
                "computer_count": room_data['computer_count'],
                "cctv": bool(room_data['cctv']),
                "projector": bool(room_data['projector'])
            },
            "schedule": daily_schedule  #  Send the formatted schedule to React!
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")


# --- Endpoint 3: Get 3 Currently Free Rooms ---
@router.get("/rooms/free-now")
def get_currently_free_rooms(conn = Depends(get_db)):
    try:
        # 1. Get the actual real-world current day and time
        now = datetime.now()
        current_day = now.strftime("%A") # e.g., "Wednesday"
        current_time = now.strftime("%H:%M:%S")

        cursor = conn.cursor(dictionary=True)
        
        # 2. Find 3 rooms that are NOT occupied at this exact second
        query = """
            SELECT id, room_number, room_type, COALESCE(floor, 1) as floor 
            FROM rooms 
            WHERE id NOT IN (
                SELECT room_number 
                FROM timetable 
                WHERE day_of_week = %s AND %s BETWEEN start_time AND end_time
            )
            LIMIT 3
        """
        cursor.execute(query, (current_day, current_time))
        free_rooms = cursor.fetchall()
        cursor.close()
        
        return free_rooms
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")
