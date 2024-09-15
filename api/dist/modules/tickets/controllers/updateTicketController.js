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
const getTicketService_1 = require("../services/getTicketService");
const getStoreService_1 = require("../../stores/services/getStoreService");
const updateTicketService_1 = require("../services/updateTicketService");
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, unity, status } = req.body;
        if (!title && !description && !unity && !status) {
            return res.status(400).json({ error: 'Incomplete data' });
        }
        const ticket = yield getTicketService_1.getTicketService.findOne(id);
        if (!ticket) {
            return res.status(404).json({ error: 'Not found' });
        }
        if (unity) {
            const hasStore = yield getStoreService_1.getStoreService.findOne(unity);
            if (!hasStore) {
                return res.status(404).json({ error: 'Store not found' });
            }
        }
        const time = new Date().toISOString();
        const ticketUpdated = yield updateTicketService_1.updateTicketService.update({
            id,
            data: {
                title,
                description,
                unity_id: unity,
                status
            },
            time
        });
        if (!ticketUpdated) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ ticket: ticketUpdated });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.updateOne = updateOne;
