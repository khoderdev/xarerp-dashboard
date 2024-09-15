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
exports.updateOne = void 0;
const updateCategoryService_1 = require("../services/updateCategoryService");
const getCategoryService_1 = require("../services/getCategoryService");
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Category title not filled' });
        }
        const category = yield getCategoryService_1.getCategoryService.findOne(id);
        if (!category) {
            return res.status(404).json({ error: 'Not found' });
        }
        if (title !== category.title) {
            const hasCategory = yield getCategoryService_1.getCategoryService.findByTitle(title);
            if (hasCategory.length > 0) {
                return res.status(400).json({ error: 'Category already exists' });
            }
        }
        const time = new Date().toISOString();
        const categoryUpdated = yield updateCategoryService_1.updateCategoryService.update(id, title, time);
        if (!categoryUpdated) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ category: categoryUpdated });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'InternalServerError' });
    }
});
exports.updateOne = updateOne;
