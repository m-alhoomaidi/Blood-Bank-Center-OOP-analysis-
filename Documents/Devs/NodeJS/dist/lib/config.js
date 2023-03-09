"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", ".env") });
exports.default = {
    accountNumberLength: 7,
    walletNumberLength: 7,
    cCodeNumberLength: 6,
    cCodeExpirationHours: 1,
    fees: {
        spendingFees: 2,
        receivingFees: 2,
    },
    JWT_SECRET: process.env.JWT_SECRET,
    defaultSystemUsername: "system",
    defaultSystemPassword: "123456",
    defaultSystemProvider: {
        businessName: "SYSTEM",
        businessAdress: "SYSTEM",
        businessPhoneNumber: "SYSTEM",
        ownerName: "SYSTEM",
        ownerNationality: "SYSTEM",
        ownerGender: "m",
        ownerBirthdate: "1970-01-01",
        ownerDocumentType: "other",
        ownerDocumentNumber: 1,
        ownerAddress: "SYSTEM",
        status: "ACTIVE",
        language: "ar",
        isSystem: true,
        accountId: 0,
        businessAddress: "SYSTEM",
        countryCode: "sd",
    },
};
