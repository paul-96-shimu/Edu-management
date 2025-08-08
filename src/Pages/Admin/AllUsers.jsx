
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://server-kappa-steel.vercel.app'; // Change if using a different backend URL

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (searchTerm = "") => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/users?search=${searchTerm}`);
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else if (res.data && Array.isArray(res.data.users)) {
        setUsers(res.data.users);
      } else {
        setUsers([]);
        console.warn("Warning: Unexpected users response structure", res.data);
      }
    } catch (error) {
      console.error("Error fetching users", error);
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    fetchUsers(val);
  };

  const makeAdmin = async (email) => {
    try {
      await axios.put(`${API_BASE}/users/role/admin/${email}`);
      fetchUsers(search);
    } catch (error) {
      console.error("Failed to make admin", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={handleSearchChange}
        className="input input-bordered mb-4 w-full max-w-md"
      />
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Make Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <img
                        src={user.image || "https://via.placeholder.com/40"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        disabled={user.role === "admin"}
                        onClick={() => makeAdmin(user.email)}
                        className={`btn btn-sm ${user.role === "admin" ? "btn-disabled" : "btn-primary"}`}
                      >
                        {user.role === "admin" ? "Admin" : "Make Admin"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
