"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const BasicEntity_1 = __importDefault(require("./BasicEntity"));
const Cashier_1 = require("./Cashier");
const Wallet_1 = require("./Wallet");
let Transaction = class Transaction extends BasicEntity_1.default {
};
__decorate([
    (0, typeorm_1.Column)("int", { width: 11 })
], Transaction.prototype, "trxNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Wallet_1.Wallet)
], Transaction.prototype, "fromWallet", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], Transaction.prototype, "fromWalletId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Wallet_1.Wallet)
], Transaction.prototype, "toWallet", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], Transaction.prototype, "toWalletId", void 0);
__decorate([
    (0, typeorm_1.Column)("float")
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: types_1.PointTypes, default: types_1.PointTypes.WHITE })
], Transaction.prototype, "pointType", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: types_1.TransactionTypes })
], Transaction.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cashier_1.Cashier, { nullable: true })
], Transaction.prototype, "cashier", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true })
], Transaction.prototype, "cashierId", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        enum: types_1.TransactionStatus,
        default: types_1.TransactionStatus.PENDING,
    })
], Transaction.prototype, "status", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)("UQ_TRX", ["id", "trxNumber"])
], Transaction);
exports.Transaction = Transaction;
