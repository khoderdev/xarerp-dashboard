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

// dotenv.config();

// const server = express();
// const morganFormat =
//   ":method :url :status :res[content-length] - :response-time ms";

// server.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://inventory-manager-8oa2pca3r-khoderdevs-projects.vercel.app"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Private-Network", true);
//   res.setHeader("Access-Control-Max-Age", 7200);

//   next();
// });

// // Middleware to log request details
// server.use((req: Request, res: Response, next) => {
//   const start = Date.now();
//   res.on("finish", () => {
//     const duration = Date.now() - start;
//     logger.info(
//       `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
//     );
//   });
//   next();
// });

// server.use(cors());
// server.use(express.json());
// server.use(express.urlencoded({ extended: true }));

// server.get("/ping", (req: Request, res: Response) => res.json({ pong: true }));
// server.post("/login", authenticateUserController.authenticate);
// server.post("/validate", validateToken);
// server.get("/api", (req: Request, res: Response) => {
//   res.json({ message: "This is a public route, no authentication required!" });
// });
// server.use(ensureAuthenticated());
// server.use(apiRoutes);

// server.use((req: Request, res: Response) => {
//   logger.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
//   res.status(404).json({ error: "Not found" });
// });

// const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
//   logger.error(`Error: ${err.message}, Stack: ${err.stack}`);
//   res.status(500).json({ error: "Internal server error" });
// };

// server.use(errorHandler);

// server.listen(process.env.PORT || 3333, () =>
//   logger.info(`Server is running on port ${process.env.PORT}`)
// );
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

// server.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://inventory-manager-8oa2pca3r-khoderdevs-projects.vercel.app"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Private-Network", "true");
//   res.setHeader("Access-Control-Max-Age", 7200);

//   next();
// });

const allowedOrigins = [
  "https://dev-11-8sqbalr32-khoderdevs-projects.vercel.app/",
  "https://khoderdev.github.io/xarerp-dashboard",
  "https://khoderdev.github.io",
  "https://test.staysafeaa.org",
  "http://localhost:3000",
];

server.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

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

server.get("/ping", (req: Request, res: Response) =>
  res.json({ pong: "true" })
); // Converted boolean to string
server.post("/login", authenticateUserController.authenticate);
server.post("/validate", validateToken);
server.get("/api", (req: Request, res: Response) => {
  res.json({ message: "This is a public route, no authentication required!" });
});
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

server.listen(process.env.PORT || 3333, () =>
  logger.info(`Server is running on port ${process.env.PORT || 3333}`)
);
