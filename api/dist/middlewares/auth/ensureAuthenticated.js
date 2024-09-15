"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const getUserService_1 = require("../../modules/users/services/getUserService");
const logger_1 = __importDefault(require("../../helpers/logger"));
const ensureAuthenticated = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeaders = req.headers.authorization;
        if (!authHeaders) {
            return res.status(401).json({ error: "Token is missing" });
        }
        const [, token] = authHeaders.split(" ");
        try {
            (0, jsonwebtoken_1.verify)(token, process.env.SECRET_JWT);
            const { sub } = (0, jsonwebtoken_1.decode)(token);
            req.userId = sub.toString();
            return next();
        }
        catch (err) {
            if (err instanceof Error) {
                logger_1.default.error(`Authentication failed: ${err.message}, Stack: ${err.stack}`);
            }
            else {
                logger_1.default.error(`Authentication failed: ${String(err)}`);
            }
            return res.status(401).json({ error: "Unauthorized" });
        }
    });
};
exports.ensureAuthenticated = ensureAuthenticated;
const validateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
        return res.status(401).json({ error: "Token is missing" });
    }
    const [, token] = authHeaders.split(" ");
    try {
        (0, jsonwebtoken_1.verify)(token, process.env.SECRET_JWT);
        const { sub } = (0, jsonwebtoken_1.decode)(token);
        const user = yield getUserService_1.getUserService.findOne(sub);
        if (!user) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json({ user }).end();
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`Validation failed: ${err.message}, Stack: ${err.stack}`);
        }
        else {
            logger_1.default.error(`Validation failed: ${String(err)}`);
        }
        return res.status(401).json({ isValid: false }).end();
    }
});
exports.validateToken = validateToken;
