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
exports.getOne = exports.getAll = void 0;
const getTicketService_1 = require("../services/getTicketService");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, q } = req.query;
        const tickets = yield getTicketService_1.getTicketService.listAll(String(q), Number(page));
        if (!tickets) {
            return res.status(404).json({ error: 'Not found' });
        }
        let newArray = [];
        let returnedTickets = [];
        returnedTickets.push(tickets[0]);
        for (let i = 0; i < tickets[1].length; i++) {
            newArray.push({
                id: tickets[1][i].id,
                title: tickets[1][i].title,
                description: tickets[1][i].description,
                unity_id: tickets[1][i].unity_id,
                unity: tickets[1][i].unity.name,
                user_id: tickets[1][i].user_id,
                user: tickets[1][i].user.name,
                status: tickets[1][i].status === 0 ? 'Pendente' : tickets[1][i].status === 1 ? 'Em andamento' : 'Resolvido',
                created_at: tickets[1][i].created_at,
                updated_at: tickets[1][i].updated_at,
            });
        }
        returnedTickets.push(newArray);
        return res.status(200).json({ tickets: returnedTickets });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.getAll = getAll;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const ticket = yield getTicketService_1.getTicketService.findOne(id);
        if (!ticket) {
            return res.status(404).json({ error: 'Not found' });
        }
        return res.status(200).json({ ticket });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.getOne = getOne;
