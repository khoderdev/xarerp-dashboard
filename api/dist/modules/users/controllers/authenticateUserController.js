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
exports.authenticate = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const getUserService_1 = require("../services/getUserService");
const auth_1 = __importDefault(require("../../../config/auth"));
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const hasUser = yield getUserService_1.getUserService.findByEmailLogin(email);
        if (!hasUser) {
            return res.status(400).json({ error: 'E-mail or password incorrect!' });
        }
        const passwordMatch = yield (0, bcrypt_1.compare)(password, hasUser.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'E-mail or password incorrect!' });
        }
        const { secret_token, expires_in_token } = auth_1.default;
        const token = (0, jsonwebtoken_1.sign)({}, secret_token, {
            subject: hasUser.id,
            expiresIn: expires_in_token
        });
        const user = {
            name: hasUser.name,
            position: hasUser.position,
            active: hasUser.active,
            permissions: hasUser.permissions,
            unity: hasUser.unity.name
        };
        return res.status(200).json({ token, user });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.authenticate = authenticate;
