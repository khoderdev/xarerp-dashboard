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
const createCategoryService_1 = require("../services/createCategoryService");
const getCategoryService_1 = require("../services/getCategoryService");
const uuid_1 = require("uuid");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Category title not filled' });
        }
        const hasCategory = yield getCategoryService_1.getCategoryService.findByTitle(title);
        if (hasCategory.length > 0) {
            return res.status(400).json({ error: 'Category already exists' });
        }
        const category = yield createCategoryService_1.createCategoryService.create({
            id: (0, uuid_1.v4)(),
            title
        });
        if (!category) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(201).json({ category });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.create = create;
