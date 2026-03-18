import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

// 🚨 Notice we removed the mockDatabase import and added 'quickRooms' as a prop
export default function EmptyState({ onSelect, quickRooms }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
        >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mb-6">
                <MapPin size={32} />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Ready to find a space?</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">Enter a room number above to view its live status, equipment, and daily schedule.</p>

            <div className="max-w-xl mx-auto text-left">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 ml-2">Quick-Book Rooms (Currently Free)</p>
                <div className="grid gap-3 md:grid-cols-3">

                    {/* Map through the LIVE rooms from the database! */}
                    {quickRooms.length > 0 ? (
                        quickRooms.map((room, idx) => (
                            <button
                                key={idx}
                                onClick={() => onSelect(room.room_number)}
                                className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group flex flex-col items-start"
                            >
                                <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">Room {room.room_number}</span>
                                <span className="text-xs text-slate-500 mt-1">Floor {room.floor}</span>
                            </button>
                        ))
                    ) : (
                        <p className="text-sm text-slate-500 col-span-3 text-center py-4 bg-white rounded-xl border border-dashed border-slate-200">
                            Scanning campus for free rooms...
                        </p>
                    )}

                </div>
            </div>
        </motion.div>
    );
}