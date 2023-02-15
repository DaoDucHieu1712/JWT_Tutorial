import userApi from "../api/userApi";
import { authActions } from "../features/auth/authSlice";

export default function useRefreshToken() {
  const refresh = async () => {
    try {
      const res = await userApi.refreshToken();
      authActions.updateUserCurrent(res?.data?.accessToken);
      return res?.data?.accessToken || "";
    } catch (error) {
      console.log(error);
    }
  };
  return refresh;
}
