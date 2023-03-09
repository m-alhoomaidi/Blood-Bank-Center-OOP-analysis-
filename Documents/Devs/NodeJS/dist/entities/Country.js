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
exports.Country = void 0;
const typeorm_1 = require("typeorm");
const BasicEntity_1 = __importDefault(require("./BasicEntity"));
let Country = class Country extends BasicEntity_1.default {
};
__decorate([
    (0, typeorm_1.Column)("varchar", { unique: true })
], Country.prototype, "nameAr", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { unique: true })
], Country.prototype, "nameEn", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { unique: true })
], Country.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: ["en", "ar"], default: "ar" })
], Country.prototype, "lang", void 0);
Country = __decorate([
    (0, typeorm_1.Entity)()
], Country);
exports.Country = Country;
