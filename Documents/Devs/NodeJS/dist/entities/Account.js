"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const BasicEntity_1 = __importDefault(require("./BasicEntity"));
const Wallet_1 = require("./Wallet");
const types_1 = require("../types");
const Provider_1 = require("./Provider");
const Customer_1 = require("./Customer");
let Account = class Account extends BasicEntity_1.default {
    constructor() {
        super(...arguments);
        // hashing passwords
        this.loadTempPass = () => {
            this.tempPass = this.password;
        };
    }
    setPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.tempPass === this.password)
                return;
            const salt = yield bcrypt_1.default.genSalt();
            this.password = yield bcrypt_1.default.hash(password || this.password, salt);
        });
    }
};
__decorate([
    (0, typeorm_1.Column)("varchar", {
        unique: true,
    })
], Account.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        select: false,
    })
], Account.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        unique: true,
    })
], Account.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)()
    // (0, typeorm_1.Column)("varchar", {
    //     unique: true,
    // })
], 
Account.prototype, "loadTempPass", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)()
], 
Account.prototype, "setPassword", null);
__decorate([
    (0, typeorm_1.OneToMany)(() => Wallet_1.Wallet, (wallet) => wallet.account)
], Account.prototype, "wallets", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        enum: types_1.UserTypes,
        default: types_1.UserTypes.CUSTOMER,
    })
], Account.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)("date", {
        nullable: true,
    })
], Account.prototype, "lastLogin", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Provider_1.Provider, (provider) => provider.account, {
        onDelete: "CASCADE",
    })
], Account.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Customer_1.Customer, (customer) => customer.account, {
        onDelete: "CASCADE",
    })
], Account.prototype, "customer", void 0);
Account = __decorate([
    (0, typeorm_1.Entity)()
], Account);
exports.Account = Account;
