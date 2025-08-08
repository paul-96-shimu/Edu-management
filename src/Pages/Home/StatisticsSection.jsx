import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const StatisticsSection = () => {
  const { data: userData = {} } = useQuery({
    queryKey: ['totalUsers'],
    queryFn: async () => {
      const res = await axios.get('https://server-kappa-steel.vercel.app/stats/total-users');
      return res.data;
    }
  });

  const { data: classData = {} } = useQuery({
    queryKey: ['totalClasses'],
    queryFn: async () => {
      const res = await axios.get('https://server-kappa-steel.vercel.app/stats/total-classes');
      return res.data;
    }
  });

  const { data: enrollmentData = {} } = useQuery({
    queryKey: ['totalEnrollments'],
    queryFn: async () => {
      const res = await axios.get('https://server-kappa-steel.vercel.app/stats/total-enrollments');
      return res.data;
    }
  });

  return (
    <div className="my-20 px-4 md:px-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Left side: cards */}
      <div className="space-y-6">
        <div className="bg-blue-100 rounded-xl p-6 shadow">
          <h3 className="text-xl font-bold text-blue-600">Total User</h3>
          <p className="text-3xl">{userData.totalUsers || 0}</p>
        </div>
        <div className="bg-green-100 rounded-xl p-6 shadow">
          <h3 className="text-xl font-bold text-green-600">Total Class</h3>
          <p className="text-3xl">{classData.totalClasses || 0}</p>
        </div>
        <div className="bg-purple-100 rounded-xl p-6 shadow">
          <h3 className="text-xl font-bold text-purple-600">Total Enrollment</h3>
          <p className="text-3xl">{enrollmentData.totalEnrollments || 0}</p>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="flex justify-center">
        <img
          src="https://i.ibb.co/rGMdDvnH/statchhgh.jpg"
          alt="Statistics"
          className="rounded-xl shadow-xl w-full max-w-md"
        />
      </div>
    </div>
  );
};

export default StatisticsSection;
