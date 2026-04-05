import React from 'react';
import { FaCheckCircle, FaRegClock, FaUserCheck } from 'react-icons/fa';

const infoCards = [
    {
        title: 'Who Can Donate?',
        text: 'Most healthy adults aged 18 to 60 can donate after medical screening and safe weight checks.',
        image: 'https://images.unsplash.com/photo-1513224502586-d1e602410265?auto=format&fit=crop&w=900&q=80',
        fallbackImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=80',
        icon: FaUserCheck,
    },
    {
        title: 'How Often?',
        text: 'Whole blood donation is generally safe every 3 to 4 months, depending on doctor guidance.',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=80',
        fallbackImage: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=900&q=80',
        icon: FaRegClock,
    },
    {
        title: 'Safety First',
        text: 'Always donate through approved hospitals or blood banks and follow trained medical staff instructions.',
        image: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&w=900&q=80',
        fallbackImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=900&q=80',
        icon: FaCheckCircle,
    },
];

const BloodInfo = () => {
    return (
        <section className="py-14 bg-linear-to-b from-base-100 via-base-100 to-base-200/40">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-8 text-center">
                    <p className="uppercase tracking-wider text-xs text-primary font-semibold mb-2">Donor Education</p>
                    <h2 className="text-3xl md:text-4xl font-black text-base-content">Know Before You Donate</h2>
                    <p className="text-base-content/65 mt-3 max-w-2xl mx-auto">Understand donation basics, safety checks, and frequency before you register as a donor.</p>
                </div>

                <div className="mb-6 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
                    <div className="grid gap-3 md:grid-cols-3 text-sm text-base-content/70">
                        <p className="rounded-xl bg-base-200/60 px-4 py-3">Blood banks and hospitals follow screening before every donation.</p>
                        <p className="rounded-xl bg-base-200/60 px-4 py-3">Keep your phone reachable so nearby request coordinators can contact you fast.</p>
                        <p className="rounded-xl bg-base-200/60 px-4 py-3">Healthy hydration and rest help donors feel better before and after donation.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                    {infoCards.map((card) => (
                        <article key={card.title} className="rounded-2xl overflow-hidden border border-base-300 bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                            <div className="h-44 overflow-hidden relative">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(event) => {
                                        event.currentTarget.onerror = null;
                                        event.currentTarget.src = card.fallbackImage;
                                    }}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-neutral/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-lg mb-2 text-primary group-hover:text-error transition-colors flex items-center gap-2">
                                    <card.icon className="text-sm" />
                                    {card.title}
                                </h3>
                                <p className="text-sm text-base-content/70 leading-relaxed">{card.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BloodInfo;