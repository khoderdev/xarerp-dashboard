"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ensurePermission_1 = require("../middlewares/permissions/ensurePermission");
const createFinancialController = __importStar(require("../modules/financial/controllers/createFinancialController"));
const getFinancialController = __importStar(require("../modules/financial/controllers/getFinancialController"));
const updateFinancialController = __importStar(require("../modules/financial/controllers/updateFinancialController"));
const deleteFinancialController = __importStar(require("../modules/financial/controllers/deleteFinancialController"));
const financialRouter = (0, express_1.Router)();
financialRouter.post('/registers', (0, ensurePermission_1.can)("create_financial"), createFinancialController.create);
financialRouter.get('/registers', (0, ensurePermission_1.can)("view_financial"), getFinancialController.getAll);
financialRouter.get('/registers/:id', (0, ensurePermission_1.can)("view_financial"), getFinancialController.getOne);
financialRouter.put('/registers/:id', (0, ensurePermission_1.can)("update_financial"), updateFinancialController.updateOne);
financialRouter.delete('/registers/:id', (0, ensurePermission_1.can)("delete_financial"), deleteFinancialController.deleteOne);
exports.default = financialRouter;
