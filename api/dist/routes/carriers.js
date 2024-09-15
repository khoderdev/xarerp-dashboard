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
const createCarrierController = __importStar(require("../modules/carriers/controllers/createCarrierController"));
const getCarrierController = __importStar(require("../modules/carriers/controllers/getCarrierController"));
const updateCarrierController = __importStar(require("../modules/carriers/controllers/updateCarrierController"));
const deleteCarrierController = __importStar(require("../modules/carriers/controllers/deleteCarrierController"));
const carriersRouter = (0, express_1.Router)();
carriersRouter.post('/', (0, ensurePermission_1.can)("create_carrier"), createCarrierController.create);
carriersRouter.get('/', (0, ensurePermission_1.can)("view_carrier"), getCarrierController.getAll);
carriersRouter.get('/get/', (0, ensurePermission_1.can)("get_carriers"), getCarrierController.getRegisters);
carriersRouter.get('/:id', (0, ensurePermission_1.can)("view_carrier"), getCarrierController.getOne);
carriersRouter.put('/:id', (0, ensurePermission_1.can)("update_carrier"), updateCarrierController.updateOne);
carriersRouter.delete('/:id', (0, ensurePermission_1.can)("delete_carrier"), deleteCarrierController.deleteOne);
exports.default = carriersRouter;
