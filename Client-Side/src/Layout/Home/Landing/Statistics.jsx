import React from 'react';
import { FaUsers, FaTint, FaHandHoldingHeart, FaMapMarkerAlt } from 'react-icons/fa';

const metrics = [
    { label: 'Monthly Visitors', value: '10K+', ratio: '78%', icon: FaUsers },
    { label: 'Registered Donors', value: '2.5K+', ratio: '64%', icon: FaTint },
    { label: 'Emergency Matches', value: '1.8K+', ratio: '59%', icon: FaHandHoldingHeart },
    { label: 'District Reach', value: '64', ratio: '100%', icon: FaMapMarkerAlt },
];

const Statistics = () => {
    return (
        <div className='bg-linear-to-b from-gray-200 via-white to-white'>
            <section className="max-w-7xl mx-auto px-4 py-14 rounded-3xl">
            <div className="text-center mb-8">
                <p className="uppercase tracking-wider text-xs text-primary font-semibold mb-2">Platform Analytics</p>
                <h2 className="text-3xl md:text-4xl font-black text-base-content">Live Impact Overview</h2>
                <p className="text-base-content/65 mt-3 max-w-2xl mx-auto">Track RedBridge impact across Bangladesh with donation and response insights.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <div
                            key={metric.label}
                            className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Icon className="text-3xl text-primary group-hover:scale-110 transition-transform duration-300" />
                                <div className="px-3 py-1 bg-success/15 text-success text-xs font-semibold rounded-full border border-success/25">
                                    {metric.ratio}
                                </div>
                            </div>
                            <p className="text-sm text-base-content/65 mb-2">{metric.label}</p>
                            <p className="text-4xl font-black text-primary mb-4">{metric.value}</p>
                            <div className="w-full h-2 bg-base-300 rounded-full overflow-hidden">
                                <div
                                    className="h-2 bg-linear-to-r from-primary to-error rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: metric.ratio }}
                                />
                            </div>
                            <p className="text-xs text-base-content/55 mt-2">Coverage: {metric.ratio}</p>
                        </div>
                    );
                })}
            </div>
        </section>
        </div>
        
    );
};

export default Statistics;