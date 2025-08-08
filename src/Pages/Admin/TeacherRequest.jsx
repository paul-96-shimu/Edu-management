import React from 'react';
import UseAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const TeacherRequest = () => {
  const axiosSecure = UseAxios();

  // 🔁 Load teacher requests
  const { data: requests = [], refetch } = useQuery({
    queryKey: ['teacher-requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/teacher-requests');
      return res.data;
    }
  });

  // 🔁 Approve/Reject mutation
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/teacher-requests/${id}`, { status: newStatus });
      if (res.data.modifiedCount > 0) {
        toast.success(`Request ${newStatus} successfully`);
        refetch();
      }
    } catch (err) {
      toast.error('Failed to update status',err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📚 Teacher Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Experience</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req._id}>
                  <td><img src={req.image} alt="pic" className="w-12 h-12 rounded-full" /></td>
                  <td>{req.name}</td>
                  <td>{req.email}</td>
                  <td>{req.experience}</td>
                  <td>{req.title}</td>
                  <td>{req.category}</td>
                  <td>
                    <span className={`badge ${
                      req.status === 'pending' ? 'badge-warning' :
                      req.status === 'accepted' ? 'badge-success' : 'badge-error'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(req._id, 'accepted')}
                      className="btn btn-xs btn-success"
                      disabled={req.status !== 'pending'}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(req._id, 'rejected')}
                      className="btn btn-xs btn-error"
                      disabled={req.status !== 'pending'}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeacherRequest;
