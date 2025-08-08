import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import TeacherProfile from './TeacherAddclass/TeacherProfile';
import StudenProfile from './Studen Dashoard/StudenProfile';
import AdminProfile from '../Admin/AdminProfile';

const DynamicProfile = () => {
  const { role } = useContext(AuthContext);

  console.log("Current role is:", role);
if (role === 'admin') {
    return <AdminProfile />;
  }

  if (role === 'teacher') {
    return <TeacherProfile />;
  }

  return <StudenProfile />;
};

export default DynamicProfile;
