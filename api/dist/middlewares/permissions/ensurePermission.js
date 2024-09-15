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
exports.can = void 0;
const getUserService_1 = require("../../modules/users/services/getUserService");
function can(role) {
    const roleAuthorized = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        const hasUser = yield getUserService_1.getUserService.findOne(userId);
        if (!hasUser) {
            return res.status(404).json({ error: "Not found" });
        }
        const userPermissions = hasUser.permissions.split(",");
        if (role === "delete_store") {
            if (hasUser.position === "Administrator" &&
                userPermissions.includes("restrict_delete_store")) {
                return res
                    .status(403)
                    .json({
                    error: "Deletion of this store is restricted for administrators",
                });
            }
        }
        if (!userPermissions.includes(role)) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        return next();
    });
    return roleAuthorized;
}
exports.can = can;
