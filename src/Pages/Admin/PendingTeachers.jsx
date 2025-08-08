import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const PendingTeachers = () => {
  const { data: requests = [], refetch } = useQuery({
    queryKey: ['pending-teachers'],
    queryFn: async () => {
      const res = await axios.get('https://server-kappa-steel.vercel.app/teacher-requests');
       console.log(res.data);
      return res.data.filter(req => req.status === 'pending');
    }
  });

  const handleApprove = async (id) => {
    try {
      const res = await axios.put(`https://server-kappa-steel.vercel.app/teacher-requests/${id}/approve`);
      if (res.data.modifiedCount > 0) {
        toast.success('Approved Successfully');
        refetch();
      }
    } catch (err) {
      toast.error('Failed to approve',err);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axios.put(`https://server-kappa-steel.vercel.app/teacher-requests/${id}/reject`);
      if (res.data.modifiedCount > 0) {
        toast.success('Rejected');
        refetch();
      }
    } catch (err) {
      toast.error('Failed to reject',err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Pending Teacher Requests</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Experience</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td><img src={req.photo} className="w-12 h-12 rounded-full" /></td>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.experience}</td>
                <td>{req.category}</td>
                <td><span className="text-yellow-600">{req.status}</span></td>
                <td>
                  <button onClick={() => handleApprove(req._id)} className="btn btn-xs btn-success mr-2">Approve</button>
                  <button onClick={() => handleReject(req._id)} className="btn btn-xs btn-error">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingTeachers;
