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
exports.create = void 0;
const createUserService_1 = require("../services/createUserService");
const getUserService_1 = require("../services/getUserService");
const getStoreService_1 = require("../../stores/services/getStoreService");
const uuid_1 = require("uuid");
const bcrypt_1 = require("bcrypt");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, unity, position } = req.body;
        const password = "1234";
        if (!name || !email || !unity || !position) {
            return res.status(400).json({ error: "Incomplete data" });
        }
        const hasStore = yield getStoreService_1.getStoreService.findOne(unity);
        if (!hasStore) {
            return res.status(404).json({ error: "Store not found" });
        }
        const hasUserByEmail = yield getUserService_1.getUserService.findByEmail(email);
        if (hasUserByEmail.length > 0) {
            return res.status(400).json({ error: "E-mail already exists" });
        }
        const defaultRoles = ["view_dashboard"];
        const storeRoles = [
            "view_store",
            "create_store",
            "update_store",
            "delete_store",
        ];
        const productRoles = [
            "view_product",
            "create_product",
            "update_product",
            "delete_product",
        ];
        const clientRoles = [
            "view_client",
            "create_client",
            "update_client",
            "delete_client",
        ];
        const saleRoles = [
            "view_sale",
            "create_sale",
            "update_sale",
            "delete_sale",
        ];
        const carrierRoles = [
            "view_carrier",
            "create_carrier",
            "update_carrier",
            "delete_carrier",
        ];
        const providerRoles = [
            "view_provider",
            "create_provider",
            "update_provider",
            "delete_provider",
        ];
        const sellerRoles = [
            "view_seller",
            "create_seller",
            "update_seller",
            "delete_seller",
        ];
        const purchaseRoles = [
            "view_purchase",
            "create_purchase",
            "update_purchase",
            "delete_purchase",
        ];
        const financialRoles = [
            "view_financial",
            "create_financial",
            "update_financial",
            "delete_financial",
        ];
        const userRoles = [
            "view_user",
            "create_user",
            "update_user",
            "delete_user",
        ];
        const ticketRoles = [
            "view_ticket",
            "create_ticket",
            "update_ticket",
            "delete_ticket",
        ];
        const categoryRoles = ["create_category", "view_category"];
        const administrationCanGets = [
            "get_stores",
            "get_categories",
            "get_providers",
            "get_products",
            "get_clients",
            "get_sellers",
            "get_carriers",
            "get_users",
        ];
        const financialCanGets = ["get_stores"];
        const saleCanGets = [
            "get_stores",
            "get_products",
            "get_clients",
            "get_sellers",
            "get_carriers",
        ];
        const depositCanGets = [
            "get_categories",
            "get_stores",
            "get_providers",
            "get_products",
        ];
        const adminPermissions = [
            ...defaultRoles,
            ...storeRoles,
            ...productRoles,
            ...clientRoles,
            ...saleRoles,
            ...carrierRoles,
            ...providerRoles,
            ...sellerRoles,
            ...purchaseRoles,
            ...financialRoles,
            ...userRoles,
            ...ticketRoles,
            ...categoryRoles,
            ...administrationCanGets,
        ];
        const finanPermissions = [
            ...defaultRoles,
            ...financialRoles,
            ...ticketRoles,
            ...financialCanGets,
        ];
        const sellerPermissions = [
            ...defaultRoles,
            ...clientRoles,
            ...saleRoles,
            ...ticketRoles,
            ...saleCanGets,
        ];
        const stockPermissions = [
            ...defaultRoles,
            ...productRoles,
            ...providerRoles,
            ...purchaseRoles,
            ...ticketRoles,
            ...categoryRoles,
            ...depositCanGets,
        ];
        let userPermissions = "";
        switch (position) {
            case "Administration":
                userPermissions = adminPermissions.join(",");
                break;
            case "Financial":
                userPermissions = finanPermissions.join(",");
                break;
            case "Sales":
                userPermissions = sellerPermissions.join(",");
                break;
            case "Deposit":
                userPermissions = stockPermissions.join(",");
                break;
        }
        const hashPassword = yield (0, bcrypt_1.hash)(password, 10);
        const user = yield createUserService_1.createUserService.create({
            id: (0, uuid_1.v4)(),
            name,
            email,
            password: hashPassword,
            unity,
            position,
            permissions: userPermissions,
            active: true,
        });
        if (!user) {
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(201).json({ user });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "InternalServerError" });
    }
});
exports.create = create;
