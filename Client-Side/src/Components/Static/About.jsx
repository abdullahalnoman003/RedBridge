import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
            {/* Hero Section */}
            <section className="bg-red-600 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">About RedBridge</h1>
                    <p className="text-lg sm:text-xl opacity-90">
                        Connecting Lives Through Blood Donation
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        RedBridge is dedicated to saving lives by creating a seamless connection between 
                        blood donors and those in need. We believe that every drop of blood can make a 
                        difference, and our platform makes it easier than ever to find nearby blood donors 
                        and contribute to this life-saving cause.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Our vision is to build a compassionate community where blood donation becomes 
                        accessible, transparent, and rewarding for everyone involved.
                    </p>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What We Do</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Find Donors Nearby</h3>
                            <p className="text-gray-700">
                                Search and locate blood donors in your area instantly. Our location-based 
                                system helps you find the support you need, when you need it most.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Become a Donor</h3>
                            <p className="text-gray-700">
                                Join our community of life-savers. Register as a donor and make a real 
                                difference in your community by helping those in critical need of blood.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Connect & Communicate</h3>
                            <p className="text-gray-700">
                                Stay connected with potential donors and recipients. Our platform enables 
                                direct communication and coordination for efficient blood donation.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Safe & Verified</h3>
                            <p className="text-gray-700">
                                Every donor is verified and authenticated. We prioritize your safety and 
                                trust through secure processes and reliable information.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose RedBridge Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose RedBridge?</h2>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Quick & Easy Access</h3>
                                <p className="text-gray-700 mt-1">
                                    Find blood donors in minutes with our user-friendly interface and advanced filtering options.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Community Driven</h3>
                                <p className="text-gray-700 mt-1">
                                    Be part of a growing community of compassionate individuals dedicated to saving lives.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Location-Based Search</h3>
                                <p className="text-gray-700 mt-1">
                                    Find donors nearby using real-time location filtering. Proximity matters in emergencies.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Transparent & Reliable</h3>
                                <p className="text-gray-700 mt-1">
                                    All donor information is verified and transparent. Trust is the foundation of our platform.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="bg-red-600 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Our Impact</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <p className="text-4xl font-bold mb-2">100+</p>
                            <p className="text-lg">Active Donors</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold mb-2">1000+</p>
                            <p className="text-lg">Lives Connected</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold mb-2">24/7</p>
                            <p className="text-lg">Availability</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Join RedBridge Today</h2>
                    <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                        Whether you need blood or want to donate, become part of our life-saving community. 
                        Every registration brings us closer to saving more lives.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                            Find a Donor
                        </button>
                        <button className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition">
                            Become a Donor
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer Info */}
            <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center text-gray-700">
                    <p>
                        RedBridge - Blood Donation Finder | Connecting Hearts, Saving Lives
                    </p>
                    <p className="mt-2 text-sm">
                        © 2026 RedBridge. All rights reserved. | Dedicated to making blood donation accessible to all.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;