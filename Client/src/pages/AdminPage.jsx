import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminPage() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { singup, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  

  const onSubmit = handleSubmit(async (values) => {
    singup(values);
    navigate("/tasks");
  });
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 text-white my-2 text-center" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-3xl font-bold my-2">Add Users</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />
          {/* definimos los errores */}
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}

          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {/* definimos los errores */}
          {errors.email && <p className="text-red-500">Email is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {/* definimos los errores */}
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

<select className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
{...register("role")}>
  
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      {/* definimos los errores */}
      {errors.role && (
            <p className="text-red-500">Role is required</p>
          )}

          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-md my-2"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminPage