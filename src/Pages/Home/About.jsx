import React from 'react';

const About = () => {
    return (
        <div className="bg-gray-50 py-16 px-6 md:px-20 lg:px-32">
            <div className="max-w-5xl mx-auto text-center">
                {/* Heading */}
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                    About <span className="text-blue-600">EduManage</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-10">
                    EduManage is a modern Educational Management Platform built to simplify learning,
                    teaching, and administration. We empower{" "}
                    <span className="font-semibold text-gray-800">students</span>,{" "}
                    <span className="font-semibold text-gray-800">teachers</span>, and{" "}
                    <span className="font-semibold text-gray-800">admins</span> with
                    seamless tools to manage classes, payments, assignments, and communication.
                </p>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                    <h3 className="text-2xl font-semibold text-blue-600 mb-3">🎓 For Students</h3>
                    <p className="text-gray-600">
                        Enroll in approved classes, track assignments, make secure payments,
                        and share feedback with ease.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                    <h3 className="text-2xl font-semibold text-blue-600 mb-3">👩‍🏫 For Teachers</h3>
                    <p className="text-gray-600">
                        Create and manage classes, monitor student progress, and interact
                        through assignments and feedback tools.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                    <h3 className="text-2xl font-semibold text-blue-600 mb-3">🛠 For Admins</h3>
                    <p className="text-gray-600">
                        Oversee users, approve teachers, manage platform-wide content,
                        and ensure smooth educational operations.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-4xl mx-auto text-center mt-16">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                    To make education management easier, smarter, and accessible for everyone.
                    EduManage is not just a tool – it’s a bridge between learners, educators, and
                    administrators to build a future of connected learning.
                </p>
            </div>
        </div>
    );
};

export default About;