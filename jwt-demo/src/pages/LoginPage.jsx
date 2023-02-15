import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginHandler } from "../features/auth/authApiRequest";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../features/auth/authSlice";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authSe = useSelector(authSelector);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    await loginHandler(data, dispatch, navigate);
  };
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
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 w-full border border-slate-400 focus:border-blue-400"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-3 font-semibold">Password</label>
          <input
            type="password"
            className="p-2 w-full border border-slate-400 focus:border-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="w-full min-h-[50px] text-center border bg-blue-400 p-2 mt-5 font-semibold text-white hover:opacity-9"
          >
            {authSe.login.isFetching ? (
              <div className="border-white border-b-transparent spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full"></div>
            ) : (
              "Signin"
            )}
          </button>
          {authSe.login.error ? (
            <p className="text-red-500">{authSe.login.error}</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
