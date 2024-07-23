import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Navbar() {
  const { isAuthenticated, logout, user, isAdmin } = useAuth();
  
  return (

    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
    
      <Link to="/tasks" className="hidden sm:block">
        <h1 className="text-2xl font-bold mx-2">Zoco Tasks Manager</h1>
      </Link>
    
    <ul className="  flex w-full gap-x-2 mx-4 sm:justify-center justify-end gap-4"> 

      {isAuthenticated ? (
        <>
          <li className="items-center flex justify-center"> 
            <span className="mr-2 hidden md:block">Welcome</span>
            <strong className="font-bold text-white hidden sm:block">{user.username}</strong>
          </li>
          {isAdmin && (
             <>
             <li className="flex justify-center items-center">
               <Link
                 to="/admin"
                 className="bg-green-500 px-4 py-1 rounded-sm text-white"
               >
                 Add Users
               </Link>
             </li>
             <li className="flex justify-center items-center">
               <Link
                 to="/users"
                 className="bg-sky-400 px-4 py-1 rounded-sm text-white"
               >
                 User List
               </Link>
             </li>
           </>
          )}
        
          <li className="flex justify-center items-center">
            <Link
              to="/add-task"
              className="bg-indigo-500 px-4 py-1 rounded-sm text-white"
            >
              Add Task
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <Link
              to="/tasks"
              className="bg-orange-500 px-4 py-1 rounded-sm text-white"
            >
              Show Tasks
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <Link
              className="bg-red-500 text-white px-2 py-1 rounded"
              to="/"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="flex justify-center items-center">
            <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm text-white">
              Login
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <Link
              to="/register"
              className="bg-orange-600 px-4 py-1 rounded-sm text-white"
            >
              Register
            </Link>
          </li>
        </>
    
      )}
    </ul>
  </nav>    
  );
}

export default Navbar;
