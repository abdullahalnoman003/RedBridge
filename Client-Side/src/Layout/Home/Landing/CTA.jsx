import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat } from 'react-icons/fa';
import { LuDroplets } from 'react-icons/lu';

const CTA_IMAGE = '/image/blood_donation8.png';
const CTA_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1200&q=80';

const CTA = () => {
    return (
        <section className="py-14 bg-linear-to-b from-white via-transparent to-red-500">
            <div className="max-w-7xl mx-auto px-4">
                <div className="rounded-3xl overflow-hidden bg-linear-to-br from-neutral via-neutral/95 to-neutral text-neutral-content grid md:grid-cols-2 shadow-2xl border border-base-300">
                    <div className="p-8 md:p-10 space-y-5 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 text-error mb-2">
                            <FaHeartbeat className="animate-pulse" />
                            <p className="uppercase tracking-wider text-xs font-semibold">Join The Movement</p>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black leading-tight">
                            Be The Reason
                            <span className="block text-error mt-2">Someone Returns Home Safe</span>
                        </h2>
                        <p className="text-neutral-content/80 text-base leading-relaxed">
                            One active donor profile can help families during life-threatening emergencies when every minute matters.
                        </p>

                        <div className="grid gap-2 text-sm text-neutral-content/75">
                            <p className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-error" />Profile approval and verification workflow.</p>
                            <p className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-error" />Location-first matching for faster donor reach.</p>
                            <p className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-error" />Useful for hospitals, family requests and volunteer networks.</p>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <Link className="btn btn-error text-white border-none hover:scale-105 transition-all duration-300 shadow-lg font-bold" to="/donate">
                                Donate Blood
                            </Link>
                            <Link className="btn btn-outline border-neutral-content/60 text-white hover:bg-base-100 hover:text-neutral transition-all duration-300 font-bold" to="/find-donors">
                                Explore Donors
                            </Link>
                        </div>
                    </div>

                    <div className="relative min-h-70 md:min-h-87">
                        <img
                            src={CTA_IMAGE}
                            alt="Medical support team"
                            className="w-full h-full object-cover"
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = CTA_FALLBACK_IMAGE;
                            }}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                        <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 text-sm shadow-xl">
                            <p className="font-semibold inline-flex items-center gap-2"><LuDroplets /> Next emergency may be nearby</p>
                            <p className="text-white/90">Keep your donor profile active in RedBridge.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;