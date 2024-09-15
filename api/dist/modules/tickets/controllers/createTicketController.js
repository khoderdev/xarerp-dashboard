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
exports.create = void 0;
const getStoreService_1 = require("../../stores/services/getStoreService");
const getUserService_1 = require("../../users/services/getUserService");
const createTicketService_1 = require("../services/createTicketService");
const uuid_1 = require("uuid");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, unity } = req.body;
        const user = req.userId;
        if (!title || !description || !unity) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const hasStore = yield getStoreService_1.getStoreService.findOne(unity);
        if (!hasStore) {
            return res.status(404).json({ error: 'Store not found' });
        }
        const hasUser = yield getUserService_1.getUserService.findOne(user);
        if (!hasUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        const ticket = yield createTicketService_1.createTicketService.create({
            id: (0, uuid_1.v4)(),
            title,
            description,
            unity,
            user,
            status: 0
        });
        if (!ticket) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(201).json({ ticket });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.create = create;
