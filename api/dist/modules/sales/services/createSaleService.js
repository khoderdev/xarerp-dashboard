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
exports.createSaleService = void 0;
const prismaClient_1 = require("../../../database/prismaClient");
exports.createSaleService = {
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.sale.create({
            data: {
                id: data.id,
                product: {
                    connect: {
                        id: data.product
                    }
                },
                unity: {
                    connect: {
                        id: data.unity
                    }
                },
                client: {
                    connect: {
                        id: data.client
                    }
                },
                seller: {
                    connect: {
                        id: data.seller
                    }
                },
                carrier: {
                    connect: {
                        id: data.carrier
                    }
                },
                quantity: data.quantity,
                status: data.status
            }
        });
    }),
};
