import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function PredictiveTimeline({ predictions }) {
    return (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="text-blue-500" /> Availability Forecast
                </h3>
                <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                    ML Powered
                </span>
            </div>

            <div className="space-y-4">
                {predictions.map((pred, index) => {
                    const isLikelyFree = pred.occupiedProb < 50;
                    return (
                        <div key={index} className="relative">
                            <div className="flex justify-between text-sm font-medium text-slate-600 mb-1">
                                <span>{pred.time}</span>
                                <span>{isLikelyFree ? 'Likely Free' : 'High Traffic'}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pred.occupiedProb}%` }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                    className={`h-full rounded-full ${pred.occupiedProb > 75 ? 'bg-rose-500' :
                                        pred.occupiedProb > 40 ? 'bg-amber-400' : 'bg-emerald-400'
                                        }`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}