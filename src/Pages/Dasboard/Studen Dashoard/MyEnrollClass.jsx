import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxios from '../../../Hooks/UseAxios';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import { Link } from 'react-router'; 

const MyEnrollClass = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxios();

  const { data: enrolledClasses = [], isLoading, isError } = useQuery({
    queryKey: ['enrolledClasses', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrollments/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading your enrolled classes...</p>;
  }

  if (isError || enrolledClasses.length === 0) {
    return <p className="text-center py-10">You have not enrolled in any classes yet.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Enrolled Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledClasses.map((cls) => (
          <div key={cls._id} className="border rounded p-4 shadow hover:shadow-lg transition">
            <img
              src={cls.classImage}
              alt={cls.classTitle}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-3">{cls.classTitle}</h3>
            <p className="mt-2 font-semibold">Price: ৳{cls.price}</p>
            <p className="text-sm text-gray-500 mt-1">
              Enrolled on: {new Date(cls.enrollmentDate).toLocaleDateString()}
            </p>

            <Link to={`/dashboard/class/${cls.classId}`}>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                Continue
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollClass;
