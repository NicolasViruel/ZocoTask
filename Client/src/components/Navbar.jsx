import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <h1 className="text-2xl font-bold mx-2 hidden sm:block">
          Zoco Tasks Manager
        </h1>
      </Link>
      <ul className="flex gap-x-2 mx-4">
        {isAuthenticated ? (
          <>
            <li className="flex items-center">
              <span className="mr-2">Welcome</span>
              <strong className="font-bold text-white">{user.username}</strong>
            </li>
            <li className="flex justify-center items-center">
              <Link
                to="/add-task"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Add Task
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
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-orange-600 px-4 py-1 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
    // <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
    //   <Link to={isAuthenticated ? "/tasks" : "/"}>
    //     <h1 className="text-2xl font-bold mx-2">Zoco Tasks Manager</h1>
    //   </Link>
    //   <div className="flex items-center">
    //     <button
    //       onClick={() => setIsOpen(!isOpen)}
    //       className="md:hidden text-white focus:outline-none"
    //     >
    //       <svg
    //         className="w-6 h-6"
    //         fill="none"
    //         stroke="currentColor"
    //         viewBox="0 0 24 24"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth="2"
    //           d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
    //         ></path>
    //       </svg>
    //     </button>
    //     <ul
    //       className={`${
    //         isOpen ? "block" : "hidden"
    //       } md:flex md:gap-x-2 md:mx-4`}
    //     >
    //       {isAuthenticated ? (
    //         <>
    //           <li className="flex justify-center items-center">
    //             Welcome{" "}
    //             <strong>
    //               <b>{user.username}</b>
    //             </strong>
    //           </li>
    //           <li className="flex justify-center items-center">
    //             <Link
    //               to="/add-task"
    //               className="bg-indigo-500 px-4 py-1 rounded-sm"
    //             >
    //               Add Task
    //             </Link>
    //           </li>
    //           <li className="flex justify-center items-center">
    //             <Link
    //               className="bg-red-500 text-white px-2 py-1 rounded"
    //               to="/"
    //               onClick={() => {
    //                 logout();
    //               }}
    //             >
    //               Logout
    //             </Link>
    //           </li>
    //         </>
    //       ) : (
    //         <>
    //           <li>
    //             <Link
    //               to="/login"
    //               className="bg-indigo-500 px-4 py-1 rounded-sm"
    //             >
    //               Login
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/register"
    //               className="bg-orange-600 px-4 py-1 rounded-sm"
    //             >
    //               Register
    //             </Link>
    //           </li>
    //         </>
    //       )}
    //     </ul>
    //   </div>
    // </nav>
  );
}

export default Navbar;
