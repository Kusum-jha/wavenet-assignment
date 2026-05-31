import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/ManagementPages.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER"
  });

  const [createError, setCreateError] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(res.data.users);
      setFilteredUsers(res.data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let result = [...users];

    if (search) {
      result = result.filter(
        (user) =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (roleFilter) {
      result = result.filter(
        (user) => user.role === roleFilter
      );
    }

    setFilteredUsers(result);

  }, [search, roleFilter, users]);

  const createUser = async () => {
    setCreateError("");
    setCreateSuccess("");

    if (!form.username || !form.email || !form.password) {
      setCreateError("All fields are required");
      return;
    }

    try {
      await API.post(
        "/users",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCreateSuccess("User created successfully!");

      fetchUsers();

      setForm({
        username: "",
        email: "",
        password: "",
        role: "USER"
      });

      setTimeout(() => setCreateSuccess(""), 3000);

    } catch (err) {
      setCreateError(err.response?.data?.message || "Error creating user");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {

      await API.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchUsers();

    } catch (err) {
      alert("Error deleting user");
    }
  };

  const updateRole = async (id, role) => {
    try {

      await API.put(
        `/users/${id}`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchUsers();

    } catch (err) {
      alert("Error updating role");
    }
  };

  return (
    <div className="management-container">
      <div className="management-header">
        <h1>User Management</h1>
        <p>Create, search, and manage user accounts and roles</p>
      </div>

      <div className="management-content">
        {/* Create User Section */}
        <div className="management-card">
          <h2>Create New User</h2>
          
          {createError && <div className="error-message">{createError}</div>}
          {createSuccess && <div className="success-message">{createSuccess}</div>}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter username"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="USER">USER</option>
                <option value="UNIT_MANAGER">UNIT_MANAGER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>

          <button onClick={createUser} className="btn-primary">
            Create User
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="management-card">
          <h2>Search & Filter Users</h2>

          <div className="filter-grid">
            <div className="form-group">
              <label htmlFor="search">Search by Username or Email</label>
              <input
                id="search"
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="roleFilter">Filter by Role</label>
              <select
                id="roleFilter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="USER">USER</option>
                <option value="UNIT_MANAGER">UNIT_MANAGER</option>
                <option value="ADMIN">ADMIN</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              </select>
            </div>
          </div>

          {filteredUsers.length > 0 && (
            <div className="result-count">
              Found {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Users Table Section */}
        <div className="management-card">
          <h2>All Users</h2>

          {filteredUsers.length === 0 ? (
            <div className="no-data">No users found</div>
          ) : (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Current Role</th>
                    <th>Change Role</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="role-badge">{user.role}</span>
                      </td>

                      <td>
                        <select
                          defaultValue={user.role}
                          onChange={(e) =>
                            updateRole(user._id, e.target.value)
                          }
                          className="role-select"
                        >
                          <option value="USER">USER</option>
                          <option value="UNIT_MANAGER">UNIT_MANAGER</option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                        </select>
                      </td>

                      <td>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="btn-delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
