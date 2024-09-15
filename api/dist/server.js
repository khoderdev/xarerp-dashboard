"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const ensureAuthenticated_1 = require("./middlewares/auth/ensureAuthenticated");
const authenticateUserController = __importStar(require("./modules/users/controllers/authenticateUserController"));
const routes_1 = __importDefault(require("./routes"));
const logger_1 = __importDefault(require("./helpers/logger"));
dotenv_1.default.config();
const server = (0, express_1.default)();
const morganFormat = ":method :url :status :res[content-length] - :response-time ms";
// Middleware to log request details
server.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        logger_1.default.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
    });
    next();
});
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.get("/ping", (req, res) => res.json({ pong: true }));
server.post("/login", authenticateUserController.authenticate);
server.post("/validate", ensureAuthenticated_1.validateToken);
server.use((0, ensureAuthenticated_1.ensureAuthenticated)());
server.use(routes_1.default);
server.use((req, res) => {
    logger_1.default.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: "Not found" });
});
const errorHandler = (err, req, res, next) => {
    logger_1.default.error(`Error: ${err.message}, Stack: ${err.stack}`);
    res.status(500).json({ error: "Internal server error" });
};
server.use(errorHandler);
server.listen(process.env.PORT, () => logger_1.default.info(`Server is running on port ${process.env.PORT}`));
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
