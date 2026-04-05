import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaDroplet, FaHandsHelping, FaLock, FaArrowRight } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState('general');
    const [searchTerm, setSearchTerm] = useState('');

    const faqCategories = {
        general: {
            name: 'General',
            icon: FaQuestionCircle,
            faqs: [
                {
                    id: 'g1',
                    question: 'What is RedBridge?',
                    answer: 'RedBridge is a blood donation platform that connects blood donors with recipients in need. Our platform uses location-based technology to help you find blood donors nearby or request blood in emergency situations.'
                },
                {
                    id: 'g2',
                    question: 'How does RedBridge work?',
                    answer: 'RedBridge connects donors and recipients through a simple platform. Donors register their information and blood type. When someone needs blood, they can search for available donors in their area or post a request.'
                },
                {
                    id: 'g3',
                    question: 'Is RedBridge available in my area?',
                    answer: 'RedBridge is currently available in major cities and is rapidly expanding. Check our platform to see if your location is covered. We are continuously working to expand our reach to more areas.'
                },
                {
                    id: 'g4',
                    question: 'Do I need to create an account?',
                    answer: 'Yes, you need to create an account to use RedBridge. Creating an account is free and takes just a few minutes. You will need to provide basic personal information and health details.'
                },
                {
                    id: 'g5',
                    question: 'Is RedBridge available 24/7?',
                    answer: 'Yes! RedBridge is available 24 hours a day, 7 days a week. You can search for donors, post requests, and manage your account anytime. Our support team is also available around the clock to assist you.'
                }
            ]
        },
        donor: {
            name: 'For Donors',
            icon: FaDroplet,
            faqs: [
                {
                    id: 'd1',
                    question: 'How do I become a blood donor?',
                    answer: 'To become a blood donor on RedBridge: 1) Register on our platform with your personal information, 2) Complete a health questionnaire, 3) Verify your identity and location, 4) Wait for approval (usually within 24 hours), 5) Start receiving donation requests.'
                },
                {
                    id: 'd2',
                    question: 'What are the eligibility requirements?',
                    answer: 'To donate blood, you must be: At least 18 years old, Weigh at least 110 pounds (50 kg), In good health without active diseases, Not pregnant or recently pregnant, Not recently tattooed or pierced, and Have not donated blood in the last 8 weeks.'
                },
                {
                    id: 'd3',
                    question: 'How often can I donate blood?',
                    answer: 'You can typically donate whole blood every 8 weeks (56 days). For plasma and platelet donations, the intervals may be different. It is important to wait the recommended time between donations to allow your body to fully recover.'
                },
                {
                    id: 'd4',
                    question: 'What should I do before donating?',
                    answer: 'Before donating blood: Get adequate sleep (7-9 hours), Eat a healthy meal 2-3 hours before donation, Drink plenty of water, Avoid caffeine and alcohol, Wear comfortable clothing with loose sleeves, and Bring a valid ID.'
                },
                {
                    id: 'd5',
                    question: 'How long does the donation process take?',
                    answer: 'A typical blood donation takes about 8-10 minutes for the actual collection. However, the entire process including registration, health screening, and recovery time usually takes 30-45 minutes at a medical facility.'
                },
                {
                    id: 'd6',
                    question: 'What should I do after donating?',
                    answer: 'After donating: Rest for 15-30 minutes, Drink plenty of fluids, Eat a snack, Avoid strenuous exercise for 24 hours, and Stay aware of any side effects. Most donors feel normal within a few hours.'
                }
            ]
        },
        recipient: {
            name: 'For Recipients',
            icon: FaHandsHelping,
            faqs: [
                {
                    id: 'r1',
                    question: 'How do I request blood?',
                    answer: 'To request blood on RedBridge: 1) Create an account and log in, 2) Go to "Find Donors" and set your blood type filter, 3) Search by location, 4) Contact available donors directly through the platform, 5) Coordinate the donation details.'
                },
                {
                    id: 'r2',
                    question: 'What if I need blood urgently?',
                    answer: 'For emergency blood requests: Call our 24/7 hotline at +1 (555) 123-4567, Create an urgent request on our platform, Contact your nearest medical facility immediately, and Provide your blood type and location.'
                },
                {
                    id: 'r3',
                    question: 'How much does it cost to request blood?',
                    answer: 'Using RedBridge to find donors is completely free. We do not charge any fees for searching donors, posting requests, or connecting with them. However, the actual blood donation at a medical facility may charge facility fees.'
                },
                {
                    id: 'r4',
                    question: 'Can I verify donor information?',
                    answer: 'Yes, all donors on RedBridge are verified and authenticated. We conduct background checks and verify medical information for all donors. Before proceeding with a donation, you can review their profile and verification badge.'
                },
                {
                    id: 'r5',
                    question: 'What if no donors are available nearby?',
                    answer: 'If no donors are available: Post a blood request on our platform (it reaches all nearby users), Contact local blood banks or hospitals, Use our "Notify When Available" feature, Expand your search radius, or Call our support team for assistance.'
                },
                {
                    id: 'r6',
                    question: 'What blood types can I receive?',
                    answer: 'Blood type compatibility depends on your type. Work with medical professionals to understand which donors are compatible with your blood type. All donations should be safe and matched appropriately.'
                }
            ]
        },
        safety: {
            name: 'Safety & Privacy',
            icon: FaLock,
            faqs: [
                {
                    id: 's1',
                    question: 'Is my personal information secure?',
                    answer: 'Yes, security is our top priority. We use industry-standard encryption (SSL/TLS) to protect all data in transit and at rest. Your information is stored in secure servers and never shared without your consent.'
                },
                {
                    id: 's2',
                    question: 'How is my medical information protected?',
                    answer: 'Your medical information is protected by advanced security measures: Encrypted storage, Restricted access to authorized personnel only, Regular security audits, and Compliance with healthcare privacy regulations.'
                },
                {
                    id: 's3',
                    question: 'Can donors and recipients see my personal details?',
                    answer: 'When you connect with a donor or recipient, you control what information is shared. You can view profiles before sharing information and choose which contact details to share.'
                },
                {
                    id: 's4',
                    question: 'What if I want to delete my account?',
                    answer: 'You can delete your account at any time from your account settings. This will remove your profile from public search and deactivate all ongoing requests. Some data may be retained for legal or medical compliance reasons.'
                },
                {
                    id: 's5',
                    question: 'Is the donation process medically safe?',
                    answer: 'Blood donation must always be conducted at licensed medical facilities by qualified healthcare professionals. All donations should use sterile equipment, be performed by certified professionals, and follow medical guidelines and protocols.'
                },
                {
                    id: 's6',
                    question: 'What if I experience side effects after donating?',
                    answer: 'Common side effects are minor (lightheadedness, mild bruising). However, if you experience severe symptoms like dizziness, fainting, chest pain, or shortness of breath, contact medical help immediately and notify RedBridge support.'
                }
            ]
        }
    };

    const currentFaqs = faqCategories[activeCategory].faqs.filter((faq) => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return true;
        return faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query);
    });

    return (
        <div className="min-h-screen bg-linear-to-b from-base-100 via-base-100 to-base-200">
            {/* Hero Section */}
            <section className="bg-linear-to-r from-primary to-secondary text-primary-content py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl sm:text-6xl font-black mb-6">Frequently Asked Questions</h1>
                    <p className="text-lg sm:text-xl opacity-90">
                        Find answers to common questions about RedBridge and blood donation
                    </p>
                </div>
            </section>

            {/* Category Navigation */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 sticky top-16 bg-base-100/95 backdrop-blur shadow-sm z-10 border-b border-base-300">
                <div className="max-w-4xl mx-auto">
                    <label className="input input-bordered mb-4 flex items-center gap-2 focus-within:input-primary">
                        <FiSearch className="text-base-content/60" />
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search a question..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </label>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {Object.entries(faqCategories).map(([key, category]) => {
                            const IconComponent = category.icon;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveCategory(key)}
                                    className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                                        activeCategory === key
                                            ? 'btn btn-primary shadow-lg shadow-primary/20'
                                            : 'btn btn-ghost hover:bg-base-200'
                                    }`}
                                >
                                    <IconComponent className="text-lg" />
                                    {category.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ Content - DaisyUI Collapse Style */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-black text-center mb-12">
                        {faqCategories[activeCategory].name} Questions
                    </h2>

                    {currentFaqs.length === 0 ? (
                        <div className="rounded-2xl border border-base-300 bg-base-100 p-8 text-center">
                            <p className="text-lg font-semibold text-base-content">No FAQ matched your search</p>
                            <p className="text-base-content/65 mt-2">Try another keyword or switch category above.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {currentFaqs.map((faq, index) => (
                                <div
                                    key={faq.id}
                                    className="collapse collapse-plus bg-base-100 border border-base-300 hover:border-primary hover:shadow-md transition-all duration-300 group"
                                >
                                    <input
                                        type="radio"
                                        name={`faq-${activeCategory}`}
                                        defaultChecked={index === 0}
                                    />
                                    <div className="collapse-title font-semibold text-lg group-hover:text-primary transition-colors">
                                        {faq.question}
                                    </div>
                                    <div className="collapse-content text-base-content/70">
                                        <p className="leading-relaxed">{faq.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Still Have Questions Section */}
            <section className="bg-base-200/50 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-black mb-6">Still Have Questions?</h2>
                    <p className="text-lg text-base-content/70 mb-10">
                        Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="btn btn-primary btn-lg gap-2">
                            Contact Support
                            <FaArrowRight />
                        </Link>
                        <a
                            href="mailto:support@redbridge.com"
                            className="btn btn-outline btn-lg"
                        >
                            Email Us
                        </a>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-black text-center mb-12">Quick Links</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border border-base-300">
                            <div className="card-body">
                                <div className="flex items-start gap-3">
                                    <div className="text-3xl text-primary mt-1">
                                        <FaDroplet />
                                    </div>
                                    <div>
                                        <h3 className="card-title text-lg">Become a Donor</h3>
                                        <p className="text-base-content/70 mt-2">
                                            Save lives by becoming a blood donor. Complete your registration and join our community.
                                        </p>
                                        <Link to="/donate" className="text-primary font-semibold inline-flex items-center gap-1 mt-3 hover:gap-2 transition-all">
                                            Get Started
                                            <FaArrowRight className="text-sm" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border border-base-300">
                            <div className="card-body">
                                <div className="flex items-start gap-3">
                                    <div className="text-3xl text-secondary mt-1">
                                        <FaHandsHelping />
                                    </div>
                                    <div>
                                        <h3 className="card-title text-lg">Find a Donor</h3>
                                        <p className="text-base-content/70 mt-2">
                                            Need blood? Search for donors in your area with our location-based platform.
                                        </p>
                                        <Link to="/find-donors" className="text-primary font-semibold inline-flex items-center gap-1 mt-3 hover:gap-2 transition-all">
                                            Search Now
                                            <FaArrowRight className="text-sm" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border border-base-300">
                            <div className="card-body">
                                <div className="flex items-start gap-3">
                                    <div className="text-3xl text-accent mt-1">
                                        <FaQuestionCircle />
                                    </div>
                                    <div>
                                        <h3 className="card-title text-lg">About RedBridge</h3>
                                        <p className="text-base-content/70 mt-2">
                                            Learn about our mission, values, and how we're changing blood donation.
                                        </p>
                                        <Link to="/about" className="text-primary font-semibold inline-flex items-center gap-1 mt-3 hover:gap-2 transition-all">
                                            Learn More
                                            <FaArrowRight className="text-sm" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border border-base-300">
                            <div className="card-body">
                                <div className="flex items-start gap-3">
                                    <div className="text-3xl text-info mt-1">
                                        <FaLock />
                                    </div>
                                    <div>
                                        <h3 className="card-title text-lg">Contact Us</h3>
                                        <p className="text-base-content/70 mt-2">
                                            Have a question or need immediate assistance? Contact our support team.
                                        </p>
                                        <Link to="/contact" className="text-primary font-semibold inline-flex items-center gap-1 mt-3 hover:gap-2 transition-all">
                                            Contact
                                            <FaArrowRight className="text-sm" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
