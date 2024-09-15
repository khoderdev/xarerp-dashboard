import express, { Request, Response, ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import cors from "cors";

import {
  ensureAuthenticated,
  validateToken,
} from "./middlewares/auth/ensureAuthenticated";
import * as authenticateUserController from "./modules/users/controllers/authenticateUserController";
import apiRoutes from "./routes";
import logger from "./helpers/logger";

dotenv.config();

const server = express();
const morganFormat =
  ":method :url :status :res[content-length] - :response-time ms";

// Middleware to log request details
server.use((req: Request, res: Response, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
    );
  });
  next();
});

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/ping", (req: Request, res: Response) => res.json({ pong: true }));
server.post("/login", authenticateUserController.authenticate);
server.post("/validate", validateToken);

server.use(ensureAuthenticated());
server.use(apiRoutes);

server.use((req: Request, res: Response) => {
  logger.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Not found" });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}, Stack: ${err.stack}`);
  res.status(500).json({ error: "Internal server error" });
};

server.use(errorHandler);

server.listen(process.env.PORT, () =>
  logger.info(`Server is running on port ${process.env.PORT}`)
);

// import express, { Request, Response, ErrorRequestHandler } from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import {
//   ensureAuthenticated,
//   validateToken,
// } from "./middlewares/auth/ensureAuthenticated";
// import * as authenticateUserController from "./modules/users/controllers/authenticateUserController";
// import apiRoutes from "./routes";
// import logger from "./helpers/logger";
// import { v4 as uuidv4 } from "uuid";

// dotenv.config();

// const server = express();
// const morganFormat =
//   ":method :url :status :res[content-length] - :response-time ms";

// // Custom logging middleware for detailed request and response logging
// server.use((req: Request, res: Response, next) => {
//   req.requestId = uuidv4(); // Attach a unique ID to each request
//   const start = Date.now();
//   const { method, originalUrl, query, body } = req;

//   res.on("finish", () => {
//     const duration = Date.now() - start;
//     const logDetails = {
//       requestId: req.requestId,
//       method,
//       url: originalUrl,
//       status: res.statusCode,
//       duration: `${duration}ms`,
//       query,
//       body: method === "POST" || method === "PUT" ? body : null,
//     };
//     logger.info(`Request: ${JSON.stringify(logDetails, null, 2)}`);
//   });

//   next();
// });

// server.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );

// server.use(express.json());
// server.use(express.urlencoded({ extended: true }));

// server.get("/ping", (req: Request, res: Response) => res.json({ pong: true }));
// server.post("/login", authenticateUserController.authenticate);
// server.post("/validate", validateToken);

// server.use(ensureAuthenticated());
// server.use(apiRoutes);

// server.use((req: Request, res: Response) => {
//   logger.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
//   res.status(404).json({ error: "Not found" });
// });

// const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
//   logger.error(
//     `Error: ${err.message}, Stack: ${
//       err.stack
//     }, Request Details: ${JSON.stringify(
//       {
//         requestId: req.requestId,
//         method: req.method,
//         url: req.originalUrl,
//         headers: req.headers,
//         query: req.query,
//         body: req.body,
//       },
//       null,
//       2
//     )}`
//   );
//   res.status(500).json({ error: "Internal server error" });
// };

// server.use(errorHandler);

// server.listen(process.env.PORT, () =>
//   logger.info(`Server is running on port ${process.env.PORT}`)
// );
