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
exports.getOne = exports.getRegisters = exports.getAll = void 0;
const getClientService_1 = require("../services/getClientService");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, q } = req.query;
        const clients = yield getClientService_1.getClientService.listAll(String(q), Number(page));
        if (!clients) {
            return res.status(404).json({ error: 'Not found' });
        }
        let newArray = [];
        let returnedClients = [];
        returnedClients.push(clients[0]);
        for (let i = 0; i < clients[1].length; i++) {
            newArray.push({
                id: clients[1][i].id,
                name: clients[1][i].name,
                email: clients[1][i].email,
                tel: clients[1][i].tel,
                cep: clients[1][i].cep,
                city: clients[1][i].city,
                state: clients[1][i].state,
                user_id: clients[1][i].user_id,
                user: clients[1][i].user.name,
                unity_id: clients[1][i].unity_id,
                unity: clients[1][i].unity.name,
                created_at: clients[1][i].created_at,
                updated_at: clients[1][i].updated_at,
            });
        }
        returnedClients.push(newArray);
        return res.status(200).json({ clients: returnedClients });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.getAll = getAll;
const getRegisters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, q } = req.query;
        const clients = yield getClientService_1.getClientService.listAll(String(q), Number(page));
        if (!clients) {
            return res.status(404).json({ error: 'Not found' });
        }
        let newArray = [];
        let returnedClients = [];
        returnedClients.push(clients[0]);
        for (let i = 0; i < clients[1].length; i++) {
            newArray.push({
                id: clients[1][i].id,
                name: clients[1][i].name,
                email: clients[1][i].email,
                tel: clients[1][i].tel,
                cep: clients[1][i].cep,
                city: clients[1][i].city,
                state: clients[1][i].state,
                user_id: clients[1][i].user_id,
                user: clients[1][i].user.name,
                unity_id: clients[1][i].unity_id,
                unity: clients[1][i].unity.name,
                created_at: clients[1][i].created_at,
                updated_at: clients[1][i].updated_at,
            });
        }
        returnedClients.push(newArray);
        return res.status(200).json({ clients: returnedClients });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.getRegisters = getRegisters;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const client = yield getClientService_1.getClientService.findOne(id);
        if (!client) {
            return res.status(404).json({ error: 'Not found' });
        }
        return res.status(200).json({ client });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.getOne = getOne;
