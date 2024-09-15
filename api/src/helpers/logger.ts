// // import winston from "winston";

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
import winston from "winston";
import { join } from "path";

const { combine, timestamp, printf, json } = winston.format;
import DailyRotateFile from "winston-daily-rotate-file";

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), customFormat),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: join(__dirname, "logs", "application-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export default logger;
