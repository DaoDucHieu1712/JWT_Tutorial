import { authActions } from "./authSlice";
import userApi from "../../api/userApi";

export const loginHandler = async (data, dispatch, navigate) => {
  dispatch(authActions.loginStart());
  try {
    const res = await userApi.signIn(data);
    console.log(res);
    dispatch(authActions.loginSuccess(res));
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch(authActions.loginFailed(`${error}`));
  }
};

export const logoutHandler = async (
  id,
  dispatch,
  navigate,
  accessToken,
  AxiosJWT
) => {
  console.log("Logout :))");
  dispatch(authActions.logoutStart());
  try {
    await userApi.signOut(accessToken, AxiosJWT, id);
    dispatch(authActions.logoutSuccess());
    navigate("/signin");
  } catch (error) {
    dispatch(authActions.logoutFailed(`${error}`));
  }
};
