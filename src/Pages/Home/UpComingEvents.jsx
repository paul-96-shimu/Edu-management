import React, { useState } from "react";

const UpcomingEvents = () => {
    const events = [
        {
            id: 1,
            title: "Web Development Workshop",
            date: "August 25, 2025",
            description:
                "Hands-on session on MERN stack development with live projects.",
            image: "https://i.ibb.co.com/Ng0FvJtD/web-develoment.jpg",
            details:
                "This workshop will cover full MERN stack development including React, Node.js, Express, and MongoDB. Students will build real-world projects and learn deployment techniques.",
        },
        {
            id: 2,
            title: "Teacher Training Program",
            date: "September 2, 2025",
            description:
                "Special training session for teachers on using EduManage platform effectively.",
            image: "https://i.ibb.co.com/SwRhNV82/teacher.jpg",
            details:
                "The Teacher Training Program focuses on effective use of EduManage features such as class management, assignment grading, and communication with students. Practical sessions included.",
        },
        {
            id: 3,
            title: "Student Career Guidance",
            date: "September 10, 2025",
            description:
                "Career counseling event to guide students for future opportunities.",
            image: "https://i.ibb.co.com/NdwbSZd7/student.png",
            details:
                "Students will get personalized guidance on career options, resume building, and interview preparation. Experienced mentors from different fields will participate.",
        },
    ];

    const [selectedEvent, setSelectedEvent] = useState(null);

    const openModal = (event) => {
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
                    Upcoming <span className="text-blue-600">Events</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300"
                        >
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {event.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2">{event.date}</p>
                                <p className="text-gray-600">{event.description}</p>
                                <button
                                    onClick={() => openModal(event)}
                                    className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative">
                        <h3 className="text-2xl font-semibold mb-4 text-blue-800">
                            {selectedEvent.title}
                        </h3>
                        <p className="text-gray-500 mb-2">{selectedEvent.date}</p>
                        <p className="text-gray-600 mb-4">{selectedEvent.details}</p>
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-xl"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpcomingEvents;
