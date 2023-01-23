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
      login();
    })
    // If an error occurs, log the error
    .catch((err) => {
      console.log(err?.response?.data);
      if (err?.response?.data === "Unauthorized") {
        logout();
        localStorage.removeItem("token");
      }
    });
};
export const SignIn = (user: userType, UpdateContext: (_data: any) => void) => {
  ApiController.signIn(user)
    .then((e) => {
      if (e.status === 200) {
        UpdateContext(e.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
