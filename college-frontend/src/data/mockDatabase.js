import { Users, Monitor, Wind, Snowflake, Video } from 'lucide-react';

export const mockDatabase = {
    "19": {
        id: "19",
        name: "Room 19",
        type: "Classroom",
        floor: 1,
        status: "OCCUPIED",
        currentClass: { subject: "Big Data Analytics (BDA)", endTime: "11:30 AM" },
        equipment: {
            ac: { count: 2, working: 2, icon: Snowflake },
            fans: { count: 4, working: 3, icon: Wind },
            projector: { available: true, icon: Video },
            computers: { count: 0, working: 0, icon: Monitor },
            capacity: { count: 40, icon: Users }
        },
        predictions: [
            { time: "11:00", occupiedProb: 95 },
            { time: "12:00", occupiedProb: 20 },
            { time: "13:00", occupiedProb: 15 },
            { time: "14:00", occupiedProb: 85 }
        ]
    },
    "Lab A": {
        id: "Lab A",
        name: "Database Lab",
        type: "Lab",
        floor: 2,
        status: "FREE",
        currentClass: null,
        equipment: {
            ac: { count: 3, working: 3, icon: Snowflake },
            fans: { count: 0, working: 0, icon: Wind },
            projector: { available: true, icon: Video },
            computers: { count: 30, working: 28, icon: Monitor },
            capacity: { count: 30, icon: Users }
        },
        predictions: [
            { time: "11:00", occupiedProb: 10 },
            { time: "12:00", occupiedProb: 10 },
            { time: "13:00", occupiedProb: 90 },
            { time: "14:00", occupiedProb: 95 }
        ]
    }
};

export const quickBookRooms = [
    { id: "Lab A", name: "Database Lab", floor: 2 },
    { id: "22", name: "Seminar Hall", floor: 1 },
    { id: "14", name: "Room 14", floor: 3 }
];