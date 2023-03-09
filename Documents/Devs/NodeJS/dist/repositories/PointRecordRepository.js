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
exports.PointRecordRepository = void 0;
const CustomerPointsRecord_1 = require("../entities/CustomerPointsRecord");
const BaseRepo_1 = require("./BaseRepo");
class PointRecordRepository extends BaseRepo_1.BaseRepository {
    constructor(dbConnection) {
        const repo = dbConnection.getRepository(CustomerPointsRecord_1.PointsRecord);
        super(dbConnection, repo);
    }
    updateWalletBalance(targetWalletId, originWalletId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let rec = yield this.repository.findOne({
                where: {
                    originWalletId,
                    targetWalletId,
                },
            });
            if (rec) {
                // record exists, update it
                rec.amount = rec.amount + amount;
                return yield this.update(rec);
            }
            // no record
            return yield this.create({ originWalletId, targetWalletId, amount });
        });
    }
}
exports.PointRecordRepository = PointRecordRepository;
