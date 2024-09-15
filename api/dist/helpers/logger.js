"use strict";
// // import winston from "winston";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // const { combine, timestamp, printf } = winston.format;
// // const customFormat = printf(({ level, message, timestamp }) => {
// //   return `${timestamp} [${level}]: ${message}`;
// // });
// // const logger = winston.createLogger({
// //   level: "info",
// //   format: combine(timestamp(), customFormat),
// //   transports: [
// //     new winston.transports.Console(),
// //     new winston.transports.File({ filename: "combined.log" }),
// //   ],
// // });
// // export default logger;
// import winston from "winston";
// const { combine, timestamp, printf, json } = winston.format;
// const customFormat = printf(({ level, message, timestamp }) => {
//   return `${timestamp} [${level}]: ${message}`;
// });
// const logger = winston.createLogger({
//   level: "info",
//   format: combine(timestamp(), customFormat),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: "combined.log", format: json() }),
//   ],
// });
// export default logger;
const winston_1 = __importDefault(require("winston"));
const path_1 = require("path");
const { combine, timestamp, printf, json } = winston_1.default.format;
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});
const logger = winston_1.default.createLogger({
    level: "info",
    format: combine(timestamp(), customFormat),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: (0, path_1.join)(__dirname, "logs", "application-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});
exports.default = logger;
