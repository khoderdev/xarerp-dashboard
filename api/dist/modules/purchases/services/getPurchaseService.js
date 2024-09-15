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
exports.getPurchaseService = void 0;
const prismaClient_1 = require("../../../database/prismaClient");
exports.getPurchaseService = {
    findAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.purchase.findMany({});
    }),
    findOne: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.purchase.findUnique({
            where: { id }
        });
    }),
    //list with pagination
    listAll: (name, page) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.$transaction([
            prismaClient_1.prisma.purchase.count({
                where: {
                    product: {
                        name: {
                            contains: name,
                            mode: 'insensitive'
                        }
                    }
                }
            }),
            prismaClient_1.prisma.purchase.findMany({
                where: {
                    product: {
                        name: {
                            contains: name,
                            mode: 'insensitive'
                        }
                    }
                },
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    },
                    product: {
                        select: {
                            name: true,
                            description: true
                        }
                    },
                    unity: {
                        select: {
                            name: true
                        }
                    },
                    provider: {
                        select: {
                            name: true
                        }
                    }
                },
                skip: page * 10,
                take: 10,
                orderBy: {
                    updated_at: 'desc'
                }
            })
        ]);
    }),
};
