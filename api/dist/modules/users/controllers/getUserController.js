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
const getUserService_1 = require("../services/getUserService");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, q } = req.query;
        const users = yield getUserService_1.getUserService.listAll(String(q), Number(page));
        if (!users) {
            return res.status(404).json({ error: 'Not found' });
        }
        let newArray = [];
        let returnedUsers = [];
        returnedUsers.push(users[0]);
        for (let i = 0; i < users[1].length; i++) {
            newArray.push({
                id: users[1][i].id,
                name: users[1][i].name,
                email: users[1][i].email,
                unity_id: users[1][i].unity_id,
                unity: users[1][i].unity.name,
                position: users[1][i].position,
                permissions: users[1][i].permissions,
                active: users[1][i].active,
                created_at: users[1][i].created_at,
                updated_at: users[1][i].updated_at,
            });
        }
        returnedUsers.push(newArray);
        return res.status(200).json({ users: returnedUsers });
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
        const users = yield getUserService_1.getUserService.listAll(String(q), Number(page));
        if (!users) {
            return res.status(404).json({ error: 'Not found' });
        }
        let newArray = [];
        let returnedUsers = [];
        returnedUsers.push(users[0]);
        for (let i = 0; i < users[1].length; i++) {
            newArray.push({
                id: users[1][i].id,
                name: users[1][i].name,
                email: users[1][i].email,
                unity_id: users[1][i].unity_id,
                unity: users[1][i].unity.name,
                position: users[1][i].position,
                permissions: users[1][i].permissions,
                active: users[1][i].active,
                created_at: users[1][i].created_at,
                updated_at: users[1][i].updated_at,
            });
        }
        returnedUsers.push(newArray);
        return res.status(200).json({ users: returnedUsers });
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
        const user = yield getUserService_1.getUserService.findOne(id);
        if (!user) {
            return res.status(404).json({ error: 'Not found' });
        }
        return res.status(200).json({ user });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.getOne = getOne;
