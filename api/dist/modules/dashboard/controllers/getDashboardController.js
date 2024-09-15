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
exports.getData = void 0;
const getUserService_1 = require("../../users/services/getUserService");
const createDashboard_1 = require("../../../helpers/createDashboard");
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.userId;
        const { days } = req.params;
        const user = yield getUserService_1.getUserService.findOne(id);
        if (!user) {
            return res.status(404).json({ error: 'Not found' });
        }
        let targetDate = new Date();
        targetDate.setDate(targetDate.getDate() - (Number(days) - 1));
        const formattedDate = `${targetDate.getFullYear()}-${(targetDate.getMonth() + 1).toString().padStart(2, '0')}-${targetDate.getDate().toString().padStart(2, '0')}`;
        const result = yield (0, createDashboard_1.createDashboard)(user.position, formattedDate, Number(days));
        return res.status(200).json({ result });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.getData = getData;
