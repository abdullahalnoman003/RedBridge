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
        <section className="max-w-7xl mx-auto px-4 py-14">
            <div className="text-center mb-8 rb-fade-up">
                <p className="uppercase tracking-wider text-xs text-[#d7265e]">Community Stories</p>
                <h2 className="text-3xl md:text-4xl font-black mt-2">People Behind Every Match</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
                {testimonials.map((item, index) => (
                    <article
                        key={item.name}
                        className={`group rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 ${
                            index === 0 ? 'rb-fade-up' : index === 1 ? 'rb-fade-up-delay-1' : 'rb-fade-up-delay-2'
                        }`}
                    >
                        <div className="h-52 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                        </div>
                        <div className="p-5">
                            <FaQuoteLeft className="text-[#d7265e] text-lg mb-3" />
                            <p className="text-gray-700 mb-4">"{item.text}"</p>
                            <p className="font-semibold text-[#a20f46]">{item.name}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Slider;