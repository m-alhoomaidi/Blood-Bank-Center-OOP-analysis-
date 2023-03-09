"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AffiliateRepository = void 0;
const Affiliate_1 = require("../entities/Affiliate");
const BaseRepo_1 = require("./BaseRepo");
class AffiliateRepository extends BaseRepo_1.BaseRepository {
    constructor(dbConnection) {
        const repo = dbConnection.getRepository(Affiliate_1.Affiliate);
        super(dbConnection, repo);
    }
    getAffiliateByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({ where: { code } });
        });
    }
}
exports.AffiliateRepository = AffiliateRepository;
