import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { LuShieldCheck } from 'react-icons/lu';

const TC = () => {
    const sections = [
        {
            id: 'acceptance',
            title: '1. Acceptance of Terms',
            content: 'By accessing and using RedBridge, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. RedBridge reserves the right to make changes to these terms at any time without notice. Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes.'
        },
        {
            id: 'use',
            title: '2. Use License',
            content: 'Permission is granted to temporarily download one copy of the materials on RedBridge for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: Modify or copy the materials, Use the materials for any commercial purpose or for any public display, Attempt to decompile or reverse engineer any software contained on the Platform, Remove any copyright or other proprietary notations from the materials, or Transfer the materials to another person or mirror the materials on any other server.'
        },
        {
            id: 'disclaimer',
            title: '3. Disclaimer',
            content: 'The materials on RedBridge are provided on an as is basis. RedBridge makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, RedBridge does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.'
        },
        {
            id: 'limitations',
            title: '4. Limitations',
            content: 'In no event shall RedBridge or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on RedBridge, even if RedBridge or a representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.'
        },
        {
            id: 'accuracy',
            title: '5. Accuracy of Materials',
            content: 'The materials appearing on RedBridge could include technical, typographical, or photographic errors. RedBridge does not warrant that any of the materials on its website are accurate, complete, or current. RedBridge may make changes to the materials contained on its website at any time without notice. However, RedBridge does not make any commitment to update the materials. All information provided by donors is user-generated and RedBridge is not responsible for verification of donor information accuracy.'
        },
        {
            id: 'links',
            title: '6. Links',
            content: 'RedBridge has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by RedBridge of the site. Use of any such linked website is at the user\'s own risk. If you believe that a link on our site infringes your copyright rights, please contact us immediately at support@redbridge.com.'
        },
        {
            id: 'modifications',
            title: '7. Modifications',
            content: 'RedBridge may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service. RedBridge reserves the right to modify or discontinue, temporarily or permanently, the website or any service to which it connects, with or without notice and without liability to you.'
        },
        {
            id: 'governing',
            title: '8. Governing Law',
            content: 'These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which RedBridge operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location. This agreement constitutes the entire agreement between you and RedBridge and supersedes all prior or contemporaneous negotiations, representations, or agreements, whether written or oral, relating to the subject matter of this agreement.'
        },
        {
            id: 'donor',
            title: '9. Donor Responsibilities',
            content: 'As a blood donor on the RedBridge platform, you agree to: Provide accurate and truthful health information, Meet all medical requirements for blood donation, Not donate if you have any communicable diseases or health conditions that may affect blood safety, Follow all health and safety guidelines provided by RedBridge, and Notify RedBridge immediately of any health changes after registration. RedBridge reserves the right to verify donor information and suspend accounts that violate these terms.'
        },
        {
            id: 'privacy',
            title: '10. Privacy & User Information',
            content: 'RedBridge respects your privacy. We collect personal information only for the purpose of facilitating blood donation and connecting donors with recipients. Your information will not be shared with third parties without your explicit consent, except as required by law or medical professionals involved in blood donation processes. Users must be 18 years or older to register on the platform. By registering, you confirm that you meet all eligibility requirements for blood donation in your jurisdiction.'
        },
        {
            id: 'liability',
            title: '11. Limitation of Liability',
            content: 'RedBridge is a platform that facilitates connections between blood donors and recipients. RedBridge is not responsible for: Medical outcomes or complications resulting from blood donation or transfusion, Errors or inaccuracies in donor information provided by users, Failure of donors to appear for donation appointments, or Loss of revenue or data resulting from platform use. All users assume full responsibility for verifying donor information and following appropriate medical protocols.'
        },
        {
            id: 'termination',
            title: '12. Termination of Service',
            content: 'RedBridge reserves the right to terminate or suspend user accounts at any time without notice if: Users violate these Terms and Conditions, Users provide false or misleading information, Users engage in abusive or threatening behavior, or Users attempt to misuse the platform. Upon termination, your right to use the platform ceases immediately. RedBridge will not be liable to you or any third party for any claims arising from the termination of your access.'
        }
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-base-100 via-base-100 to-base-200">
            {/* Hero Section */}
            <section className="bg-linear-to-r from-primary to-secondary text-primary-content py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl sm:text-6xl font-black mb-6">Terms & Conditions</h1>
                    <p className="text-lg sm:text-xl opacity-90">
                        Please read these terms carefully before using RedBridge
                    </p>
                    <p className="text-sm mt-6 opacity-75">Last updated: March 2026</p>
                </div>
            </section>

            {/* Important Notice */}
            <section className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="alert alert-warning flex items-start gap-4">
                        <div className="text-2xl shrink-0">
                            <FaExclamationTriangle />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Important Notice</h3>
                            <p className="mt-2 text-base-content/80">
                                Blood donation is a critical healthcare activity. All blood donations must be conducted in licensed medical facilities by qualified healthcare professionals. RedBridge is a platform for connecting donors and recipients, not a medical service provider. Users are responsible for complying with all local health regulations and medical guidelines.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Navigation */}
            <section className="px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2 text-base-content/80">
                        <LuShieldCheck className="text-lg text-primary" />
                        <h3 className="font-bold">Quick Jump</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {sections.map((section) => (
                            <a key={section.id} href={`#${section.id}`} className="btn btn-sm btn-ghost border border-base-300 hover:border-primary">
                                {section.title.replace(/^\d+\.\s*/, '')}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Terms Content - DaisyUI Collapse Style */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                id={section.id}
                                className="collapse collapse-plus bg-base-100 border border-base-300 hover:border-primary hover:shadow-md transition-all duration-300 group"
                            >
                                <input
                                    type="radio"
                                    name="terms-accordion"
                                    defaultChecked={index === 0}
                                />
                                <div className="collapse-title font-semibold text-lg group-hover:text-primary transition-colors">
                                    {section.title}
                                </div>
                                <div className="collapse-content text-base-content/70">
                                    <p className="leading-relaxed">{section.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-base-200/50 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-black mb-6">Questions About Our Terms?</h2>
                    <p className="text-lg text-base-content/70 mb-10">
                        If you have any questions about these Terms and Conditions, please do not hesitate to contact us.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="btn btn-primary btn-lg gap-2">
                            Contact Support
                            <FaArrowRight />
                        </Link>
                        <a
                            href="mailto:support@redbridge.com"
                            className="btn btn-outline btn-lg gap-2"
                        >
                            <FaEnvelope />
                            Email Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TC;
