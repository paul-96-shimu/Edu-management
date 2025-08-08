import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import UseAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
// import FeedbackForm from '../Home/FeedbackForm';

const MyClass = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxios();
  const navigate = useNavigate(); // ✅ enable navigation

  // Load teacher's own classes
  const { data: classes = [], refetch } = useQuery({
    queryKey: ['my-classes', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/instructor/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // Filter pending classes
  const pendingClasses = classes.filter(cls => cls.status === 'pending');

  // Delete class handler
  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this class?');
    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/classes/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Class deleted successfully!");
        refetch();
      }
    } catch (error) {
      toast.error("Delete failed.", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Classes</h2>

      {classes.length === 0 ? (
        <p>No classes added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls._id} className="border p-4 rounded shadow">
              <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover rounded" />
              <h3 className="text-xl mt-2 font-bold">{cls.title}</h3>
              <p>Price: ৳{cls.price}</p>
              <p>Status:
                <span className={`font-medium ${cls.status === 'approved' ? 'text-green-600' : cls.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                  {cls.status}
                </span>
              </p>
              <p>Enrollments: {cls.totalEnrollments}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  className="btn btn-sm btn-outline btn-info"
                  onClick={() => navigate(`/dashboard/edit-class/${cls._id}`)} // ✅ navigate to edit page
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cls._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  Delete
                </button>

                <button
                  onClick={() => navigate(`/dashboard/see-details/${cls._id}`)}
                  className="btn btn-sm btn-outline btn-success"
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pending Classes Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-yellow-700">Pending Classes</h2>
        {pendingClasses.length === 0 ? (
          <p className="text-gray-500">No pending classes.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingClasses.map((cls) => (
              <div key={cls._id} className="border p-4 rounded shadow bg-yellow-50">
                <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover rounded" />
                <h3 className="text-xl mt-2 font-bold text-yellow-800">{cls.title}</h3>
                <p>Price: ৳{cls.price}</p>
                <p>Status: <span className="font-medium text-yellow-700">Pending</span></p>
                <p>Enrollments: {cls.totalEnrollments}</p>
              </div>
            ))}
          </div>
        )}
      </div>

   
    </div>
  );
};

export default MyClass;
