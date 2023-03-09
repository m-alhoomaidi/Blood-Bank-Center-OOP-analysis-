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
exports.Review = void 0;
const typeorm_1 = require("typeorm");
const BasicEntity_1 = __importDefault(require("./BasicEntity"));
const Customer_1 = require("./Customer");
const Provider_1 = require("./Provider");
let Review = class Review extends BasicEntity_1.default {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => Provider_1.Provider, { onDelete: "CASCADE" })
], Review.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], Review.prototype, "providerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customer_1.Customer, { onDelete: "CASCADE" })
], Review.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], Review.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { default: "" })
], Review.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)("int")
], Review.prototype, "rating", void 0);
Review = __decorate([
    (0, typeorm_1.Entity)()
], Review);
exports.Review = Review;
