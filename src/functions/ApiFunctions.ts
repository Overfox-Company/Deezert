import ApiController from "../connection/ApiController";

export const ConnectServer = () => {
  ApiController.getServer()
    .then((e) => console.log(e.data))
    .catch((err) => {
      console.log(err);
    });
};
