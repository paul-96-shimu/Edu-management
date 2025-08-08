import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import UseAxios from '../../Hooks/UseAxios';
import axios from 'axios';


const AllClass = () => {
 
  const navigate = useNavigate();

  // React Query দিয়ে ফেচিং
  const { data: classes = [], isLoading, isError, error } = useQuery({
    queryKey: ['classes', 'approved'],
    queryFn: async () => {
      const res = await axios.get(`https://server-kappa-steel.vercel.app/approveclasses?status=approved`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-20">Loading classes...</div>;
  }

  if (isError) {

    console.log
    return (
      <div className="text-center py-20 text-red-500">
        {error?.response?.data?.message || 'Failed to load classes'}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-700 tracking-tight">
        All Approved Classes
      </h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {classes.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">
            No approved classes found.
          </div>
        ) : (
          classes.map((cls, idx) => (
            <div
              key={cls._id || idx}
              className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden"
            >
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {cls.title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  By{' '}
                  <span className="font-semibold text-blue-600">{cls.name}</span>
                </p>
                <p className="text-gray-700 mb-3 line-clamp-2">{cls.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-green-600">
                    ৳{cls.price}
                  </span>
                  <span className="text-xs text-gray-400">
                    Enrolled: {cls.totalEnrollment || 0}
                  </span>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
                    onClick={() => navigate(`/class/${cls._id}`)}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllClass;
