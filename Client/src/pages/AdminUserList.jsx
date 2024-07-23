import React, { useEffect } from 'react';
import { useAdmin } from '../context/Admin.Context.jsx';

function AdminUserList() {
  const { users, getUsers } = useAdmin();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

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
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">{new Date(user.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserList;