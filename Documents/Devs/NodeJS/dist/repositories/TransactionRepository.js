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
exports.TransactionRepository = void 0;
const typeorm_1 = require("typeorm");
const Transaction_1 = require("../entities/Transaction");
const BaseRepo_1 = require("./BaseRepo");
class TransactionRepository extends BaseRepo_1.BaseRepository {
    constructor(dbConnection) {
        const repo = dbConnection.getRepository(Transaction_1.Transaction);
        super(dbConnection, repo);
    }
    getAndCount(take = 10, skip = 0, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result, total] = yield this.repository.findAndCount({
                relations,
                take,
                skip,
                order: {
                    id: "DESC",
                },
            });
            return {
                values: result,
                count: total,
            };
        });
    }
    trxCountToday() {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const count = yield this.repository.count({
                where: {
                    createdAt: (0, typeorm_1.Between)(yesterday, today),
                },
            });
            return count;
        });
    }
    trxCountTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.repository.count();
            return count;
        });
    }
    getByTrXNumber(trxNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const trx = yield this.repository.findOne({
                where: {
                    trxNumber,
                },
            });
            return trx;
        });
    }
}
exports.TransactionRepository = TransactionRepository;
