import React from 'react';
import { MapPin, Clock, Zap, Calendar } from 'lucide-react';

// UPDATED: Now receives searchParams
export default function StatusCard({ room, searchParams }) {
    const isFree = room.status === "FREE";

    return (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center h-full relative overflow-hidden">

            {/* Background Badge indicating the query time */}
            <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                <Calendar size={14} /> {searchParams?.day} at {searchParams?.time}
            </div>

            <div className={`px-6 py-2 rounded-full text-sm font-bold tracking-wider mb-6 mt-6 ${isFree ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                {room.status}
            </div>

            <h2 className="text-4xl font-extrabold text-slate-900 mb-2">{room.name}</h2>
            <p className="text-slate-500 font-medium flex items-center gap-2 mb-6">
                <MapPin size={18} /> Floor {room.floor} • {room.type}
            </p>

            {!isFree && room.currentClass && (
                <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-sm text-slate-500 mb-1">Scheduled Session</p>
                    <p className="font-semibold text-slate-800">{room.currentClass.subject}</p>
                    <p className="text-sm text-slate-500 mt-2 flex items-center justify-center gap-1">
                        <Clock size={14} /> Ends at {room.currentClass.endTime}
                    </p>
                </div>
            )}

            {isFree && (
                <div className="w-full bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100">
                    <p className="font-semibold text-emerald-800 flex items-center justify-center gap-2">
                        <Zap size={18} /> Available at this time
                    </p>
                </div>
            )}
        </div>
    );
}