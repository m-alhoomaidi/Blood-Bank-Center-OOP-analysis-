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
exports.Customer = void 0;
const typeorm_1 = require("typeorm");
const BasicEntity_1 = __importDefault(require("./BasicEntity"));
const types_1 = require("../types");
const Account_1 = require("./Account");
let Customer = class Customer extends BasicEntity_1.default {
};
__decorate([
    (0, typeorm_1.Column)("varchar")
], Customer.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar")
], Customer.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], Customer.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Account_1.Account, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)()
], Customer.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true, unique: true })
], Customer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true, unique: true })
], Customer.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: ["en", "ar"], nullable: true })
], Customer.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { nullable: true })
], Customer.prototype, "phoneVerifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { nullable: true })
], Customer.prototype, "emailVerifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { default: "sd" })
], Customer.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: types_1.CustomerStatus, default: types_1.CustomerStatus.ACTIVE })
], Customer.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: false })
], Customer.prototype, "isInvestor", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: false })
], Customer.prototype, "isVolunteer", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: false })
], Customer.prototype, "isBusinessOwner", void 0);
Customer = __decorate([
    (0, typeorm_1.Entity)()
], Customer);
exports.Customer = Customer;
