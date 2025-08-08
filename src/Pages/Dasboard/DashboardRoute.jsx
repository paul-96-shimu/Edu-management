import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import TeacherDashboard from './TeacherDashboard';

const DashboardRoute = () => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }
  if (!user) {
    return <div className="text-center py-20">Please login.</div>;
  }
  if (role === 'teacher') {
    return <TeacherDashboard />;
  }
  return <div className="text-center py-20 text-red-500">Access denied. You are not a teacher.</div>;
};

export default DashboardRoute;
