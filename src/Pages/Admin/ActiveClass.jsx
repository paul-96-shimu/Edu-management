import React, { useEffect, useState } from 'react';
import UseAxios from '../../Hooks/UseAxios';

const ActiveClasses = () => {
  const axiosSecure = UseAxios();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axiosSecure.get('/approveclasses?status=approved')
      .then(res => {
        setClasses(res.data);
      })
      .catch(err => {
        console.error("❌ Error loading classes:", err);
      });
  }, [axiosSecure]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">✅ Active Classes</h2>

      {classes.length === 0 ? (
        <p className="text-center text-gray-500">No approved classes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls._id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold text-blue-600">{cls.title}</h3>
              <p><span className="font-semibold">Category:</span> {cls.category}</p>
              <p><span className="font-semibold">Instructor:</span> {cls.instructorName || cls.name}</p>
              <p><span className="font-semibold">Email:</span> {cls.email}</p>
              <p><span className="font-semibold">Status:</span> <span className="text-green-600 font-bold">{cls.status}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveClasses;
