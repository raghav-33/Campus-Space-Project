import React, { useState } from 'react';
import { Search, Calendar, Clock } from 'lucide-react';

export default function SearchBar({ onSearch }) {
    const [room, setRoom] = useState("");
    const [day, setDay] = useState("Monday");
    const [time, setTime] = useState("10:30");

    const handleSearch = (e) => {
        e.preventDefault();
        if (room.trim()) {
            // We now pass an object containing all three pieces of data
            onSearch({ room, day, time });
        }
    };

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-3">

            {/* Room Input */}
            <div className="relative flex-grow group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-lg shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-slate-800 placeholder-slate-400"
                    placeholder="Room (e.g., 19 or Lab A)..."
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    required
                />
            </div>

            {/* Day Selector */}
            <div className="relative md:w-48 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <select
                    className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-lg shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-slate-800 appearance-none cursor-pointer"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                >
                    {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>

            {/* Time Picker */}
            <div className="relative md:w-40 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                    type="time"
                    className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-lg shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-slate-800 cursor-pointer"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-95"
            >
                Check
            </button>
        </form>
    );
}