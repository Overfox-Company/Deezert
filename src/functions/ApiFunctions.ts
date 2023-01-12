import ApiController from "../connection/ApiController";

// Define the ConnectServer function
export const ConnectServer = () => {
  // Use the ApiController to get the server
  ApiController.getServer()
    // If the server is successfully obtained, log the data
    .then((e) => console.log(e.data))
    // If an error occurs, log the error
    .catch((err) => {
      console.log(err);
    });
};
