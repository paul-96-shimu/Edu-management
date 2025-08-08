// 📁 src/Pages/Error/Forbidden.jsx
import React from 'react';
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-red-600">403</h1>
        <h2 className="text-3xl font-bold mt-4 text-gray-800">Access Forbidden</h2>
        <p className="mt-2 text-gray-600">
          You do not have permission to view this page.
        </p>
        <Link to="/" className="mt-6 inline-block bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
          🔙 Go Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
