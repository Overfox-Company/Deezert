// pages/api/middlewares.js

// Create a JSON parser middleware with a limit of 100mb (ajusta el límite según tus necesidades)
/*export const jsonParser = (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    // Opciones del body parser
    const options = {
      limit: "100mb", // Establece el límite aquí
    };

    req.body = JSON.parse(req.body, options);
  }
  next();
};

// Create a URL-encoded parser middleware with a limit of 100mb and extended option set to true (ajusta el límite según tus necesidades)
export const urlEncodedParser = (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    const contentType = req.headers["content-type"];
    if (
      contentType &&
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      let data = "";
      req.setEncoding("utf8");
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        // Opciones del body parser
        const options = {
          limit: "100mb", // Establece el límite aquí
          extended: true,
        };

        req.body = new URLSearchParams(data, options);
        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
*/