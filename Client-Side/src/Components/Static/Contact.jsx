import React, { useState } from 'react';
import { FaCheckCircle, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone } from 'react-icons/fa';
import { LuClock3, LuDroplets, LuMessagesSquare, LuShieldCheck } from 'react-icons/lu';
import useDocumentTitle from '../../Hooks/useDocumentTitle';

const Contact = () => {
    useDocumentTitle("Contact with RedBridge");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setSubmitted(true);
            setIsLoading(false);
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
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-base-100 via-base-100 to-base-200">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-r from-primary to-secondary text-primary-content py-20 px-4 sm:px-6 lg:px-8">
                <div className="absolute -left-24 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-error/30 blur-3xl" />
                <div className="relative max-w-4xl mx-auto text-center">
                    <span className="badge badge-neutral badge-lg gap-2 mb-5">
                        <LuMessagesSquare />
                        Contact & Support
                    </span>
                    <h1 className="text-5xl sm:text-6xl font-black mb-6">Get in Touch</h1>
                    <p className="text-lg sm:text-xl opacity-90">
                        Need donor support, technical help, or urgent coordination? Our support team is ready to assist across Bangladesh.
                    </p>
                </div>
            </section>

            {/* Contact Information Cards */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        {[
                            { icon: FaPhone, title: 'Emergency Hotline', content: '+880 1711-000000', subtitle: '24/7 support across Bangladesh' },
                            { icon: FaEnvelope, title: 'Email Support', content: 'support@redbridge.bd', subtitle: 'Average reply within 24 hours' },
                            { icon: FaMapMarkerAlt, title: 'Coordination Desk', content: 'Dhaka, Bangladesh', subtitle: 'Serving all divisions and districts' }
                        ].map((contact, idx) => {
                            const IconComp = contact.icon;
                            return (
                                <div key={idx} className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-base-300 group cursor-pointer">
                                    <div className="card-body items-center text-center">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <IconComp />
                                        </div>
                                        <h3 className="card-title text-xl">{contact.title}</h3>
                                        <p className="text-base-content/70 mt-2 font-semibold">{contact.content}</p>
                                        <p className="text-sm text-base-content/60">{contact.subtitle}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-base-200/50">
                <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 min-w-0">
                        <div className="mb-8">
                            <h2 className="text-4xl font-black mb-3">Send Us a Message</h2>
                            <p className="text-base-content/70">Share your query and our team will connect with you quickly.</p>
                        </div>

                        {submitted && (
                            <div className="alert alert-success mb-8 flex items-center gap-3">
                                <FaCheckCircle className="text-xl" />
                                <div>
                                    <p className="font-semibold">Message sent successfully.</p>
                                    <p className="text-sm opacity-80">Our team will contact you shortly.</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl border border-base-300">
                            <div className="card-body">
                                <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-error/20 bg-linear-to-r from-error/10 to-transparent px-4 py-3">
                                    <p className="text-sm font-medium text-base-content/75">For emergency blood coordination, choose Emergency Request.</p>
                                    <span className="badge badge-error gap-1">
                                        <LuDroplets />
                                        Emergency
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Full Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your full name"
                                            className="input input-bordered w-full bg-base-200"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Mobile Number</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="01XXXXXXXXX"
                                            className="input input-bordered w-full bg-base-200"
                                        />
                                    </div>
                                </div>

                                <div className="form-control mt-2">
                                    <label className="label">
                                        <span className="label-text font-semibold">Email Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your email address"
                                        className="input input-bordered w-full bg-base-200"
                                    />
                                </div>

                                <div className="form-control mt-2">
                                    <label className="label">
                                        <span className="label-text font-semibold">Subject</span>
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="select select-bordered w-full bg-base-200"
                                    >
                                        <option value="">Select your subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="emergency">Emergency Request</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                    </select>
                                </div>

                                <div className="form-control mt-2">
                                    <label className="label">
                                        <span className="label-text font-semibold">Message</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        placeholder="Write your message with district, upazila, blood group, and urgency details"
                                        className="textarea textarea-bordered w-full bg-base-200 resize-none"
                                    ></textarea>
                                </div>

                                <div className="form-control mt-5">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="btn buttonUI btn-primary btn-lg gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50"
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane />
                                                Submit Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <aside className="space-y-5 min-w-0">
                        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
                            <h3 className="text-xl font-bold mb-4">Before You Send</h3>
                            <ul className="space-y-3 text-sm text-base-content/75">
                                <li className="flex items-start gap-2">
                                    <LuShieldCheck className="mt-0.5 text-primary" />
                                    Provide correct contact details so our team can reach you.
                                </li>
                                <li className="flex items-start gap-2">
                                    <LuClock3 className="mt-0.5 text-primary" />
                                    Emergency queries are prioritized for faster response.
                                </li>
                                <li className="flex items-start gap-2">
                                    <LuDroplets className="mt-0.5 text-primary" />
                                    Include blood group and location details for urgent requests.
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 to-base-100 p-6 shadow-sm">
                            <h3 className="text-xl font-bold">Need Immediate Help?</h3>
                            <p className="text-sm text-base-content/70 mt-2">For critical blood emergencies, contact hotline first, then submit form details.</p>
                            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-base-100 px-4 py-2 text-sm font-semibold shadow-sm">
                                <FaPhone className="text-primary" />
                                +880 1711-123476
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-black text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="contact-faq" defaultChecked />
                            <div className="collapse-title font-semibold text-lg">
                                How do I become a blood donor?
                            </div>
                            <div className="collapse-content text-base-content/70">
                                <p>
                                    You can become a blood donor by registering on our platform. Fill out your profile, complete the health questionnaire, and verify your location. Once approved, you can start helping those in need.
                                </p>
                            </div>
                        </div>

                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="contact-faq" />
                            <div className="collapse-title font-semibold text-lg">
                                What blood types do you need most?
                            </div>
                            <div className="collapse-content text-base-content/70">
                                <p>
                                    All blood types are important. However, O negative is the universal donor and is always in high demand. Check our platform to see which types are currently needed in your area.
                                </p>
                            </div>
                        </div>

                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="contact-faq" />
                            <div className="collapse-title font-semibold text-lg">
                                Is my personal information safe?
                            </div>
                            <div className="collapse-content text-base-content/70">
                                <p>
                                    Yes, we take privacy and security very seriously. All your personal information is encrypted and stored securely. We comply with all healthcare privacy regulations and never share your data without consent.
                                </p>
                            </div>
                        </div>

                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="contact-faq" />
                            <div className="collapse-title font-semibold text-lg">
                                How quickly can I find a donor?
                            </div>
                            <div className="collapse-content text-base-content/70">
                                <p>
                                    Our location-based search allows you to find nearby donors instantly. Response times vary based on donor availability, but many requests are fulfilled within hours.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;