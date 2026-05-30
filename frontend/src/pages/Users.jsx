import { useEffect, useState } from "react";
import API from "../services/api";

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

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    const res = await API.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setUsers(res.data.users);
    setFilteredUsers(res.data.users);
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

      alert("User Created");

      fetchUsers();

      setForm({
        username: "",
        email: "",
        password: "",
        role: "USER"
      });

    } catch (err) {
      alert("Error creating user");
    }
  };

  const deleteUser = async (id) => {
    try {

      await API.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("User Deleted");

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

      alert("Role Updated");

      fetchUsers();

    } catch (err) {
      alert("Error updating role");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users Management</h2>

      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <select
        value={form.role}
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      >
        <option>USER</option>
        <option>UNIT_MANAGER</option>
        <option>ADMIN</option>
      </select>

      <button onClick={createUser}>
        Create User
      </button>

      <hr />

      <h3>Search / Filter Users</h3>

      <input
        placeholder="Search User"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
      >
        <option value="">All Roles</option>
        <option value="USER">USER</option>
        <option value="UNIT_MANAGER">UNIT_MANAGER</option>
        <option value="ADMIN">ADMIN</option>
        <option value="SUPER_ADMIN">SUPER_ADMIN</option>
      </select>

      <hr />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>
                <select
                  defaultValue={user.role}
                  onChange={(e) =>
                    updateRole(user._id, e.target.value)
                  }
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
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
