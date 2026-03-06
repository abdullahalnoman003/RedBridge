import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-14">
            <div className="max-w-7xl mx-auto px-4">
                <div className="rounded-3xl overflow-hidden bg-[#161526] text-white grid md:grid-cols-2 shadow-2xl">
                    <div className="p-8 md:p-10 space-y-5 rb-fade-up">
                        <p className="uppercase tracking-wider text-xs text-pink-200">Join The Movement</p>
                        <h2 className="text-3xl md:text-4xl font-black leading-tight">
                            Be The Reason
                            <span className="block text-[#ff87b1]">Someone Returns Home Safe</span>
                        </h2>
                        <p className="text-gray-300">
                            Whether you donate once or stay available regularly, your profile can help families during their most urgent hours.
                        </p>
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Link className="btn bg-[#d7265e] text-white border-none hover:scale-105 transition" to="/donate">
                                Donate Blood
                            </Link>
                            <Link className="btn btn-outline border-gray-200 text-white hover:bg-white hover:text-black transition" to="/find-donors">
                                Explore Donors
                            </Link>
                        </div>
                    </div>

                    <div className="relative min-h-[280px]">
                        <img
                            src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1200&q=80"
                            alt="Healthcare volunteer support"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 rb-glass-dark rounded-xl px-4 py-3 text-sm rb-float">
                            <p className="font-semibold">Next emergency could be near you</p>
                            <p className="text-white/80">Keep your donor profile active.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;