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
const getStoreService_1 = require("../services/getStoreService");
const deleteStoreService_1 = require("../services/deleteStoreService");
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if the store exists
        const store = yield getStoreService_1.getStoreService.findOne(id);
        if (!store) {
            return res.status(404).json({ error: "Store not found" });
        }
        // Check if the store has associated administrators
        const hasAdmins = yield getStoreService_1.getStoreService.hasAssociatedAdministrators(id);
        if (hasAdmins) {
            return res
                .status(400)
                .json({ error: "Cannot delete store with associated administrators" });
        }
        // Proceed with deletion
        yield deleteStoreService_1.deleteStoreService.delete(id);
        return res.status(200).json({ status: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "InternalServerError" });
    }
});
exports.deleteOne = deleteOne;
