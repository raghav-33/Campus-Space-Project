from pydantic import BaseModel
from typing import Optional, List

class Room(BaseModel):
    id: Optional[int] = None
    room_number: str
    room_type: str
    capacity: int
    floor: Optional[int] = None

class TimetableResponse(BaseModel):
    id: int
    room_number: str
    subject_name: str
    day_of_week: str
    start_time: str
    end_time: str

class Equipment(BaseModel):
    ac_count: int
    fan_count: int
    computer_count: int
    cctv: bool
    projector: bool

# 🚨 NEW: Schema for a single class on the schedule
class ScheduleItem(BaseModel):
    time: str
    subject: str
    type: str
    isCurrent: bool

class RoomStatus(BaseModel):
    room_number: str
    room_type: str
    capacity: int
    status: str
    subject: Optional[str] = None
    checked_day: str
    checked_time: str
    equipment: Optional[Equipment] = None
    schedule: List[ScheduleItem] = []  # 🚨 NEW: Added schedule list