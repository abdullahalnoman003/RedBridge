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
        <section className="py-14 bg-gradient-to-b from-[#fff5f8] to-[#f7f8ff]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-8 rb-fade-up">
                    <p className="uppercase tracking-wider text-xs text-[#d7265e]">Education</p>
                    <h2 className="text-3xl md:text-4xl font-black mt-2">Know Before You Donate</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                    {infoCards.map((card, index) => (
                        <article
                            key={card.title}
                            className={`rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1 ${
                                index === 0 ? 'rb-fade-up' : index === 1 ? 'rb-fade-up-delay-1' : 'rb-fade-up-delay-2'
                            }`}
                        >
                            <div className="h-44 overflow-hidden">
                                <img src={card.image} alt={card.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-lg mb-2">{card.title}</h3>
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