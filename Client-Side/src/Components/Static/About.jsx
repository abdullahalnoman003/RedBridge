import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaArrowRight,
    FaCheckCircle,
    FaClock,
    FaHeartbeat,
    FaMapMarkerAlt,
    FaShieldAlt,
    FaUsers
} from 'react-icons/fa';
import { IoMdPulse } from 'react-icons/io';
import { LuDroplets } from 'react-icons/lu';

const ABOUT_HERO_IMAGE = 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80';
const ABOUT_HERO_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1200&q=80';

const About = () => {
    const [visibleStats, setVisibleStats] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleStats(true);
                }
            },
            { threshold: 0.3 }
        );
        const statsSection = document.getElementById('stats-section');
        if (statsSection) observer.observe(statsSection);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-b from-base-100 via-base-100 to-base-200">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-br from-red-600  to-red-900 text-primary-content py-20 px-4 sm:px-6 lg:px-8">
                <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-error/30 blur-3xl" />
                <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-semibold tracking-wider">
                            <IoMdPulse className="text-lg animate-pulse" />
                            <span>About RedBridge</span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-black leading-tight">
                            We Connect Donors,
                            <span className="block text-white/90 mt-2">Families, and Hope</span>
                        </h1>
                        <p className="text-lg text-white/85 max-w-xl leading-relaxed">
                            RedBridge is a location-aware blood donor platform built to reduce emergency delays and help communities find the right donor faster.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Link to="/find-donors" className="btn btn-neutral gap-2">
                                Find Donors
                                <FaArrowRight className="text-sm" />
                            </Link>
                            <Link to="/donate" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary gap-2">
                                Become Donor
                                <LuDroplets />
                            </Link>
                        </div>
                    </div>

                    <div className="relative  rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-white/70 transition-all duration-300 hover:-translate-y-1">
                        <img
                            src={ABOUT_HERO_IMAGE}
                            alt="Medical team coordinating blood donation"
                            className="w-full h-96 object-cover"
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = ABOUT_HERO_FALLBACK_IMAGE;
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-300 hover:-translate-y-1">
                        <div className="card-body">
                            <div className="flex items-start gap-4">
                                <div className="text-primary text-3xl">
                                    <FaHeartbeat />
                                </div>
                                <div>
                                    <h2 className="card-title text-2xl">Our Mission</h2>
                                    <p className="text-base-content/70 mt-3 leading-relaxed">
                                        Make blood access faster and safer by connecting verified donors with people in need, using practical filters for blood group and location.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-300 hover:-translate-y-1">
                        <div className="card-body">
                            <div className="flex items-start gap-4">
                                <div className="text-secondary text-3xl">
                                    <FaUsers />
                                </div>
                                <div>
                                    <h2 className="card-title text-2xl">Our Vision</h2>
                                    <p className="text-base-content/70 mt-3 leading-relaxed">
                                        Build a trusted donation ecosystem where every urgent request can quickly reach the right donor nearby.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why People Use RedBridge */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-t from-base-200">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="badge badge-primary badge-lg gap-2 mb-4">
                            <IoMdPulse />
                            What We Offer
                        </span>
                        <h2 className="text-4xl font-black mt-4">Why People Use RedBridge</h2>
                        <p className="text-base-content/60 mt-2 max-w-2xl mx-auto">Discover the features that make blood donation faster, safer, and more accessible</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: FaMapMarkerAlt, title: 'Nearby Search', desc: 'Find donors by division, district, and upazila in seconds.' },
                            { icon: FaCheckCircle, title: 'Verified Profiles', desc: 'Donor profiles are managed with admin approval flow.' },
                            { icon: FaClock, title: 'Emergency Ready', desc: 'A faster way to coordinate blood needs during critical times.' },
                            { icon: FaShieldAlt, title: 'Community Impact', desc: 'Every donor signup helps more patients access life-saving support.' }
                        ].map((feature, idx) => {
                            const IconComp = feature.icon;
                            return (
                                <div key={idx} className="card bg-base-100 border border-base-300 hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                                    <div className="card-body">
                                        <div className="text-4xl text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                                            <IconComp />
                                        </div>
                                        <h3 className="card-title text-lg">{feature.title}</h3>
                                        <p className="text-sm text-base-content/70 group-hover:text-base-content transition-colors">{feature.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-base-200" id="stats-section">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="badge badge-secondary gap-2 mb-4">
                                <IoMdPulse />
                                Platform Snapshot
                            </span>
                            <h2 className="text-4xl font-black mt-4 mb-4">Growing Every Day</h2>
                            <p className="text-base-content/70 text-lg leading-relaxed">
                                We continue improving donor discovery and emergency response through a cleaner and faster digital experience. Join thousands of lifesavers making a real difference.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className={`stat bg-base-200 rounded-2xl p-4 text-center border border-base-300 transition-all duration-500 ${visibleStats ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                                <div className="stat-value text-primary text-3xl">100+</div>
                                <div className="stat-title text-sm text-base-content/60">Active Donors</div>
                            </div>
                            <div className={`stat bg-base-200 rounded-2xl p-4 text-center border border-base-300 transition-all duration-500 delay-100 ${visibleStats ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                                <div className="stat-value text-secondary text-3xl">1K+</div>
                                <div className="stat-title text-sm text-base-content/60">Successful Matches</div>
                            </div>
                            <div className={`stat bg-primary text-primary-content rounded-2xl p-4 text-center border border-primary/30 transition-all duration-500 delay-200 ${visibleStats ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                                <div className="stat-value text-3xl">24/7</div>
                                <div className="stat-title text-sm text-primary-content/80">Availability</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b  to-primary/30">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-black mb-6">Ready to Make a Difference?</h2>
                    <p className="text-lg text-base-content/70 mb-10 max-w-2xl mx-auto">
                        Whether you need blood or want to donate, become part of a platform focused on speed, trust, and real community impact.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/find-donors" className="btn btn-primary btn-lg gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all">
                            <FaHeartbeat className="text-xl animate-pulse" />
                            Find Donors
                        </Link>
                        <Link to="/donate" className="btn btn-outline btn-lg gap-2 hover:shadow-lg transition-all">
                            <FaUsers className="text-xl" />
                            Become a Donor
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;