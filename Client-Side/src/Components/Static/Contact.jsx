import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
            {/* Hero Section */}
            <section className="bg-red-600 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-lg sm:text-xl opacity-90">
                        We're here to help. Get in touch with the RedBridge team.
                    </p>
                </div>
            </section>

            {/* Contact Information Cards */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {/* Phone */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                            <p className="text-gray-700">+1 (555) 123-4567</p>
                            <p className="text-gray-600 text-sm">Available 24/7</p>
                        </div>

                        {/* Email */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                            <p className="text-gray-700">support@redbridge.com</p>
                            <p className="text-gray-600 text-sm">We'll respond within 24 hours</p>
                        </div>

                        {/* Location */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
                            <p className="text-gray-700">123 Medical Center Lane</p>
                            <p className="text-gray-600 text-sm">New York, NY 10001</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Send us a Message</h2>
                    
                    {submitted && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-800 font-semibold">✓ Message sent successfully!</p>
                            <p className="text-green-700 text-sm mt-1">Thank you for contacting us. We'll get back to you soon.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
                        {/* Name */}
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>

                        {/* Phone */}
                        <div className="mb-6">
                            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="(555) 123-4567"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>

                        {/* Subject */}
                        <div className="mb-6">
                            <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                                Subject
                            </label>
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            >
                                <option value="">Select a subject</option>
                                <option value="general">General Inquiry</option>
                                <option value="support">Technical Support</option>
                                <option value="emergency">Emergency Request</option>
                                <option value="feedback">Feedback</option>
                                <option value="partnership">Partnership Opportunity</option>
                            </select>
                        </div>

                        {/* Message */}
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="Please share your message with us..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <details className="cursor-pointer">
                                <summary className="bg-gray-50 p-6 font-semibold text-gray-900 hover:bg-gray-100">
                                    How do I become a blood donor?
                                </summary>
                                <div className="p-6 bg-white border-t border-gray-200">
                                    <p className="text-gray-700">
                                        You can become a blood donor by registering on our platform. Fill out your profile, complete the health questionnaire, and verify your location. Once approved, you can start helping those in need.
                                    </p>
                                </div>
                            </details>
                        </div>

                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <details className="cursor-pointer">
                                <summary className="bg-gray-50 p-6 font-semibold text-gray-900 hover:bg-gray-100">
                                    What blood types do you need most?
                                </summary>
                                <div className="p-6 bg-white border-t border-gray-200">
                                    <p className="text-gray-700">
                                        All blood types are important. However, O negative is the universal donor and is always in high demand. Check our platform to see which types are currently needed in your area.
                                    </p>
                                </div>
                            </details>
                        </div>

                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <details className="cursor-pointer">
                                <summary className="bg-gray-50 p-6 font-semibold text-gray-900 hover:bg-gray-100">
                                    Is my personal information safe?
                                </summary>
                                <div className="p-6 bg-white border-t border-gray-200">
                                    <p className="text-gray-700">
                                        Yes, we take privacy and security very seriously. All your personal information is encrypted and stored securely. We comply with all healthcare privacy regulations and never share your data without consent.
                                    </p>
                                </div>
                            </details>
                        </div>

                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <details className="cursor-pointer">
                                <summary className="bg-gray-50 p-6 font-semibold text-gray-900 hover:bg-gray-100">
                                    How quickly can I find a donor?
                                </summary>
                                <div className="p-6 bg-white border-t border-gray-200">
                                    <p className="text-gray-700">
                                        Our location-based search allows you to find nearby donors instantly. Response times vary based on donor availability, but many requests are fulfilled within hours.
                                    </p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;