import express from "express";
import next from "next";
import router from "./src/api/routes/Api.routes";
import { type ServerType } from "./src/types/server";
import { jsonParser, urlEncodedParser } from "./src/api/middlewares/bodyParser";

// Define the port to run the server on
const port = parseInt(process.env.PORT || "3000", 10);

// Check if the environment is production or development
const dev = process.env.NODE_ENV !== "production";

// Create an instance of the next.js app
const app = next({ dev });

// Get the request handler for next.js
const handle = app.getRequestHandler();

// Prepare the next.js app and start the server
app.prepare().then(() => {
  const server = express();

  // Use the json and url encoded parser middlewares
  server.use(jsonParser);
  server.use(urlEncodedParser);

  // Use the router for the '/api' endpoint
  server.use("/api", router);

  // Additional express middleware or routes can be added here

  // Create a server type for the request handler
  const handleServer: ServerType = (req, res) => {
    return handle(req, res);
  };

  // Use the request handler for all routes
  server.get("*", handleServer);

  // Start the server
  server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
  });
});
