"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateNumber = (digits) => {
    const number = Math.floor(Math.random() * Math.pow(10, digits));
    if (number.toString().length !== digits)
        return generateNumber(digits);
    return number;
};
exports.default = generateNumber;
