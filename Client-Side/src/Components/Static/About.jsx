import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaMapMarkerAlt, FaRegClock, FaUserCheck } from 'react-icons/fa';
import { IoMdPulse } from 'react-icons/io';

const ABOUT_HERO_IMAGE = 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80';
const ABOUT_HERO_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1200&q=80';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#fff7f9] to-[#f7f9ff]">
            <section className="rb-gradient-bg text-white py-18 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4 rb-fade-up">
                        <div className="inline-flex items-center gap-2 bg-white/12 rounded-full px-4 py-1.5 text-xs tracking-wider uppercase text-white/90">
                            <IoMdPulse className="text-base" />
                            About RedBridge
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black leading-tight">
                            We Connect Donors,
                            <span className="block text-white/90">Families, and Hope</span>
                        </h1>
                        <p className="text-white/85 max-w-xl">
                            RedBridge is a location-aware blood donor platform built to reduce emergency delays and help communities find the right donor faster.
                        </p>
                    </div>

                    <div className="rounded-3xl overflow-hidden border border-white/25 shadow-2xl rb-fade-up-delay-1">
                        <img
                            src={ABOUT_HERO_IMAGE}
                            alt="Medical team coordinating blood donation"
                            className="w-full h-[320px] object-cover"
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = ABOUT_HERO_FALLBACK_IMAGE;
                            }}
                        />
                    </div>
                </div>
            </section>

            <section className="py-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 border shadow-sm rb-fade-up">
                        <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                        <p className="text-[#5c5573] leading-relaxed">
                            Make blood access faster and safer by connecting verified donors with people in need, using practical filters for blood group and location.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border shadow-sm rb-fade-up-delay-1">
                        <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
                        <p className="text-[#5c5573] leading-relaxed">
                            Build a trusted donation ecosystem where every urgent request can quickly reach the right donor nearby.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <p className="uppercase tracking-wider text-xs text-[#d7265e]">What We Offer</p>
                        <h2 className="text-3xl font-black mt-2">Why People Use RedBridge</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <article className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-lg transition">
                            <FaMapMarkerAlt className="text-[#d7265e] text-xl mb-3" />
                            <h3 className="font-bold mb-2">Nearby Search</h3>
                            <p className="text-sm text-[#5c5573]">Find donors by division, district, and upazila in seconds.</p>
                        </article>

                        <article className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-lg transition">
                            <FaUserCheck className="text-[#d7265e] text-xl mb-3" />
                            <h3 className="font-bold mb-2">Verified Profiles</h3>
                            <p className="text-sm text-[#5c5573]">Donor profiles are managed with admin approval flow.</p>
                        </article>

                        <article className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-lg transition">
                            <FaRegClock className="text-[#d7265e] text-xl mb-3" />
                            <h3 className="font-bold mb-2">Emergency Ready</h3>
                            <p className="text-sm text-[#5c5573]">A faster way to coordinate blood needs during critical times.</p>
                        </article>

                        <article className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-lg transition">
                            <FaHeartbeat className="text-[#d7265e] text-xl mb-3" />
                            <h3 className="font-bold mb-2">Community Impact</h3>
                            <p className="text-sm text-[#5c5573]">Every donor signup helps more patients access life-saving support.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="py-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto rounded-3xl bg-[#161526] text-white p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="uppercase tracking-wider text-xs text-pink-200">Platform Snapshot</p>
                        <h2 className="text-3xl font-black mt-2 mb-4">Growing Every Day</h2>
                        <p className="text-gray-300">We continue improving donor discovery and emergency response through a cleaner and faster digital experience.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="rb-glass-dark rounded-xl p-3">
                            <p className="text-2xl font-bold">100+</p>
                            <p className="text-xs text-white/70">Active Donors</p>
                        </div>
                        <div className="rb-glass-dark rounded-xl p-3">
                            <p className="text-2xl font-bold">1K+</p>
                            <p className="text-xs text-white/70">Matches</p>
                        </div>
                        <div className="rb-glass-dark rounded-xl p-3">
                            <p className="text-2xl font-bold">24/7</p>
                            <p className="text-xs text-white/70">Availability</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-black mb-4">Join RedBridge Today</h2>
                    <p className="text-[#5c5573] mb-7">
                        Whether you need blood or want to donate, become part of a platform focused on speed, trust, and real community impact.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/find-donors" className="btn bg-[#d7265e] text-white border-none hover:scale-105 transition">Find Donors</Link>
                        <Link to="/donate" className="btn btn-outline border-[#d7265e] text-[#a20f46] hover:bg-[#fff0f5] transition">Become a Donor</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;