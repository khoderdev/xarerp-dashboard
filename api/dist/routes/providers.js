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
const createProviderController = __importStar(require("../modules/providers/controllers/createProviderController"));
const getProviderController = __importStar(require("../modules/providers/controllers/getProviderController"));
const updateProviderController = __importStar(require("../modules/providers/controllers/updateProviderController"));
const deleteProviderController = __importStar(require("../modules/providers/controllers/deleteProviderController"));
const providersRouter = (0, express_1.Router)();
providersRouter.post('/', (0, ensurePermission_1.can)("create_provider"), createProviderController.create);
providersRouter.get('/', (0, ensurePermission_1.can)("view_provider"), getProviderController.getAll);
providersRouter.get('/get/', (0, ensurePermission_1.can)("get_providers"), getProviderController.getRegisters);
providersRouter.get('/:id', (0, ensurePermission_1.can)("view_provider"), getProviderController.getOne);
providersRouter.put('/:id', (0, ensurePermission_1.can)("update_provider"), updateProviderController.updateOne);
providersRouter.delete('/:id', (0, ensurePermission_1.can)("delete_provider"), deleteProviderController.deleteOne);
exports.default = providersRouter;
