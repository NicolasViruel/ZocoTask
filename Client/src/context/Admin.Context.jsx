import { createContext, useCallback, useContext, useState } from "react";
import {
  getUsersRequest,
  addUsersRequest,
  updateUsersRequest,
  deleteUsersRequest,
} from "../api/admin";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }

  return context;
};

export function AdminProvider({ children }) {
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addUser = useCallback(async (user) => {
    try {
      const res = await addUsersRequest(user);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === id ? res.data : u))
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateUser = useCallback(async (id, user) => {
    try {
      const res = await updateUsersRequest(id, user);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === id ? res.data : u))
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    try {
      await deleteUsersRequest(id);
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        users,
        getUsers,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
