import React from "react";

const ContactUs = () => {
    return (
        <div className="bg-gray-50 py-16 px-6 md:px-20">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Contact <span className="text-blue-600">Us</span>
                </h2>
                <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                    Have questions, feedback, or need support? Get in touch with us!
                    Our team will respond to you as soon as possible.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                {/* Left side info */}
                <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Get in Touch</h3>
                    <p className="text-gray-600 mb-6">
                        You can reach us via email, phone, or by filling out the form.
                        We’re here to help with any queries related to our Edu Management Platform.
                    </p>
                    <ul className="space-y-4 text-gray-700">
                        <li>
                            📍 Address: 123 Edu Street, Dhaka, Bangladesh
                        </li>
                        <li>
                            📧 Email: support@edumanage.com
                        </li>
                        <li>
                            📞 Phone: +880 1234-567890
                        </li>
                    </ul>
                </div>

                {/* Right side contact form */}
                <div className="bg-white shadow-lg rounded-2xl p-8">
                    <form className="space-y-5">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="input input-bordered w-full rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Message</label>
                            <textarea
                                placeholder="Write your message..."
                                className="textarea textarea-bordered w-full rounded-xl"
                                rows="5"
                            ></textarea>
                        </div>
                        <button className="btn btn-primary w-full rounded-xl">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
