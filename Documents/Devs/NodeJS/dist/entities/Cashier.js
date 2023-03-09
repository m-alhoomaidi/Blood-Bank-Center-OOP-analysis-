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
exports.Cashier = void 0;
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const Account_1 = require("./Account");
const BasicEntity_1 = __importDefault(require("./BasicEntity"));
const Provider_1 = require("./Provider");
let Cashier = class Cashier extends BasicEntity_1.default {
};
__decorate([
    (0, typeorm_1.Column)("varchar")
], Cashier.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar")
], Cashier.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Account_1.Account)
], Cashier.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], Cashier.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Provider_1.Provider)
], Cashier.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], Cashier.prototype, "providerId", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: types_1.CashierStatus, default: types_1.CashierStatus.ACTIVE })
], Cashier.prototype, "status", void 0);
Cashier = __decorate([
    (0, typeorm_1.Entity)()
], Cashier);
exports.Cashier = Cashier;
