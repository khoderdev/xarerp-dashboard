"use strict";
// import { Request, Response } from "express";
// import { getFinancialService } from "../services/getFinancialService";
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
const getFinancialService_1 = require("../services/getFinancialService");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, q } = req.query;
        const financial = yield getFinancialService_1.getFinancialService.listAll(String(q), Number(page));
        if (!financial) {
            return res.status(404).json({ error: "Not found" });
        }
        let newArray = [];
        let returnedFinancial = [];
        returnedFinancial.push(financial[0]);
        for (let i = 0; i < financial[1].length; i++) {
            newArray.push({
                id: financial[1][i].id,
                type: financial[1][i].type === 1 ? "Entry" : "Exit",
                unity_id: financial[1][i].unity_id,
                unity: financial[1][i].unity.name,
                user_id: financial[1][i].user_id,
                user: financial[1][i].user.name,
                value: financial[1][i].value,
                value_formatted: `${financial[1][i].value.toLocaleString("en-LB", {
                    // Changed locale to "en-US"
                    style: "currency",
                    currency: "USD",
                })}`,
                created_at: financial[1][i].created_at,
                updated_at: financial[1][i].updated_at,
            });
        }
        returnedFinancial.push(newArray);
        return res.status(200).json({ financial: returnedFinancial });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "InternalServerError" });
    }
});
exports.getAll = getAll;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const financial = yield getFinancialService_1.getFinancialService.findOne(id);
        if (!financial) {
            return res.status(404).json({ error: "Not found" });
        }
        return res.status(200).json({ financial });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "InternalServerError" });
    }
});
exports.getOne = getOne;
