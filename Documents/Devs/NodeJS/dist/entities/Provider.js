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
exports.Provider = void 0;
const typeorm_1 = require("typeorm");
const BasicEntity_1 = __importDefault(require("./BasicEntity"));
const types_1 = require("../types");
const Account_1 = require("./Account");
const Wallet_1 = require("./Wallet");
const BusinessCategory_1 = require("./BusinessCategory");
const Affiliate_1 = require("./Affiliate");
const Cashier_1 = require("./Cashier");
let Provider = class Provider extends BasicEntity_1.default {
};
__decorate([
    (0, typeorm_1.Column)("boolean", { default: false })
], Provider.prototype, "isSystem", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], Provider.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Account_1.Account, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)()
], Provider.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar")
], Provider.prototype, "businessName", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { default: 0 })
], Provider.prototype, "businessAge", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: types_1.BusinessAgeUnit, default: types_1.BusinessAgeUnit.YEARS })
], Provider.prototype, "businessAgeUnit", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true })
], Provider.prototype, "businessEmail", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar")
], Provider.prototype, "businessAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar")
], Provider.prototype, "businessPhoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { default: "sd" })
], Provider.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar")
], Provider.prototype, "ownerName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true })
], Provider.prototype, "ownerEmail", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar")
], Provider.prototype, "ownerNationality", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: ["f", "m"] })
], Provider.prototype, "ownerGender", void 0);
__decorate([
    (0, typeorm_1.Column)("date")
], Provider.prototype, "ownerBirthdate", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: ["passport", "idcard", "other"] })
], Provider.prototype, "ownerDocumentType", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { unique: true })
], Provider.prototype, "ownerDocumentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar")
], Provider.prototype, "ownerAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar")
], Provider.prototype, "managerName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true })
], Provider.prototype, "managerEmail", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar")
], Provider.prototype, "managerNationality", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: ["f", "m"] })
], Provider.prototype, "managerGender", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { default: "1970-01-01" })
], Provider.prototype, "managerBirthdate", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: ["passport", "idcard", "other"] })
], Provider.prototype, "managerDocumentType", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { unique: true })
], Provider.prototype, "managerDocumentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar")
], Provider.prototype, "managerAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { nullable: true })
], Provider.prototype, "phoneVerifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { nullable: true })
], Provider.prototype, "emailVerifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: types_1.ProviderStatus, default: types_1.ProviderStatus.PENDING })
], Provider.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: ["en", "ar"], nullable: true })
], Provider.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Wallet_1.Wallet, (wa) => wa.provider)
], Provider.prototype, "wallets", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BusinessCategory_1.BusinessCategory, { nullable: true })
], Provider.prototype, "businessCategory", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true })
], Provider.prototype, "businessCategoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Affiliate_1.Affiliate, { nullable: true })
], Provider.prototype, "affiliate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cashier_1.Cashier, (c) => c.provider, { onDelete: "CASCADE" })
], Provider.prototype, "cashiers", void 0);
Provider = __decorate([
    (0, typeorm_1.Entity)()
], Provider);
exports.Provider = Provider;
