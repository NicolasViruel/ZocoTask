import { createContext, useCallback, useContext, useState } from "react";
import { getUsersRequest } from "../api/admin";

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

  return (
    <AdminContext.Provider
      value={{
        users,
        getUsers,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
