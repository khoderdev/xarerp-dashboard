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
exports.getUserService = void 0;
const prismaClient_1 = require("../../../database/prismaClient");
exports.getUserService = {
    findOne: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.user.findUnique({
            where: { id }
        });
    }),
    findAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.user.findMany({});
    }),
    findByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.user.findMany({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive'
                }
            }
        });
    }),
    findByEmailLogin: (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                password: true,
                name: true,
                position: true,
                active: true,
                permissions: true,
                unity: {
                    select: {
                        name: true
                    }
                }
            }
        });
    }),
    //List with pagination
    listAll: (name, page) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.$transaction([
            prismaClient_1.prisma.user.count({
                where: {
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                }
            }),
            prismaClient_1.prisma.user.findMany({
                where: {
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                },
                include: {
                    unity: {
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
