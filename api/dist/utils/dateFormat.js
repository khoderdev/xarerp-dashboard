"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const formatDate = (date) => {
    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    return `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}`;
};
exports.formatDate = formatDate;
