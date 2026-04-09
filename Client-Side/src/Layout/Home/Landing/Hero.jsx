import React from 'react';
import { Link } from 'react-router-dom';
import { FaLocationArrow, FaRegClock } from 'react-icons/fa';
import { IoMdPulse } from 'react-icons/io';
import { LuDroplets } from 'react-icons/lu';

const HERO_IMAGE = '/image/blood_donation4.png';
const HERO_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1542736667-069246bdbc13?auto=format&fit=crop&w=1200&q=80';

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-red-800 via-red-700 to-red-900 text-primary-content">
            <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs tracking-wider uppercase text-white/95 border border-white/30 shadow-lg">
                        <IoMdPulse className="text-lg animate-pulse" />
                        RedBridge
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black leading-[1.05] drop-shadow-lg">
                        Find Verified Donors
                        <span className="block text-white/95 mt-2">Before Time Runs Out</span>
                    </h1>

                    <p className="text-white/90 text-base md:text-lg max-w-xl leading-relaxed">
                        RedBridge helps families across Bangladesh locate verified donors by blood group and location. So urgent requests can be handled faster and safer.
                    </p>

                    <div className="grid gap-2 text-sm text-white/90">
                        <p className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white" />Verified donor profiles with district-level location filters</p>
                        <p className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white" />Emergency-friendly contact flow for faster response</p>
                        <p className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white" />Simple onboarding to become an active donor</p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                        <Link className="btn bg-base-100 text-primary border-none hover:bg-base-200 hover:scale-105 transition-all duration-300 shadow-xl font-bold" to="/find-donors">
                            Find Donors
                        </Link>
                        <Link className="btn btn-outline text-white border-white/80 hover:bg-base-100 hover:text-primary transition-all duration-300 font-bold" to="/donate">
                            Become a Donor
                        </Link>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3 pt-2">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-sm hover:bg-white/15 transition-all duration-300 shadow-lg">
                            <p className="text-white/70 text-xs">Average Match Time</p>
                            <p className="font-bold text-xl mt-1">10 min</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-sm hover:bg-white/15 transition-all duration-300 shadow-lg">
                            <p className="text-white/70 text-xs">Active Districts</p>
                            <p className="font-bold text-xl mt-1">64</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-sm hover:bg-white/15 transition-all duration-300 shadow-lg">
                            <p className="text-white/70 text-xs">Registered Donors</p>
                            <p className="font-bold text-xl mt-1">2.5K+</p>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="rounded-3xl overflow-hidden border-2 border-white/40 shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <img
                            src={HERO_IMAGE}
                            alt="Healthcare support team during blood donation"
                            className="w-full h-105 object-cover hover:scale-105 transition-transform duration-500"
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = HERO_FALLBACK_IMAGE;
                            }}
                        />
                    </div>

                    <div className="absolute -bottom-4 left-3 sm:left-6 bg-neutral/90 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-sm shadow-2xl">
                        <p className="font-semibold flex items-center gap-2"><FaRegClock className="text-warning" /> Donate Blood</p>
                        <p className="text-white/80">Donate Blood to save life</p>
                    </div>

                    <div className="absolute top-4 right-3 sm:right-6 bg-neutral/90 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-sm shadow-2xl">
                        <p className="font-semibold flex items-center gap-2"><FaLocationArrow className="text-success" /> Find Doner</p>
                        <p className="text-white/80">3 donors found in your area</p>
                    </div>

                    <div className="absolute top-1/2 -left-2 sm:-left-4 hidden md:flex items-center gap-2 bg-error/90 text-white border border-white/20 rounded-full px-3 py-1 text-xs font-semibold shadow-lg">
                        <LuDroplets />
                        Blood network active
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;