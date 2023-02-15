import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../api/createInstance";
import userApi from "../api/userApi";
import { logoutHandler } from "../features/auth/authApiRequest";
import { authActions } from "../features/auth/authSlice";

const HomePage = () => {
  console.log("Home page");
  const [list, setList] = useState([]);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, authActions.logoutSuccess);
  let axiosJWTS = createAxios(user, dispatch, authActions.loginSuccess);

  const fetchAllUser = async () => {
    const users = await userApi.getAllUser(accessToken, axiosJWTS);
    setList(users.data);
  };
  useEffect(() => {
    fetchAllUser();
  }, []);

  console.log(list);

  const handleLogout = async () => {
    await logoutHandler(id, dispatch, navigate, accessToken, axiosJWT);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <h1 className="text-center">{user?.fullName}</h1>
      <div>
        {list.map((item) => (
          <p key={item._id}>{item.username}</p>
        ))}
      </div>
      <button className="w-[100px] h-auto bg-blue-400" onClick={handleLogout}>
        Logout{" "}
      </button>
    </div>
  );
};

export default HomePage;
