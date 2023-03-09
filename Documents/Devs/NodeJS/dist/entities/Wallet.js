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
exports.Wallet = void 0;
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const Log_1 = __importDefault(require("../util/Log"));
const Account_1 = require("./Account");
const BasicEntity_1 = __importDefault(require("./BasicEntity"));
const CustomerPointsRecord_1 = require("./CustomerPointsRecord");
const Provider_1 = require("./Provider");
const Transaction_1 = require("./Transaction");
let Wallet = class Wallet extends BasicEntity_1.default {
    constructor() {
        super(...arguments);
        this.calculateBalance = () => {
            Log_1.default.debug("AFTERLOAD : " + this.id);
            if (this.walletType !== types_1.WalletTypes.PROVIDER && this.records) {
                const balance = this.records.reduce((acc, cur) => acc + cur.amount, 0);
                this.balance = Number(balance.toFixed(2));
            }
        };
    }
};
__decorate([
    (0, typeorm_1.Column)("int", { unique: true })
], Wallet.prototype, "walletNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Provider_1.Provider)
], Wallet.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)("float", { nullable: true })
], Wallet.prototype, "bonus", void 0);
__decorate([
    (0, typeorm_1.Column)("float", { nullable: true })
], Wallet.prototype, "fees", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true })
], Wallet.prototype, "providerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account)
], Wallet.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], Wallet.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)()
], Wallet.prototype, "calculateBalance", void 0);
__decorate([
    (0, typeorm_1.Column)("float", { default: 0 })
], Wallet.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CustomerPointsRecord_1.PointsRecord, (cpr) => cpr.targetWallet, { eager: true })
], Wallet.prototype, "records", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: types_1.PointTypes, default: types_1.PointTypes.WHITE })
], Wallet.prototype, "pointType", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: types_1.WalletTypes })
], Wallet.prototype, "walletType", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { default: 0 })
], Wallet.prototype, "totalTrx", void 0);
__decorate([
    (0, typeorm_1.Column)("float", { default: 0 })
], Wallet.prototype, "totalConsume", void 0);
__decorate([
    (0, typeorm_1.Column)("float", { default: 0 })
], Wallet.prototype, "totalSold", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Transaction_1.Transaction, (t) => t.fromWallet)
], Wallet.prototype, "outgoingTransactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Transaction_1.Transaction, (t) => t.toWallet)
], Wallet.prototype, "incomingTransactions", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: types_1.WalletStatus, default: types_1.WalletStatus.ACTIVE })
], Wallet.prototype, "status", void 0);
Wallet = __decorate([
    (0, typeorm_1.Entity)()
], Wallet);
exports.Wallet = Wallet;
