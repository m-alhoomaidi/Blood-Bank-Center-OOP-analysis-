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
exports.Affiliate = void 0;
const typeorm_1 = require("typeorm");
const BasicEntity_1 = __importDefault(require("./BasicEntity"));
const Provider_1 = require("./Provider");
let Affiliate = class Affiliate extends BasicEntity_1.default {
};
__decorate([
    (0, typeorm_1.Column)("varchar")
], Affiliate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { unique: true })
], Affiliate.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" })
], Affiliate.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Provider_1.Provider, (p) => p.affiliate, { eager: true })
], Affiliate.prototype, "providers", void 0);
Affiliate = __decorate([
    (0, typeorm_1.Entity)()
], Affiliate);
exports.Affiliate = Affiliate;
