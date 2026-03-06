import React from 'react';
import { Link } from 'react-router-dom';
import { FaLocationArrow, FaRegClock } from 'react-icons/fa';
import { IoMdPulse } from 'react-icons/io';

const Hero = () => {
    return (
        <section className="rb-gradient-bg text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 py-18 md:py-24 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6 rb-fade-up">
                    <div className="inline-flex items-center gap-2 bg-white/12 rounded-full px-4 py-1.5 text-xs tracking-wider uppercase text-white/90">
                        <IoMdPulse className="text-lg" />
                        Emergency Blood Network
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black leading-[1.05]">
                        Find Donors
                        <span className="block text-white/90">Before The Clock Runs Out</span>
                    </h1>

                    <p className="text-white/85 text-base md:text-lg max-w-xl">
                        RedBridge connects patients with nearby verified donors using blood group and location filters so families can act faster during critical moments.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Link className="btn bg-white text-[#7d1747] border-none hover:scale-105 transition" to="/find-donors">
                            Find Donors
                        </Link>
                        <Link className="btn btn-outline text-white border-white/70 hover:bg-white hover:text-[#7d1747] transition" to="/donate">
                            Become a Donor
                        </Link>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3 pt-2 rb-fade-up-delay-1">
                        <div className="rb-soft-card rounded-xl p-3 text-sm">
                            <p className="rb-soft-card-muted">Average Match Time</p>
                            <p className="font-bold text-xl">15 min</p>
                        </div>
                        <div className="rb-soft-card rounded-xl p-3 text-sm">
                            <p className="rb-soft-card-muted">Active Districts</p>
                            <p className="font-bold text-xl">64</p>
                        </div>
                        <div className="rb-soft-card rounded-xl p-3 text-sm">
                            <p className="rb-soft-card-muted">Verified Donors</p>
                            <p className="font-bold text-xl">2.5K+</p>
                        </div>
                    </div>
                </div>

                <div className="relative rb-fade-up-delay-2">
                    <div className="rounded-3xl overflow-hidden border border-white/30 shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80"
                            alt="Blood donation support team"
                            className="w-full h-[420px] object-cover"
                        />
                    </div>

                    <div className="absolute -bottom-5 -left-4 rb-glass-dark rounded-xl px-4 py-3 text-sm rb-float">
                        <p className="font-semibold flex items-center gap-2"><FaRegClock /> Urgent Request</p>
                        <p className="text-white/80">A+ donor needed in Dhanmondi</p>
                    </div>

                    <div className="absolute top-4 -right-4 rb-glass-dark rounded-xl px-4 py-3 text-sm rb-float">
                        <p className="font-semibold flex items-center gap-2"><FaLocationArrow /> Live Match</p>
                        <p className="text-white/80">3 donors found within 5km</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;