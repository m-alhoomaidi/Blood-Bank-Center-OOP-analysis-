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
exports.Session = void 0;
const typeorm_1 = require("typeorm");
const Account_1 = require("./Account");
const BasicEntity_1 = __importDefault(require("./BasicEntity"));
let Session = class Session extends BasicEntity_1.default {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account)
], Session.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], Session.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar")
], Session.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: true })
], Session.prototype, "isValid", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { nullable: true })
], Session.prototype, "invaliedAt", void 0);
Session = __decorate([
    (0, typeorm_1.Entity)()
], Session);
exports.Session = Session;
