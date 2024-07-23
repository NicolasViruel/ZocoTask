import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Navbar() {
  const { isAuthenticated, logout, user, isAdmin } = useAuth();
  
  return (
    // <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
    //   <Link to={isAuthenticated ? "/tasks" : "/"}>
    //     <h1 className="text-2xl font-bold mx-2 hidden sm:block">
    //       Zoco Tasks Manager
    //     </h1>
    //   </Link>
    //   <ul className="flex gap-x-2 mx-4">
    //     {isAuthenticated ? (
    //       <>
    //         <li className="flex items-center">
    //           <span className="mr-2">Welcome</span>
    //           <strong className="font-bold text-white">{user.username}</strong>
    //         </li>
    //         <li className="flex justify-center items-center">
    //           <Link
    //             to="/add-task"
    //             className="bg-indigo-500 px-4 py-1 rounded-sm"
    //           >
    //             Add Task
    //           </Link>
    //         </li>
    //         <li className="flex justify-center items-center">
    //           <Link
    //             className="bg-red-500 text-white px-2 py-1 rounded"
    //             to="/"
    //             onClick={() => {
    //               logout();
    //             }}
    //           >
    //             Logout
    //           </Link>
    //         </li>
    //       </>
    //     ) : (
    //       <>
    //         <li>
    //           <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">
    //             Login
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             to="/register"
    //             className="bg-orange-600 px-4 py-1 rounded-sm"
    //           >
    //             Register
    //           </Link>
    //         </li>
    //       </>
    //     )}
    //   </ul>
    // </nav>

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

  // <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
  //     {isAuthenticated ? (
  //       <Link to="/tasks" className="hidden sm:block">
  //         <h1 className="text-2xl font-bold mx-2">Zoco Tasks Manager</h1>
  //       </Link>
  //     ) : null}
  //     <ul className="flex items-center w-full sm:justify-center justify-end gap-4">
  //       {isAuthenticated ? (
  //         <>
  //           <li className="items-center hidden sm:block">
  //             <span className="mr-2">Welcome</span>
  //             <strong className="font-bold text-white">{user.username}</strong>
  //           </li>
  //           {user.role === 'admin' && (
  //             <li className="flex justify-center items-center">
  //               <Link
  //                 to="/admin"
  //                 className="bg-green-500 px-4 py-1 rounded-sm text-white"
  //               >
  //                 Admin Panel
  //               </Link>
  //             </li>
  //           )}
  //           <li className="flex justify-center items-center">
  //             <Link
  //               to="/add-task"
  //               className="bg-indigo-500 px-4 py-1 rounded-sm text-white"
  //             >
  //               Add Task
  //             </Link>
  //           </li>
  //           <li>
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
  //           <li className="flex justify-center items-center sm:justify-end w-full sm:w-auto">
  //             <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm text-white">
  //               Login
  //             </Link>
  //           </li>
  //           <li className="flex justify-center items-center sm:justify-end w-full sm:w-auto">
  //             <Link
  //               to="/register"
  //               className="bg-orange-600 px-4 py-1 rounded-sm text-white"
  //             >
  //               Register
  //             </Link>
  //           </li>
  //         </>
  //       )}
  //     </ul>
  // </nav>

  
    
  );
}

export default Navbar;
