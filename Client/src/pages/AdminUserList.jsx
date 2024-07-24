import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/Admin.Context.jsx";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AdminUserList = React.memo(() => {
  const { users, getUsers, deleteUser, updateUser } = useAdmin();
  const { register, handleSubmit, reset } = useForm();
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleEditClick = (user) => {
    setEditingUser(user);
    reset(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    reset();
  };

  const onSubmit = handleSubmit((data) => {
    if (editingUser) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to update this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await updateUser(editingUser._id, data);
            Swal.fire("Success", "User updated successfully", "success");
            setEditingUser(null);
          } catch (error) {
            Swal.fire("Error", "Failed to update user", "error");
          }
        }
      });
    }
  });

  const handleDeleteClick = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(userId);
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete user", "error");
        }
      }
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold my-4">User List</h1>
      <table className="w-full max-w-3xl bg-zinc-800 text-white rounded-md">
        <thead>
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                {new Date(user.createdAt).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditClick(user)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="bg-zinc-800 p-4 rounded-md mt-4 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2">Edit User</h2>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Username"
            />
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Email"
            />
            <select
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              {...register("role")}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded-md my-2 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md my-2"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
});

export default AdminUserList;
