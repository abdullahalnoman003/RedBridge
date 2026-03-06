import React from 'react';

const metrics = [
    { label: 'Platform Visitors', value: '10K+', ratio: '78%' },
    { label: 'Donor Registrations', value: '2.5K+', ratio: '64%' },
    { label: 'Emergency Matches', value: '1.8K+', ratio: '59%' },
    { label: 'District Coverage', value: '64', ratio: '100%' },
];

const Statistics = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-14">
            <div className="text-center mb-8 rb-fade-up">
                <p className="uppercase tracking-wider text-xs text-[#d7265e]">Platform Analytics</p>
                <h2 className="text-3xl md:text-4xl font-black mt-2">Live Impact Overview</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                    <div
                        key={metric.label}
                        className={`rounded-2xl border bg-white p-5 shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1 ${
                            index === 0 ? 'rb-fade-up' : index === 1 ? 'rb-fade-up-delay-1' : 'rb-fade-up-delay-2'
                        }`}
                    >
                        <p className="text-sm text-gray-500">{metric.label}</p>
                        <p className="text-4xl font-black text-[#a20f46] mt-2">{metric.value}</p>
                        <div className="w-full h-2 bg-gray-100 rounded-full mt-5 overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-[#7d1747] to-[#d7265e] rounded-full" style={{ width: metric.ratio }} />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Coverage score: {metric.ratio}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Statistics;