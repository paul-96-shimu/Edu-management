import React, { useState } from 'react';
import UseAxios from '../../Hooks/UseAxios';


const ManageAdmin = () => {
  const axiosSecure = UseAxios();
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const res = await axiosSecure.get(`/users/search?q=${query}`);
      setUser(res.data);
      setError('');
    } catch (err) {
      setUser(null);
      setError(err.response?.data?.message || 'User not found');
    }
  };

  const handleMakeAdmin = async () => {
    await axiosSecure.put(`/users/role/admin/${user.email}`);
    setUser({ ...user, role: 'admin' });
  };

  const handleRemoveAdmin = async () => {
    await axiosSecure.put(`/users/role/remove-admin/${user.email}`);
    setUser({ ...user, role: 'student' });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">🔍 Search & Manage Admin</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by email or name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full"
        />
        <button onClick={handleSearch} className="btn btn-primary">Search</button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {user && (
        <div className="border p-4 rounded bg-gray-50">
          <p><strong>Name:</strong> {user.name || 'N/A'}</p>
          <p><strong>Img:</strong> {user.photoURL || 'N/A'}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Created:</strong> {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>

          {user.role !== 'admin' ? (
            <button onClick={handleMakeAdmin} className="btn btn-success mt-3">Make Admin</button>
          ) : (
            <button onClick={handleRemoveAdmin} className="btn btn-error mt-3">Remove Admin</button>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageAdmin;
