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
exports.PointRecord = void 0;
const typeorm_1 = require("typeorm");
const BasicEntity_1 = __importDefault(require("./BasicEntity"));
const Wallet_1 = require("./Wallet");
let PointRecord = class PointRecord extends BasicEntity_1.default {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => Wallet_1.Wallet)
], PointRecord.prototype, "wallet", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Wallet_1.Wallet)
], PointRecord.prototype, "originWallet", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], PointRecord.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], PointRecord.prototype, "walletId", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], PointRecord.prototype, "originWalletId", void 0);
PointRecord = __decorate([
    (0, typeorm_1.Entity)()
], PointRecord);
exports.PointRecord = PointRecord;
