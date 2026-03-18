import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Users, Monitor, Wind, Snowflake, Video } from 'lucide-react';

// Import Custom Components
import SearchBar from './components/SearchBar';
import StatusCard from './components/StatusCard';
import UpcomingSchedule from './components/UpcomingSchedule';
import EquipmentGrid from './components/EquipmentGrid';
import EmptyState from './components/EmptyState';

export default function App() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [quickRooms, setQuickRooms] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/rooms/free-now')
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => setQuickRooms(data))
      .catch(err => console.error("Failed to load quick rooms:", err));
  }, []);

  const handleSearch = async ({ room, day, time }) => {
    setIsLoading(true);
    setError("");
    setActiveRoom(null);

    try {
      const formattedTime = time.length === 5 ? `${time}:00` : time;

      const response = await fetch(`http://127.0.0.1:8000/rooms/${room}/status?day=${day}&check_time=${formattedTime}`);

      if (!response.ok) {
        throw new Error(`Room ${room} not found in database.`);
      }

      const dbData = await response.json();

      const liveRoomData = {
        id: dbData.room_number,
        name: `Room ${dbData.room_number}`,
        type: dbData.room_type,
        floor: 1,
        status: dbData.status,
        currentClass: dbData.subject ? { subject: dbData.subject, endTime: "Scheduled" } : null,

        equipment: {
          ac: { count: dbData.equipment?.ac_count || 0, working: dbData.equipment?.ac_count || 0, icon: Snowflake },
          fans: { count: dbData.equipment?.fan_count || 0, working: dbData.equipment?.fan_count || 0, icon: Wind },
          projector: { available: dbData.equipment?.projector || false, icon: Video },
          computers: { count: dbData.equipment?.computer_count || 0, working: dbData.equipment?.computer_count || 0, icon: Monitor },
          capacity: { count: dbData.capacity || 0, icon: Users }
        },

        schedule: dbData.schedule || []
      };

      setActiveRoom(liveRoomData);
      setSearchParams({ day, time });

    } catch (err) {
      setError(err.message || "Failed to connect to the backend server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSelect = (roomId) => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[now.getDay()];
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

    handleSearch({ room: roomId, day: currentDay, time: currentTime });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900 pb-20">

      {/* Header / Hero Section */}
      <header className="bg-slate-900 pt-20 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 mt-6">
            Campus <span className="text-blue-400">Space</span>
          </h1>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Check live timetable statuses, infrastructure details, and daily schedules instantly.
          </p>

          <SearchBar onSearch={handleSearch} />
          {error && <p className="text-rose-400 mt-4 text-sm font-medium">{error}</p>}
        </div>
      </header>

      {/* Main Dashboard Area */}
      <main className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <AnimatePresence mode="wait">

          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-20"
            >
              <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
            </motion.div>

          ) : !activeRoom ? (
            <EmptyState key="empty" onSelect={handleQuickSelect} quickRooms={quickRooms} />

          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <StatusCard room={activeRoom} searchParams={searchParams} />
                <UpcomingSchedule schedule={activeRoom.schedule} />
              </div>
              <EquipmentGrid equipment={activeRoom.equipment} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}