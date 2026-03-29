import React from 'react';

const infoCards = [
    {
        title: 'Who Can Donate?',
        text: 'Healthy adults aged 18-60 with minimum safe body weight can usually donate after screening.',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
    },
    {
        title: 'How Often?',
        text: 'Whole blood donation is generally safe every 3-4 months, depending on medical advice.',
        image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=900&q=80',
    },
    {
        title: 'Safety First',
        text: 'Donate only through verified centers and always follow healthcare professional guidance.',
        image: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=900&q=80',
    },
];

const BloodInfo = () => {
    return (
        <section className="py-14 bg-linear-to-b from-pink-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-8 text-center">
                    <p className="uppercase tracking-wider text-xs text-red-600 font-semibold mb-2">Education</p>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-800">Know Before You Donate</h2>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Essential information to help you become a safe and informed blood donor</p>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                    {infoCards.map((card) => (
                        <article
                            key={card.title}
                            className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                        >
                            <div className="h-44 overflow-hidden relative">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-lg mb-2 text-red-700 group-hover:text-red-600 transition-colors">{card.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{card.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BloodInfo;