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
const createClientController = __importStar(require("../modules/clients/controllers/createClientController"));
const getClientController = __importStar(require("../modules/clients/controllers/getClientController"));
const updateClientController = __importStar(require("../modules/clients/controllers/updateClientController"));
const deleteClientController = __importStar(require("../modules/clients/controllers/deleteClientController"));
const clientsRouter = (0, express_1.Router)();
clientsRouter.post('/', (0, ensurePermission_1.can)("create_client"), createClientController.create);
clientsRouter.get('/', (0, ensurePermission_1.can)("view_client"), getClientController.getAll);
clientsRouter.get('/get/', (0, ensurePermission_1.can)("get_clients"), getClientController.getRegisters);
clientsRouter.get('/:id', (0, ensurePermission_1.can)("view_client"), getClientController.getOne);
clientsRouter.put('/:id', (0, ensurePermission_1.can)("update_client"), updateClientController.updateOne);
clientsRouter.delete('/:id', (0, ensurePermission_1.can)("delete_client"), deleteClientController.deleteOne);
exports.default = clientsRouter;
