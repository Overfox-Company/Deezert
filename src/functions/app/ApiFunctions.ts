import ApiController from "../../connection/ApiController";
import { type userType } from "../../types/global";
// Define the ConnectServer function
export const ConnectServer = async (
  logout: () => void,
  login: () => void,
  setUser: any
) => {
  // Use the ApiController to get the server
  ApiController.getServer()
    // If the server is successfully obtained, log the data
    .then((e) => {
      console.log(e);
      setUser(e.data);
      localStorage.setItem("id", e.data.id);
      login();
    })
    // If an error occurs, log the error
    .catch((err) => {
      console.log(err?.response?.data);
      if (err?.response?.data === "unauthorized") {
        logout();
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        console.log(localStorage.getItem("token"));
      }
    });
};
export const SignIn = (
  user: userType,
  UpdateContext: (_data: any, setLoader: boolean) => void
) => {
  ApiController.signIn(user)
    .then((e) => {
      if (e.status === 200) {
        UpdateContext(e.data, false);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
