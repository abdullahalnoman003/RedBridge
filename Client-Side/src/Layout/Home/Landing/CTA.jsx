import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat } from 'react-icons/fa';

const CTA = () => {
    return (
        <section className="py-14 bg-linear-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="rounded-3xl overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-red-900 text-white grid md:grid-cols-2 shadow-2xl border border-gray-700">
                    <div className="p-8 md:p-10 space-y-5 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 text-pink-300 mb-2">
                            <FaHeartbeat className="animate-pulse" />
                            <p className="uppercase tracking-wider text-xs font-semibold">Join The Movement</p>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black leading-tight">
                            Be The Reason
                            <span className="block text-red-400 mt-2">Someone Returns Home Safe</span>
                        </h2>
                        <p className="text-gray-300 text-base leading-relaxed">
                            Whether you donate once or stay available regularly, your profile can help families during their most urgent hours.
                        </p>
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Link className="btn bg-red-600 text-white border-none hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg font-bold" to="/donate">
                                Donate Blood
                            </Link>
                            <Link className="btn btn-outline border-gray-300 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 font-bold" to="/find-donors">
                                Explore Donors
                            </Link>
                        </div>
                    </div>

                    <div className="relative min-h-70 md:min-h-87">
                        <img
                            src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1200&q=80"
                            alt="Healthcare volunteer support"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                        <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 text-sm shadow-xl">
                            <p className="font-semibold">Next emergency could be near you</p>
                            <p className="text-white/90">Keep your donor profile active.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;