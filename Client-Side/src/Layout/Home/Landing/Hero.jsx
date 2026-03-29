import React from 'react';
import { Link } from 'react-router-dom';
import { FaLocationArrow, FaRegClock } from 'react-icons/fa';
import { IoMdPulse } from 'react-icons/io';

const Hero = () => {
    return (
        <section className="bg-gradient-to-br from-red-700 via-red-600 to-pink-600 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 py-18 md:py-24 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs tracking-wider uppercase text-white/95 border border-white/30 shadow-lg">
                        <IoMdPulse className="text-lg animate-pulse" />
                        Emergency Blood Network
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black leading-[1.05] drop-shadow-lg">
                        Find Donors
                        <span className="block text-white/95 mt-2">Before The Clock Runs Out</span>
                    </h1>

                    <p className="text-white/90 text-base md:text-lg max-w-xl leading-relaxed">
                        RedBridge connects patients with nearby verified donors using blood group and location filters so families can act faster during critical moments.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                        <Link className="btn bg-white text-red-700 border-none hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl font-bold" to="/find-donors">
                            Find Donors
                        </Link>
                        <Link className="btn btn-outline text-white border-white/80 hover:bg-white hover:text-red-700 transition-all duration-300 font-bold" to="/donate">
                            Become a Donor
                        </Link>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3 pt-2">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-sm hover:bg-white/15 transition-all duration-300 shadow-lg">
                            <p className="text-white/70 text-xs">Average Match Time</p>
                            <p className="font-bold text-xl mt-1">15 min</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-sm hover:bg-white/15 transition-all duration-300 shadow-lg">
                            <p className="text-white/70 text-xs">Active Districts</p>
                            <p className="font-bold text-xl mt-1">64</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-sm hover:bg-white/15 transition-all duration-300 shadow-lg">
                            <p className="text-white/70 text-xs">Verified Donors</p>
                            <p className="font-bold text-xl mt-1">2.5K+</p>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="rounded-3xl overflow-hidden border-2 border-white/40 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                        <img
                            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80"
                            alt="Blood donation support team"
                            className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="absolute -bottom-5 -left-4 bg-gray-900/90 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-sm shadow-2xl animate-bounce">
                        <p className="font-semibold flex items-center gap-2"><FaRegClock className="text-red-400" /> Urgent Request</p>
                        <p className="text-white/80">A+ donor needed in Dhanmondi</p>
                    </div>

                    <div className="absolute top-4 -right-4 bg-gray-900/90 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-sm shadow-2xl animate-pulse">
                        <p className="font-semibold flex items-center gap-2"><FaLocationArrow className="text-green-400" /> Live Match</p>
                        <p className="text-white/80">3 donors found within 5km</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;