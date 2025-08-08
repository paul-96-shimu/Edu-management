import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PendingClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPending = () => {
    axios.get('https://server-kappa-steel.vercel.app/approveclasses?status=pending')
      .then(res => {
        setClasses(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load pending classes');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await axios.put(`https://server-kappa-steel.vercel.app/approveclasses/${id}/approve`);
      if (res.data.modifiedCount > 0) {
        toast.success('✅ Class approved!');
        fetchPending();
      }
    } catch (err) {
      toast.error('❌ Failed to approve class',err);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axios.put(`https://server-kappa-steel.vercel.app/approveclasses/${id}/reject`);
      if (res.data.modifiedCount > 0) {
        toast.warn('⚠️ Class rejected.');
        fetchPending();
      }
    } catch (err) {
      toast.error('❌ Failed to reject class',err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading pending classes...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Pending Classes</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {classes.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">No pending classes found.</div>
        ) : (
          classes.map((cls) => (
            <div key={cls._id} className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col p-6">
              <img src={cls.image} alt={cls.title} className="w-full h-40 object-cover rounded mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-1">{cls.title}</h3>
              <p className="text-gray-600 mb-2">By {cls.name}</p>
              <p className="text-gray-700 mb-2">{cls.description}</p>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold mb-2">Pending</span>
              <p className="text-green-700 font-semibold mb-4">৳{cls.price}</p>

              {/* ✅ Approve and ❌ Reject Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(cls._id)}
                  className="btn btn-success btn-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(cls._id)}
                  className="btn btn-error btn-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PendingClasses;
