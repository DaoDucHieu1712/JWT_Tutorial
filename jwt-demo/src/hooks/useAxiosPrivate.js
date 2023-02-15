import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { axiosClient } from "../api/axiosClient";
import jwt_decode from "jwt-decode";
import userApi from "../api/userApi";
import { authActions } from "../features/auth/authSlice";
export default function useAxiosPrivate() {
  const auth = useSelector((state) => state.auth.login?.userCurrent);
  const dispatch = useDispatch();
  useEffect(() => {
    const reqInterceptor = axiosClient.interceptors.request.use(
      async (config) => {
        let date = new Date();
        const decodedToken = jwt_decode(auth?.accessToken);
        if (decodedToken.exp < date.getTime() / 1000) {
          const data = await userApi.refreshToken();
          const refreshUser = {
            ...auth,
            accessToken: data.accessToken,
          };
          dispatch(authActions.loginSuccess(refreshUser));
          config.headers["token"] = `Bearer ${data.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosClient.interceptors.request.eject(reqInterceptor);
    };
  }, [auth, dispatch]);
}
