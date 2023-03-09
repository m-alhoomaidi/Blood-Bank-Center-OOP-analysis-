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
exports.CustomerRepository = void 0;
const Customer_1 = require("../entities/Customer");
const BaseRepo_1 = require("./BaseRepo");
class CustomerRepository extends BaseRepo_1.BaseRepository {
    constructor(dbConnection) {
        const repo = dbConnection.getRepository(Customer_1.Customer);
        super(dbConnection, repo);
    }
    getAllOfProvider(providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository
                .createQueryBuilder("c")
                // .where("c.providerId = :providerId", { providerId })
                .innerJoinAndSelect("c.account", "a")
                // .leftJoinAndSelect("a.wallets", "w")
                // .where("w.providerId = :providerId", { providerId })
                // .select("c", "customer")
                .getMany();
            return query;
        });
    }
    getByAccountId(accountId, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.repository.findOne({
                where: { accountId },
                relations,
            });
            return customer;
        });
    }
    customerCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.count();
        });
    }
}
exports.CustomerRepository = CustomerRepository;
