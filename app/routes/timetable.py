from fastapi import APIRouter, Depends
from typing import List
from app.database import get_db
from app.schemas import TimetableResponse

router = APIRouter(tags=["Timetable"])

@router.get("/timetable", response_model=List[TimetableResponse])
def get_timetable(conn = Depends(get_db)):
    cursor = conn.cursor(dictionary=True)

    # 🛠️ UPDATED QUERY: Changed t.room_id to t.room_number in the JOIN
    query = """
    SELECT t.id,
           r.room_number,
           s.subject_name,
           t.day_of_week,
           CAST(t.start_time AS CHAR) as start_time,
           CAST(t.end_time AS CHAR) as end_time
    FROM timetable t
    JOIN rooms r ON t.room_number = r.id  
    JOIN subjects s ON t.subject_id = s.id
    """

    cursor.execute(query)
    data = cursor.fetchall()
    
    cursor.close()
    return data
