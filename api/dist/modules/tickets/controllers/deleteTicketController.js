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
exports.deleteOne = void 0;
const getTicketService_1 = require("../services/getTicketService");
const deleteTicketService_1 = require("../services/deleteTicketService");
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const ticket = yield getTicketService_1.getTicketService.findOne(id);
        if (!ticket) {
            return res.status(404).json({ error: 'Not found' });
        }
        yield deleteTicketService_1.deleteTicketService.delete(id);
        return res.status(200).json({ status: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.deleteOne = deleteOne;
