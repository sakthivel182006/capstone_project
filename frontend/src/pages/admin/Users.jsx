import React, { useEffect, useState } from "react";
import api from "../../config/Api";

const Users = () => {

  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER"
  });

  const [roleUpdate, setRoleUpdate] = useState({
    userId: "",
    role: "USER"
  });

  const [validateResult, setValidateResult] = useState("");

  // ================= FETCH ALL USERS =================
  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= GET USER BY ID =================
  const getUserById = async () => {
    try {
      const response = await api.get(`/api/users/${searchId}`);
      alert(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  // ================= DELETE USER =================
  const deleteUser = async (id) => {
    try {
      await api.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= DELETE ALL USERS =================
  const deleteAllUsers = async () => {
    try {
      await api.delete("/api/users/delete-all");
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= REGISTER USER =================
  const registerUser = async () => {
    try {
      await api.post("/api/users/register", newUser);
      alert("User registered successfully");
      setNewUser({
        username: "",
        email: "",
        password: "",
        role: "USER"
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= UPDATE ROLE =================
  const updateUserRole = async () => {
    try {
      await api.put(`/api/users/${roleUpdate.userId}/role`, {
        role: roleUpdate.role
      });
      alert("Role updated successfully");
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= VALIDATE TOKEN =================
  const validateToken = async () => {
    try {
      const response = await api.get(`/api/users/validate?token=${token}`);
      setValidateResult(response.data);
    } catch (error) {
      setValidateResult("Invalid or expired token");
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">Users Management</h1>

      {/* ================= REGISTER USER ================= */}
      <div className="bg-gray-100 p-6 rounded mb-8">
        <h2 className="font-semibold mb-4">Register New User</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="border p-2"
          />
          <input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="border p-2"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border p-2"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="WAREHOUSE_MANAGER">WAREHOUSE_MANAGER</option>
          </select>
        </div>

        <button
          onClick={registerUser}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </div>

      {/* ================= UPDATE ROLE ================= */}
      <div className="bg-gray-100 p-6 rounded mb-8">
        <h2 className="font-semibold mb-4">Update User Role</h2>

        <input
          placeholder="User ID"
          value={roleUpdate.userId}
          onChange={(e) => setRoleUpdate({ ...roleUpdate, userId: e.target.value })}
          className="border p-2 mr-4"
        />

        <select
          value={roleUpdate.role}
          onChange={(e) => setRoleUpdate({ ...roleUpdate, role: e.target.value })}
          className="border p-2 mr-4"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
          <option value="WAREHOUSE_MANAGER">WAREHOUSE_MANAGER</option>
        </select>

        <button
          onClick={updateUserRole}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update Role
        </button>
      </div>

      {/* ================= VALIDATE TOKEN ================= */}
      <div className="mb-8">
        <button
          onClick={validateToken}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Validate Current Token
        </button>

        {validateResult && (
          <p className="mt-3 font-semibold">{validateResult}</p>
        )}
      </div>

      {/* ================= SEARCH USER BY ID ================= */}
      <div className="mb-6">
        <input
          placeholder="Search User by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border p-2 mr-4"
        />
        <button
          onClick={getUserById}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          View User JSON
        </button>
      </div>

      <button
        onClick={deleteAllUsers}
        className="bg-red-700 text-white px-4 py-2 rounded mb-6"
      >
        Delete All Users
      </button>

      {/* ================= USERS LIST ================= */}
      <div className="grid grid-cols-2 gap-6">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow">

            <h3 className="font-bold text-lg mb-2">{user.username}</h3>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>

            <button
              onClick={() => deleteUser(user.id)}
              className="mt-4 bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete User
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Users;