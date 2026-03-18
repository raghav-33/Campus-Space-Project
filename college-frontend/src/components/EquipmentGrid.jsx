import React from 'react';

export default function EquipmentGrid({ equipment }) {
    const items = [
        { label: "Capacity", value: `${equipment.capacity.count} Seats`, icon: equipment.capacity.icon, color: "text-indigo-500", bg: "bg-indigo-50" },
        { label: "Projector", value: equipment.projector.available ? "Available" : "None", icon: equipment.projector.icon, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Air Con", value: `${equipment.ac.working}/${equipment.ac.count} Working`, icon: equipment.ac.icon, color: "text-cyan-500", bg: "bg-cyan-50" },
        { label: "Fans", value: `${equipment.fans.working}/${equipment.fans.count} Working`, icon: equipment.fans.icon, color: "text-slate-500", bg: "bg-slate-50" },
        { label: "Computers", value: `${equipment.computers.working}/${equipment.computers.count} Active`, icon: equipment.computers.icon, color: "text-violet-500", bg: "bg-violet-50" },
    ];

    return (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mt-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Infrastructure Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {items.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col items-center text-center hover:bg-slate-50 transition-colors">
                        <div className={`p-3 rounded-xl ${item.bg} ${item.color} mb-3`}>
                            <item.icon size={24} />
                        </div>
                        <p className="text-xs text-slate-500 font-medium mb-1">{item.label}</p>
                        <p className="text-sm font-semibold text-slate-800">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}