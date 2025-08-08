import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const ActiveTeachers = () => {
  const {
    data: teachers = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['approved-teachers'],
    queryFn: async () => {
      const res = await axios.get('https://server-kappa-steel.vercel.app/approved-teachers');
      return Array.isArray(res.data) ? res.data : [];
    }
  });

  useEffect(() => {
    if (isError) {
      console.error("❌ Error loading approved teachers:", error.message);
    }
  }, [isError, error]);

  if (isLoading) {
    return <p className="text-center text-lg font-semibold py-10">⏳ Loading approved teachers...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500 font-semibold py-10">❌ Failed to load data</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">✅ Approved Teachers</h2>
      {teachers.length === 0 ? (
        <p className="text-center text-gray-500">No approved teachers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td>
                    <img
                      src={teacher.photoURL || teacher.image || "https://i.ibb.co/mVDMZGrK/woman.webp"}
                      alt="teacher"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>
                    <span className="badge badge-success capitalize">
                      {teacher.role || "teacher"}
                    </span>
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

export default ActiveTeachers;
