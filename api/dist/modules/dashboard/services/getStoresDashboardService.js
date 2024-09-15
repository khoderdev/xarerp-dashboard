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
exports.getStoresDashboardService = void 0;
const prismaClient_1 = require("../../../database/prismaClient");
exports.getStoresDashboardService = {
    findSalesDefaultStore: (minDate) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.sale.findMany({
            where: {
                updated_at: {
                    gte: new Date(minDate)
                }
            },
            select: {
                product: {
                    select: {
                        purchase_price: true,
                        sale_price: true,
                    }
                },
                unity: {
                    select: {
                        type: true,
                        name: true
                    }
                }
            }
        });
    }),
};
