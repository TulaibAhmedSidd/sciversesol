"use client";
import { useAppSelector } from "@/app/store/store";
import { checkArrNull } from "@/app/utils/helperFunc";
import { constantApp } from "@/app/utils/appConstant";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";
import RefreshButton from "@/app/components/RefreshButton";

const UserTabScreen = (props: any) => {
  const { setActiveTab, activeTab } = props;
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const userdata = useAppSelector((state) => state?.auth?.userdata);
  const isAdmin = userdata?.role == constantApp?.role?.admin;
  const loggedname = userdata?.name;

  const [loading, setLoading] = useState(false);
  const [deleteload, setdeleteload] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const validateForm = () => {
    let isValid = true;
    let errors: any = {};

    // Validate name
    if (!newUser.name) {
      isValid = false;
      errors.name = "User name is required";
    }

    // Validate category
    if (!newUser.email) {
      isValid = false;
      errors.email = "Password is email";
    }

    // Validate brand
    if (!newUser.password) {
      isValid = false;
      errors.password = "Password is required";
    }

    // Validate image
    if (!newUser.role) {
      isValid = false;
      errors.role = "User role is required";
    }

    setFormErrors(errors);
    return isValid;
  };
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: any) => {
    e.preventDefault();
    // Validate the form before submitting
    if (!validateForm()) {
      return;
    }
    // if (!isAdmin) {
    //   alert("You are not admin u cannot add");
    //   return;
    // }

    setLoading(true);

    if (editMode) {
      handleUpdateUser(e);
    } else {
      try {
        await axios.post("/api/user", newUser);
        setFormErrors({
          name: "",
          email: "",
          password: "",
          role: "",
        });
        setNewUser({
          name: "",
          email: "",
          password: "",
          role: "user",
        });
        fetchUsers(); // Refresh the user list
      } catch (error) {
        console.error("Error adding user:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleUpdateUser = async (e: any) => {
    try {
      await axios.patch(`/api/user/${editId}`, {
        userId: editId,
        updatedFields: newUser,
      });
      setFormErrors({
        name: "",
        email: "",
        password: "",
        role: "",
      });
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
      setEditId(null);
      setEditMode(false);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setLoading(false);
      setEditId(null);
      setEditMode(false);
    }
  };

  const handleDeleteUser = async (id: any) => {
    setdeleteload(true);
    try {
      await axios.delete(`/api/user/${id}`);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setdeleteload(false);
    }
  };

  const iSTAS = (user: any) => {
    return (
      user?.name == constantApp?.userTulaib?.name ||
      user?.email == constantApp?.userTulaib?.email
    );
  };
  return (
    <div>
      {/* User Management Tab */}
      {/* {activeTab === "users" && isAdmin && ( */}
      <div>
        <h1 className="text-xl font-bold mb-4">User Management</h1>

        <h3 className="text-xl font-semibold mb-4">Add New User</h3>
        <form
          onSubmit={handleAddUser}
          className="space-y-4"
          autoComplete="off"
        style={{
          opacity: !isAdmin ? "0.5" : "1",
          cursor: !isAdmin ? "not-allowed" : "auto",
          pointerEvents: !isAdmin ? "none" : "auto",
        }}
        >
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="p-2 w-full rounded-md border border-gray-300 mt-1 focus:ring-2 focus:ring-indigo-500"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              autoComplete="off"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="p-2 w-full rounded-md border border-gray-300 mt-1 focus:ring-2 focus:ring-indigo-500"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              placeholder="Enter password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="p-2 w-full rounded-md border border-gray-300 mt-1 focus:ring-2 focus:ring-indigo-500"
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>

          {/* Role Field */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="p-2 w-full rounded-md border border-gray-300 mt-1 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {formErrors.role && (
              <p className="text-red-500 text-sm">{formErrors.role}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={!isAdmin}
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md mt-4"
          >
            {editMode ? "Edit User" : "Add User"}
          </button>
        </form>
        <div className="flex gap-2 items-center mt-8 mb-4">
          <h3 className="text-xl font-semibold ">User List</h3>
          <RefreshButton onClick={fetchUsers} />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center size-4">
                    <Loading />
                  </td>
                </tr>
              ) : checkArrNull(users) ? (
                <li className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                  No data found, Please add some.
                </li>
              ) : (
                users.map((user: any) => (
                  <tr key={user?._id} className="border-b border-gray-200">
                    <td className="p-4">{user?.name}</td>
                    <td className="p-4">{user?.email}</td>
                    <td className="p-4">{user?.role}</td>
                    <td className="p-4">
                      <button
                        disabled={iSTAS(user)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-1"
                        onClick={() => {
                          setEditMode(true);
                          setEditId(user?._id);
                          setNewUser({
                            name: user?.name,
                            email: user?.email,
                            role: user?.role,
                            password: user?.password,
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        disabled={
                          iSTAS(user) ||
                          deleteload ||
                          !isAdmin ||
                          user?.name == loggedname
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={() => handleDeleteUser(user?._id)}
                      >
                        {deleteload ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default UserTabScreen;
