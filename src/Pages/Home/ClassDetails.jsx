import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import UseAxios from '../../Hooks/UseAxios';



const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = UseAxios();

  const { data: classInfo} = useQuery({
    queryKey: ['class-details', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-[50vh]">
  //       <span className="loading loading-spinner loading-lg text-blue-500"></span>
  //     </div>
  //   );
  // }

  // if (error || !classInfo) {
  //   return (
  //     <div className="text-center text-red-600 font-semibold">
  //       ❌ SomeThing went wrong while fetching class details.
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <img
        src={classInfo?.image || 'https://via.placeholder.com/600x300'}
        alt={classInfo?.title || 'Class Image'}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-3xl font-bold mb-2">{classInfo?.title || 'Untitled Class'}</h2>
      <p><strong>Instructor:</strong> {classInfo?.name || 'Unknown'}</p>
      <p><strong>Email:</strong> {classInfo?.email || 'N/A'}</p>
      <p><strong>Price:</strong> ৳{classInfo?.price || 'Free'}</p>
      <p className="mt-3">{classInfo?.description || 'No description provided.'}</p>

      <div className="flex gap-4 mt-6">
        <button
          className="btn btn-success"
          onClick={() => navigate(`/payment/${id}`)}
        >
          💳 Pay & Enroll
        </button>
        {classInfo?.status === 'pending' && (
          <button
            className="btn btn-warning"
            onClick={async () => {
              try {
                await axiosSecure.put(`/classes/${id}/approve`);
                window.location.reload();
              } catch (err) {
                alert('Failed to approve class',err);
              }
            }}
          >
            Approve Class
          </button>
        )}
      </div>
    </div>
  );
};

export default ClassDetails;

