import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user, isAdmin } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between items-center py-5 px-10 rounded-lg">
      <Link to="/tasks" className="hidden xl:block">
        <h1 className="text-2xl font-bold mx-2">Zoco Tasks Manager</h1>
      </Link>

      <ul className="flex flex-wrap w-full sm:w-auto gap-4 justify-center md:justify-center items-center">
        {isAuthenticated ? (
          <>
            <li className="flex items-center justify-center">
              <span className="mr-2 hidden md:block">Welcome</span>
              <strong className="font-bold text-white hidden sm:block">{user.username}</strong>
            </li>
            {isAdmin && (
              <>
                <li className="flex items-center justify-center">
                  <Link to="/admin" className="bg-green-500 px-4 py-1 rounded-sm text-white">
                    Add Users
                  </Link>
                </li>
                <li className="flex items-center justify-center">
                  <Link to="/users" className="bg-sky-400 px-4 py-1 rounded-sm text-white">
                    User List
                  </Link>
                </li>
              </>
            )}
            <li className="flex items-center justify-center">
              <Link to="/add-task" className="bg-indigo-500 px-4 py-1 rounded-sm text-white">
                Add Task
              </Link>
            </li>
            <li className="flex items-center justify-center">
              <Link to="/tasks" className="bg-orange-500 px-4 py-1 rounded-sm text-white hidden xl:block">
                Show Tasks
              </Link>
            </li>
            <li className="flex items-center justify-center">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="flex items-center justify-center">
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm text-white">
                Login
              </Link>
            </li>
            <li className="flex items-center justify-center">
              <Link to="/register" className="bg-orange-600 px-4 py-1 rounded-sm text-white">
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

