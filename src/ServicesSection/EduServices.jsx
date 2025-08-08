import React from 'react';
import { FaChalkboardTeacher, FaBookOpen, FaLaptopCode, FaCertificate, FaUsers, FaComments } from "react-icons/fa";
import ServiceCard from './ServiceCard'; // তোমার ServiceCard যদি আলাদা নামে থাকে, তাহলে ঠিক করো

const eduServices = [
    {
        icon: <FaChalkboardTeacher className="text-4xl text-black" />,
        title: "Experienced Teachers",
        description: "Our platform features expert teachers who deliver quality education and personalized guidance.",
    },
    {
        icon: <FaBookOpen className="text-4xl text-black" />,
        title: "Comprehensive Courses",
        description: "A wide range of courses covering multiple subjects, designed to meet diverse learning needs.",
    },
    {
        icon: <FaLaptopCode className="text-4xl text-black " />,
        title: "Interactive Online Classes",
        description: "Engage in live online classes with interactive tools to enhance your learning experience.",
    },
    {
        icon: <FaCertificate className="text-4xl text-black " />,
        title: "Certification",
        description: "Get certified upon successful completion of courses to boost your academic and professional profile.",
    },
    {
        icon: <FaUsers className="text-4xl text-black " />,
        title: "Community Support",
        description: "Join a vibrant community of learners and educators for collaboration and peer support.",
    },
    {
        icon: <FaComments className="text-4xl text-black" />,
        title: "Feedback & Mentorship",
        description: "Receive constructive feedback and mentorship to guide your learning journey effectively.",
    },
];

const EduServices = () => {
    return (
        <section className="my-16 px-4 md:px-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold">Our Educational Services</h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Discover our range of educational features designed to help students and teachers excel.
                </p>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {eduServices.map((service, idx) => (
                    <ServiceCard
                        key={idx}
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                    />
                ))}
            </div>
        </section>
    );
};

export default EduServices;
