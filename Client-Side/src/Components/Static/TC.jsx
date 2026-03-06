import React from 'react';

const TC = () => {
    const sections = [
        {
            id: 'acceptance',
            title: '1. Acceptance of Terms',
            content: `By accessing and using RedBridge ("the Platform"), you accept and agree to be bound by the terms
            and provision of this agreement. If you do not agree to abide by the above, please do not use this
            service. RedBridge reserves the right to make changes to these terms at any time without notice.
            Your continued use of the Platform following the posting of revised Terms means that you accept
            and agree to the changes.`
        },
        {
            id: 'use',
            title: '2. Use License',
            content: `Permission is granted to temporarily download one copy of the materials (information or
            software) on RedBridge for personal, non-commercial transitory viewing only. This is the grant of a
            license, not a transfer of title, and under this license you may not:
            • Modify or copy the materials
            • Use the materials for any commercial purpose or for any public display
            • Attempt to decompile or reverse engineer any software contained on the Platform
            • Remove any copyright or other proprietary notations from the materials
            • Transfer the materials to another person or "mirror" the materials on any other server`
        },
        {
            id: 'disclaimer',
            title: '3. Disclaimer',
            content: `The materials on RedBridge are provided on an 'as is' basis. RedBridge makes no warranties,
            expressed or implied, and hereby disclaims and negates all other warranties including, without
            limitation, implied warranties or conditions of merchantability, fitness for a particular purpose,
            or non-infringement of intellectual property or other violation of rights.
            Further, RedBridge does not warrant or make any representations concerning the accuracy, likely
            results, or reliability of the use of the materials on its web site or otherwise relating to such
            materials or on any sites linked to this site.`
        },
        {
            id: 'limitations',
            title: '4. Limitations',
            content: `In no event shall RedBridge or its suppliers be liable for any damages (including, without
            limitation, damages for loss of data or profit, or due to business interruption) arising out of
            the use or inability to use the materials on RedBridge, even if RedBridge or a representative has
            been notified orally or in writing of the possibility of such damage. Because some jurisdictions
            do not allow limitations on implied warranties, or limitations of liability for consequential or
            incidental damages, these limitations may not apply to you.`
        },
        {
            id: 'accuracy',
            title: '5. Accuracy of Materials',
            content: `The materials appearing on RedBridge could include technical, typographical, or photographic
            errors. RedBridge does not warrant that any of the materials on its website are accurate,
            complete, or current. RedBridge may make changes to the materials contained on its website at
            any time without notice. However, RedBridge does not make any commitment to update the materials.
            All information provided by donors is user-generated and RedBridge is not responsible for
            verification of donor information accuracy.`
        },
        {
            id: 'links',
            title: '6. Links',
            content: `RedBridge has not reviewed all of the sites linked to its website and is not responsible for
            the contents of any such linked site. The inclusion of any link does not imply endorsement by
            RedBridge of the site. Use of any such linked website is at the user's own risk.
            If you believe that a link on our site infringes your copyright rights, please contact us
            immediately at support@redbridge.com.`
        },
        {
            id: 'modifications',
            title: '7. Modifications',
            content: `RedBridge may revise these terms of service for its website at any time without notice. By
            using this website, you are agreeing to be bound by the then current version of these terms of
            service. RedBridge reserves the right to modify or discontinue, temporarily or permanently, the
            website or any service to which it connects, with or without notice and without liability to you.`
        },
        {
            id: 'governing',
            title: '8. Governing Law',
            content: `These terms and conditions are governed by and construed in accordance with the laws of the
            jurisdiction in which RedBridge operates, and you irrevocably submit to the exclusive jurisdiction
            of the courts in that location.
            This agreement constitutes the entire agreement between you and RedBridge and supersedes all
            prior or contemporaneous negotiations, representations, or agreements, whether written or oral,
            relating to the subject matter of this agreement.`
        },
        {
            id: 'donor',
            title: '9. Donor Responsibilities',
            content: `As a blood donor on the RedBridge platform, you agree to:
            • Provide accurate and truthful health information
            • Meet all medical requirements for blood donation
            • Not donate if you have any communicable diseases or health conditions that may affect blood safety
            • Follow all health and safety guidelines provided by RedBridge
            • Notify RedBridge immediately of any health changes after registration
            RedBridge reserves the right to verify donor information and suspend accounts that violate
            these terms.`
        },
        {
            id: 'privacy',
            title: '10. Privacy & User Information',
            content: `RedBridge respects your privacy. We collect personal information only for the purpose of
            facilitating blood donation and connecting donors with recipients. Your information will not be
            shared with third parties without your explicit consent, except as required by law or medical
            professionals involved in blood donation processes.
            Users must be 18 years or older to register on the platform. By registering, you confirm that
            you meet all eligibility requirements for blood donation in your jurisdiction.`
        },
        {
            id: 'liability',
            title: '11. Limitation of Liability',
            content: `RedBridge is a platform that facilitates connections between blood donors and recipients.
            RedBridge is not responsible for:
            • Medical outcomes or complications resulting from blood donation or transfusion
            • Errors or inaccuracies in donor information provided by users
            • Failure of donors to appear for donation appointments
            • Loss of revenue or data resulting from platform use
            All users assume full responsibility for verifying donor information and following appropriate
            medical protocols. Blood donation should always be performed in a licensed medical facility by
            qualified healthcare professionals.`
        },
        {
            id: 'termination',
            title: '12. Termination of Service',
            content: `RedBridge reserves the right to terminate or suspend user accounts at any time without notice
            if:
            • Users violate these Terms and Conditions
            • Users provide false or misleading information
            • Users engage in abusive or threatening behavior
            • Users attempt to misuse the platform
            Upon termination, your right to use the platform ceases immediately. RedBridge will not be
            liable to you or any third party for any claims arising from the termination of your access.`
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
            {/* Hero Section */}
            <section className="bg-red-600 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms & Conditions</h1>
                    <p className="text-lg sm:text-xl opacity-90">
                        Please read these terms carefully before using RedBridge
                    </p>
                    <p className="text-sm mt-6 opacity-75">Last updated: March 2026</p>
                </div>
            </section>

            {/* Important Notice */}
            <section className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
                    <h3 className="text-lg font-bold text-yellow-900 mb-2">⚠️ Important Notice</h3>
                    <p className="text-yellow-800">
                        Blood donation is a critical healthcare activity. All blood donations must be conducted in
                        licensed medical facilities by qualified healthcare professionals. RedBridge is a platform
                        for connecting donors and recipients, not a medical service provider. Users are responsible
                        for complying with all local health regulations and medical guidelines.
                    </p>
                </div>
            </section>

            {/* Terms Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-2">
                        {sections.map((section, index) => (
                            <div key={section.id} className="collapse collapse-plus bg-base-100 border border-red-200 hover:border-red-400 transition">
                                <input 
                                    type="radio" 
                                    name="tc-accordion" 
                                    defaultChecked={index === 0}
                                />
                                <div className="collapse-title font-semibold text-gray-900 hover:text-red-600">
                                    {section.title}
                                </div>
                                <div className="collapse-content text-sm text-gray-700 bg-gray-50">
                                    <p className="whitespace-pre-wrap leading-relaxed pt-2">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions About Our Terms?</h2>
                    <p className="text-lg text-gray-700 mb-8">
                        If you have any questions about these Terms and Conditions, please don't hesitate to
                        contact us.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                        >
                            Contact Support
                        </a>
                        <a
                            href="mailto:support@redbridge.com"
                            className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
                        >
                            Email Us
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
                <div className="max-w-4xl mx-auto text-center text-gray-600">
                    <p className="mb-2">
                        By using RedBridge, you acknowledge that you have read, understood, and agree to be bound
                        by these Terms and Conditions.
                    </p>
                    <p className="text-sm">
                        © 2026 RedBridge. All rights reserved. Privacy Policy | Contact Us
                    </p>
                </div>
            </section>
        </div>
    );
};

export default TC;