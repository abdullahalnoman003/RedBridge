import React from 'react';
import { FaUsers, FaTint, FaHandHoldingHeart, FaMapMarkerAlt } from 'react-icons/fa';

const metrics = [
    { label: 'Platform Visitors', value: '10K+', ratio: '78%', icon: FaUsers },
    { label: 'Donor Registrations', value: '2.5K+', ratio: '64%', icon: FaTint },
    { label: 'Emergency Matches', value: '1.8K+', ratio: '59%', icon: FaHandHoldingHeart },
    { label: 'District Coverage', value: '64', ratio: '100%', icon: FaMapMarkerAlt },
];

const Statistics = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-14 bg-linear-to-b from-white to-gray-50">
            <div className="text-center mb-8">
                <p className="uppercase tracking-wider text-xs text-red-600 font-semibold mb-2">Platform Analytics</p>
                <h2 className="text-3xl md:text-4xl font-black text-gray-800">Live Impact Overview</h2>
                <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Track our community's growing impact in saving lives across Bangladesh</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <div
                            key={metric.label}
                            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Icon className="text-3xl text-red-600 group-hover:scale-110 transition-transform duration-300" />
                                <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                    {metric.ratio}
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{metric.label}</p>
                            <p className="text-4xl font-black text-red-700 mb-4">{metric.value}</p>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-2 bg-linear-to-r from-red-700 to-pink-600 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: metric.ratio }}
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Coverage: {metric.ratio}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Statistics;