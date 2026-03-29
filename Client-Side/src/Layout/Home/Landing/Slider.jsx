import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
    {
        name: 'Sadia, Dhaka',
        text: 'I found an O- donor in under 30 minutes during an emergency.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80',
    },
    {
        name: 'Rafi, Chattogram',
        text: 'The donor flow was simple and I could help someone same day.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
    },
    {
        name: 'Nabila, Rajshahi',
        text: 'Clean interface and quick contact details made coordination easy.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80',
    },
];

const Slider = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-14 bg-white">
            <div className="text-center mb-8">
                <p className="uppercase tracking-wider text-xs text-red-600 font-semibold mb-2">Community Stories</p>
                <h2 className="text-3xl md:text-4xl font-black text-gray-800">People Behind Every Match</h2>
                <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Real experiences from donors and recipients who made a difference</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
                {testimonials.map((item, index) => (
                    <article
                        key={item.name}
                        className="group rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                    >
                        <div className="h-52 overflow-hidden relative">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        <div className="p-5 relative">
                            <div className="absolute -top-6 left-5 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                                <FaQuoteLeft className="text-white text-lg" />
                            </div>
                            <p className="text-gray-700 mt-4 mb-4 italic leading-relaxed">"{item.text}"</p>
                            <p className="font-semibold text-red-700 flex items-center gap-2">
                                {item.name}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Slider;