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
exports.createClientService = void 0;
const prismaClient_1 = require("../../../database/prismaClient");
exports.createClientService = {
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prismaClient_1.prisma.client.create({
            data: {
                id: data.id,
                name: data.name,
                email: data.email,
                tel: data.tel,
                cep: data.cep,
                city: data.city,
                state: data.state,
                unity: {
                    connect: {
                        id: data.unity
                    }
                },
                user: {
                    connect: {
                        id: data.user
                    }
                }
            }
        });
    }),
};
