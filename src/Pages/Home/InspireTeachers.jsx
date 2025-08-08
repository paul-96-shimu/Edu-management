import React from "react";
import { Link } from "react-router";

const InspireTeachers = () => {
  return (
     <div className="bg-base-100 py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Text Content */}
        <div>
          <h2 className="text-4xl font-bold text-primary mb-4">
            Become an Inspirational Teacher
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Share your knowledge and inspire thousands of students around the world. 
            Join our platform as a teacher and make a real difference.
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Create and manage your own classes</li>
            <li>Guide students in various subjects</li>
            <li>Be part of a global educator community</li>
          </ul>
         <Link to="teach">
          <button   className="btn btn-primary">
            Join as a Teacher
          </button>
         </Link>
        </div>

        {/* Right Side - Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754"
            alt="Inspire Teachers"
            className="rounded-2xl shadow-xl max-h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default InspireTeachers;
