function HomePage() {
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md text-center mx-auto mt-10">
      <h1 className="text-3xl font-bold text-white mb-4">
        Welcome to Task Manager!
      </h1>
      <p className="text-slate-300 mb-4">
        Manage your tasks efficiently and effectively. Create your own tasks and
        keep them organized.
      </p>
      <p className="text-slate-300">
        Click on the "Tasks" page to view, create, edit, and delete your tasks.
      </p>
    </div>
  );
}

export default HomePage;
