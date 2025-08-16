import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';

const StudenProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">👑 Studen Profile</h2>
      <img src={user?.photoURL} alt="Profile" className="w-24 h-24 rounded-full" />
      <p><strong>Name:</strong> {user?.displayName}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Phone:</strong> {user?.phoneNumber || 'Not provided'}</p>
      <p><strong>Address:</strong> {user?.address || 'Not provided'}</p>


      <p><strong>Role:</strong> Student</p>
    </div>
  );
};

export default StudenProfile;