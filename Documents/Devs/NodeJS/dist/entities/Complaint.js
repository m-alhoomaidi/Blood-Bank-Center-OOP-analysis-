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
exports.Complaint = void 0;
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const Account_1 = require("./Account");
const BasicEntity_1 = __importDefault(require("./BasicEntity"));
let Complaint = class Complaint extends BasicEntity_1.default {
};
__decorate([
    (0, typeorm_1.Column)("varchar")
], Complaint.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar")
], Complaint.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: types_1.ComplaintStatus, default: types_1.ComplaintStatus.PENDING })
], Complaint.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account, { nullable: true })
], Complaint.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true })
], Complaint.prototype, "accountId", void 0);
Complaint = __decorate([
    (0, typeorm_1.Entity)()
], Complaint);
exports.Complaint = Complaint;
