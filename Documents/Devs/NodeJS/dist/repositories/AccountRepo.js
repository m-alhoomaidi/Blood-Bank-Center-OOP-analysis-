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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRepository = void 0;
const customerController_1 = require("../controllers/customerController");
const Account_1 = require("../entities/Account");
const types_1 = require("../types");
const Log_1 = __importDefault(require("../util/Log"));
const BaseRepo_1 = require("./BaseRepo");
class AccountRepository extends BaseRepo_1.BaseRepository {
    constructor(dbConnection) {
        const repo = dbConnection.getRepository(Account_1.Account);
        super(dbConnection, repo);
    }
    getByAccountNumber(accountNumber, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.findOne({
                where: { accountNumber },
                relations,
            });
            if (!result)
                return undefined;
            return result;
        });
    }
    getByUsername(username, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.findOne({
                where: { username },
                relations,
            });
            return result;
        });
    }
    getWallets(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getById(accountId, ["wallets"]);
            if (!result)
                return undefined;
            return result.wallets;
        });
    }
    getSystemAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            let account = yield this.repository.findOne({
                where: { type: types_1.UserTypes.ADMIN },
            });
            if (!account) {
                Log_1.default.warning("No system account was foundd, creating a new system account...");
                account = yield this.createSystemAccount();
            }
            return account;
        });
    }
    createSystemAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            const account = new Account_1.Account();
            account.username = "system";
            account.password = "system";
            account.accountNumber = yield (0, customerController_1.generateAccountNumber)(this);
            account.type = types_1.UserTypes.ADMIN;
            return yield this.repository.save(account);
        });
    }
}
exports.AccountRepository = AccountRepository;
