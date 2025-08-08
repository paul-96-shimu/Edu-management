import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import UseAxios from '../../Hooks/UseAxios';

const SeeDetails = () => {
 const { id } = useParams();
  const axiosSecure = UseAxios();
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      setClassData(res.data);
    };
    fetchData();
  }, [id, axiosSecure]);

  if (!classData) return <p>Loading...</p>;

    return (
        <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{classData.title}</h2>
      <img src={classData.image} alt={classData.title} className="w-full h-64 object-cover rounded mb-4" />
      <p><strong>Price:</strong> ৳{classData.price}</p>
      <p><strong>Status:</strong> {classData.status}</p>
      <p><strong>Total Enrollments:</strong> {classData.totalEnrollments}</p>
      <p><strong>Total Assignments:</strong> {classData.totalAssignments || 0}</p>
      <p><strong>Total Submissions:</strong> {classData.totalSubmissions || 0}</p>

      <Link
        to={`/dashboard/create-assignment/${id}`} 
        className="btn mt-4 btn-primary"
      >
        ➕ Create Assignment
      </Link>
    </div>
    );
};

export default SeeDetails;