import React from 'react';
import { CalendarDays, Clock, PartyPopper } from 'lucide-react';

export default function UpcomingSchedule({ schedule }) {
    // Use the live schedule passed from App.jsx
    const displaySchedule = schedule || [];

    return (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <CalendarDays className="text-indigo-500" /> Today's Schedule
                </h3>
            </div>

            {/* If the array is empty, show a "Free Day" message */}
            {displaySchedule.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                    <PartyPopper size={32} className="mb-3 text-emerald-400" />
                    <p className="font-medium text-slate-600">No classes scheduled.</p>
                    <p className="text-sm">This room is free all day!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {displaySchedule.map((slot, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-4 p-3 rounded-2xl border ${slot.isCurrent ? 'border-indigo-200 bg-indigo-50/50' : 'border-slate-100 bg-slate-50'
                                }`}
                        >
                            <div className="min-w-[100px] text-xs font-semibold text-slate-500 flex flex-col justify-center">
                                <span className="flex items-center gap-1 mb-1 text-slate-400">
                                    <Clock size={12} /> {slot.time.split(' - ')[0]}
                                </span>
                                <span className="text-slate-400 pl-4">{slot.time.split(' - ')[1]}</span>
                            </div>

                            <div className="flex-1">
                                <p className={`text-sm font-bold ${slot.isCurrent ? 'text-indigo-900' : 'text-slate-800'}`}>
                                    {slot.subject}
                                </p>
                                <p className={`text-xs mt-1 font-medium ${slot.isCurrent ? 'text-indigo-500' : 'text-slate-500'}`}>
                                    {slot.type}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}