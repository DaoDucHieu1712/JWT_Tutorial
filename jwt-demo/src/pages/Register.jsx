import React from "react";

const Register = () => {
  const handleSubmit = () => {};
  return (
    <form
      className="mx-auto my-10 w-[450px] min-h-[550px] p-10 border border-slate-300"
      onSubmit={handleSubmit}
    >
      <div>
        <h1 className="font-medium text-center text-3xl mb-10 text-green-400">
          Login
        </h1>
        <div className="mb-3">
          <label className="block mb-3 font-semibold">Username</label>
          <input
            type="text"
            className="p-2 w-full border border-slate-400 focus:border-blue-400"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-3 font-semibold">Password</label>
          <input
            type="password"
            className="p-2 w-full border border-slate-400 focus:border-blue-400"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-3 font-semibold">FullName</label>
          <input
            type="text"
            className="p-2 w-full border border-slate-400 focus:border-blue-400"
          />
        </div>
        <div className="mb-3">
          <button className="w-full border bg-blue-400 p-2 mt-5 font-semibold text-white hover:opacity-9">
            Signin
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
