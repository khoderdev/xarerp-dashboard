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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOne = void 0;
const updateUserService_1 = require("../services/updateUserService");
const getUserService_1 = require("../services/getUserService");
const getStoreService_1 = require("../../stores/services/getStoreService");
const bcrypt_1 = require("bcrypt");
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, password, position, permissions, active, unity } = req.body;
        if (!name && !email && !password && !position && !permissions && (active !== false && active !== true) && !unity) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const user = yield getUserService_1.getUserService.findOne(id);
        if (!user) {
            return res.status(404).json({ error: 'Not found' });
        }
        if (unity) {
            const hasStore = yield getStoreService_1.getStoreService.findOne(unity);
            if (!hasStore) {
                return res.status(404).json({ error: 'Store not found' });
            }
        }
        if (email && (email !== user.email)) {
            const hasUserByEmail = yield getUserService_1.getUserService.findByEmail(email);
            if (hasUserByEmail.length > 0) {
                return res.status(400).json({ error: 'E-mail already exists' });
            }
        }
        const time = new Date().toISOString();
        let hashPassword = undefined;
        if (password) {
            hashPassword = yield (0, bcrypt_1.hash)(password, 10);
        }
        const userUpdated = yield updateUserService_1.updateUserService.update({
            id,
            data: {
                name,
                email,
                password: hashPassword,
                unity_id: unity,
                position,
                permissions,
                active
            },
            time
        });
        if (!userUpdated) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ user: userUpdated });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.updateOne = updateOne;
