import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://server-kappa-steel.vercel.app';

const DashboardAllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const fetchClasses = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE}/approveclasses`;
      if (filter === 'approved') url += '?status=approved';
      if (filter === 'pending') url += '?status=pending';
      const res = await axios.get(url);
      setClasses(res.data);
    } catch (error) {
        console.log(error)
      setClasses([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClasses();
    // eslint-disable-next-line
  }, [filter]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Classes</h2>
      <div className="mb-4 flex gap-2">
        <button className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`btn btn-sm ${filter === 'approved' ? 'btn-primary' : ''}`} onClick={() => setFilter('approved')}>Approved</button>
        <button className={`btn btn-sm ${filter === 'pending' ? 'btn-primary' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
      </div>
      {loading ? (
        <p>Loading classes...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Instructor</th>
                <th>Status</th>
                <th>Price</th>
                <th>Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {classes.length > 0 ? (
                classes.map((cls) => (
                  <tr key={cls._id}>
                    <td>
                      <img src={cls.image || 'https://via.placeholder.com/40'} alt={cls.title} className="w-12 h-12 rounded" />
                    </td>
                    <td>{cls.title}</td>
                    <td>{cls.name}</td>
                    <td>
                      <span className={`badge ${cls.status === 'approved' ? 'badge-success' : cls.status === 'pending' ? 'badge-warning' : 'badge-error'}`}>{cls.status}</span>
                    </td>
                    <td>৳{cls.price}</td>
                    <td>{cls.totalEnrollment || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No classes found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardAllClasses;
