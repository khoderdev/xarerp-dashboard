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
exports.getStoreService = void 0;
const prismaClient_1 = require("../../../database/prismaClient");
const logger_1 = __importDefault(require("../../../helpers/logger"));
exports.getStoreService = {
    hasAssociatedAdministrators: (storeId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const count = yield prismaClient_1.prisma.administrator.count({
                where: {
                    storeId,
                },
            });
            return count > 0;
        }
        catch (err) {
            if (err instanceof Error) {
                logger_1.default.error(`Error in hasAssociatedAdministrators: ${err.message}, Stack: ${err.stack}`);
            }
            else {
                logger_1.default.error("Unknown error occurred in hasAssociatedAdministrators");
            }
            throw err;
        }
    }),
    findAll: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield prismaClient_1.prisma.store.findMany({});
        }
        catch (err) {
            if (err instanceof Error) {
                logger_1.default.error(`Error in findAll: ${err.message}, Stack: ${err.stack}`);
            }
            else {
                logger_1.default.error("Unknown error occurred in findAll");
            }
            throw err;
        }
    }),
    findOne: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield prismaClient_1.prisma.store.findUnique({
                where: { id },
            });
        }
        catch (err) {
            if (err instanceof Error) {
                logger_1.default.error(`Error in findOne: ${err.message}, Stack: ${err.stack}`);
            }
            else {
                logger_1.default.error("Unknown error occurred in findOne");
            }
            throw err;
        }
    }),
    listAll: (name, page) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield prismaClient_1.prisma.$transaction([
                prismaClient_1.prisma.store.count({
                    where: {
                        name: {
                            contains: name,
                            mode: "insensitive",
                        },
                    },
                }),
                prismaClient_1.prisma.store.findMany({
                    where: {
                        name: {
                            contains: name,
                            mode: "insensitive",
                        },
                    },
                    skip: page * 10,
                    take: 10,
                    orderBy: {
                        updated_at: "desc",
                    },
                }),
            ]);
        }
        catch (err) {
            if (err instanceof Error) {
                logger_1.default.error(`Error in listAll: ${err.message}, Stack: ${err.stack}`);
            }
            else {
                logger_1.default.error("Unknown error occurred in listAll");
            }
            throw err;
        }
    }),
};
