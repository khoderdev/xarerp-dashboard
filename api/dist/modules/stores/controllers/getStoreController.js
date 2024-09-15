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
exports.getOne = exports.getRegisters = exports.getAll = void 0;
const getStoreService_1 = require("../services/getStoreService");
const logger_1 = __importDefault(require("../../../helpers/logger"));
// Type guard to check if `err` is an instance of Error
function isError(err) {
    return err instanceof Error;
}
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, q } = req.query;
        const stores = yield getStoreService_1.getStoreService.listAll(String(q), Number(page));
        if (!stores) {
            return res.status(404).json({ error: "Not found" });
        }
        return res.status(200).json({ stores });
    }
    catch (err) {
        if (isError(err)) {
            logger_1.default.error(`Error in getAll: ${err.message}, Stack: ${err.stack}`);
        }
        else {
            logger_1.default.error(`Unknown error occurred: ${String(err)}`);
        }
        return res.status(500).json({ error: "InternalServerError" });
    }
});
exports.getAll = getAll;
const getRegisters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, q } = req.query;
        const stores = yield getStoreService_1.getStoreService.listAll(String(q), Number(page));
        if (!stores) {
            return res.status(404).json({ error: "Not found" });
        }
        return res.status(200).json({ stores });
    }
    catch (err) {
        if (isError(err)) {
            console.log(`Error in getRegisters: ${err.message}, Stack: ${err.stack}`);
        }
        else {
            console.log(`Unknown error occurred: ${String(err)}`);
        }
        return res.status(500).json({ error: "InternalServerError" });
    }
});
exports.getRegisters = getRegisters;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const store = yield getStoreService_1.getStoreService.findOne(id);
        if (!store) {
            return res.status(404).json({ error: "Not found" });
        }
        return res.status(200).json({ store });
    }
    catch (err) {
        if (isError(err)) {
            console.log(`Error in getOne: ${err.message}, Stack: ${err.stack}`);
        }
        else {
            console.log(`Unknown error occurred: ${String(err)}`);
        }
        return res.status(500).json({ error: "InternalServerError" });
    }
});
exports.getOne = getOne;
