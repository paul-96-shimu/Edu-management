import React from 'react';
import AddClass from './TeacherAddclass/AddClass';

const TeacherDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Teacher Dashboard</h1>
      <AddClass />
    </div>
  );
};

export default TeacherDashboard;
