import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import useRole from "../Hooks/useRole";
import { NavLink, Outlet } from "react-router";
import EduLogo from "../Shared/EduLogo";

const DashBoard = () => {
  const { user } = useContext(AuthContext);
  const { role, roleLoading } = useRole();

  const SidebarLink = ({ to, label }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-500 transition-all'
        }
      >
        {label}
      </NavLink>
    </li>
  );

  if (roleLoading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-4">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button lg:hidden mb-4">
          ☰ Open Sidebar
        </label>
        <Outlet />
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu w-80 min-h-full bg-base-200 text-base-content p-4 space-y-2">
          <EduLogo />

          {user && (
            <div className="p-4 text-center border-b mb-4">
              <img src={user.photoURL} alt="User" className="w-16 h-16 mx-auto rounded-full" />
              <p className="mt-2 font-semibold">{user.displayName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          )}

          <SidebarLink to="/" label="🏠 Home" />

          {/* Admin Routes */}
          {role === 'admin' && (
            <>
              <SidebarLink to="/dashboard/panding-classes" label="🕓 Pending Classes" />
              <SidebarLink to="/dashboard/active-classes" label="✅ Active Classes" />
              <SidebarLink to="/dashboard/teacher-request" label="📩 Teacher Requests" />
              <SidebarLink to="/dashboard/users" label="👥 All Users" />
              <SidebarLink to="/dashboard/all-classes" label="📚 All Classes" />
              <SidebarLink to="/dashboard/active-teachers" label="✅ Active Teachers" />
              <SidebarLink to="/dashboard/pending-teachers" label="⏳ Pending Teachers" />
              <SidebarLink to="/dashboard/manage-admin" label="🔐 Manage Admins" />
              <SidebarLink to="/dashboard/my-profile" label="🙍‍♂️ My Profile" />
            </>
          )}

          {/* Teacher Routes */}
          {role === 'teacher' && (
            <>
              <SidebarLink to="/dashboard/addclass" label="➕ Add Class" />
              <SidebarLink to="/dashboard/myclasses" label="🎓 My Classes" />
              <SidebarLink to="/dashboard/my-profile" label="🙍‍♂️ My Profile" />
            </>
          )}

          {/* Student Routes */}
          {role === 'student' && (
            <>
              <SidebarLink to="/dashboard/my-enroll-class" label="✅ My Enrolled Classes" />
              <SidebarLink to="/dashboard/my-orders" label="💳 My Payments" />
              <SidebarLink to="/dashboard/my-profile" label="🙍‍♂️ My Profile" />
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
