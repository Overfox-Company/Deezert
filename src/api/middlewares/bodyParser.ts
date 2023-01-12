import * as bodyParser from "body-parser";

export const jsonParser = bodyParser.json({ limit: "50mb" });
export const urlEncodedParser = bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
});
