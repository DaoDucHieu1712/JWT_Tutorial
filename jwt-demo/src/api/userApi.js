import axiosClient from "../api/axiosClient";
import Cookies from "js-cookies";

const userApi = {
  getAllUser(accessToken, AxiosJWT) {
    const url = "/user";
    return AxiosJWT.get(url, {
      headers: { token: `Bearer ${accessToken}` },
    });
  },
  deleteUser(id, accessToken, AxiosJWT) {
    const url = `user/delete/${id}`;
    return AxiosJWT.delete(url, {
      headers: { token: `Bearer ${accessToken}` },
    });
  },
  signIn(data) {
    const url = "/auth/signin";
    return axiosClient.post(url, data, {
      withCredentials: true,
    });
  },
  refreshToken() {
    const url = "/auth/refresh";
    const refreshToken = Cookies.getItem("refreshToken");
    console.log(refreshToken);
    return axiosClient.post(url, {
      refreshToken,
      withCredentials: true,
    });
  },
  signOut(accessToken, AxiosJWT, id) {
    const url = "/auth/signout";
    return AxiosJWT.post(url, id, {
      headers: { token: `Bearer ${accessToken}` },
    });
  },
};
export default userApi;
