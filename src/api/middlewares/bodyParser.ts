import * as bodyParser from "body-parser";

// Create a JSON parser middleware with a limit of 50mb
export const jsonParser = bodyParser.json({ limit: "50mb" });

// Create a URL-encoded parser middleware with a limit of 50mb and extended option set to true
export const urlEncodedParser = bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
});
