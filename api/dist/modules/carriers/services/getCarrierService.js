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
exports.getCarrierService = void 0;
const prismaClient_1 = require("../../../database/prismaClient");
exports.getCarrierService = {
    findAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.carrier.findMany({});
    }),
    findAllWithPagination: (page) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.$transaction([
            prismaClient_1.prisma.carrier.count(),
            prismaClient_1.prisma.carrier.findMany({
                skip: page * 10,
                take: 10,
                orderBy: {
                    updated_at: 'desc'
                }
            })
        ]);
    }),
    findOne: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.carrier.findUnique({
            where: { id }
        });
    }),
    findByName: (name) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.carrier.findMany({
            where: {
                name: {
                    equals: name,
                    mode: 'insensitive'
                }
            }
        });
    }),
    //list with pagination
    listAll: (name, page) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.$transaction([
            prismaClient_1.prisma.carrier.count({
                where: {
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                }
            }),
            prismaClient_1.prisma.carrier.findMany({
                where: {
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                },
                skip: page * 10,
                take: 10,
                orderBy: {
                    updated_at: 'desc'
                }
            })
        ]);
    })
};
