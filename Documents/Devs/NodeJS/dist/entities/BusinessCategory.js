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
exports.BusinessCategory = void 0;
const typeorm_1 = require("typeorm");
const BasicEntity_1 = __importDefault(require("./BasicEntity"));
let BusinessCategory = class BusinessCategory extends BasicEntity_1.default {
};
__decorate([
    (0, typeorm_1.Column)("varchar")
], BusinessCategory.prototype, "nameAr", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar")
], BusinessCategory.prototype, "nameEn", void 0);
BusinessCategory = __decorate([
    (0, typeorm_1.Entity)()
], BusinessCategory);
exports.BusinessCategory = BusinessCategory;
