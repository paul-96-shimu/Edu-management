import React from 'react';
import { useNavigate } from 'react-router';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-10 rounded-3xl shadow-lg max-w-lg text-center">
                <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Oops! Page Not Found</h2>
                <p className="text-gray-600 mb-6">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <button
                    onClick={handleGoHome}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
