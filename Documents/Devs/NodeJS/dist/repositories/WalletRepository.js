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
exports.WalletRepository = void 0;
const adminController_1 = require("../controllers/adminController");
const Wallet_1 = require("../entities/Wallet");
const NotFoundError_1 = require("../errors/NotFoundError");
const typeorm_1 = require("../infrastructure/typeorm");
const types_1 = require("../types");
const AccountRepo_1 = require("./AccountRepo");
const BaseRepo_1 = require("./BaseRepo");
class WalletRepository extends BaseRepo_1.BaseRepository {
    constructor(dbConnection) {
        const repo = dbConnection.getRepository(Wallet_1.Wallet);
        super(dbConnection, repo);
    }
    getCustomerWalletsByProviderId(providerId, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: [
                    { providerId, walletType: types_1.WalletTypes.CUSTOMER },
                    { providerId, walletType: types_1.WalletTypes.SYSTEM },
                ],
                relations,
            });
        });
    }
    getByAccountIdAndProviderId(accountId, providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOneOrFail({
                where: { accountId, providerId },
            });
        });
    }
    getSystemWallets(relations) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: { walletType: types_1.WalletTypes.SYSTEM },
                relations,
            });
        });
    }
    getSystemWallet(providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: { walletType: types_1.WalletTypes.SYSTEM, providerId },
            });
        });
    }
    createSystemWallet(accountId, walletNumber, providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = new Wallet_1.Wallet();
            wallet.walletType = types_1.WalletTypes.SYSTEM;
            wallet.accountId = accountId;
            wallet.balance = 0;
            wallet.walletNumber = walletNumber;
            wallet.providerId = providerId;
            return yield this.create(wallet);
        });
    }
    getOriginWallet() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({
                where: { walletType: types_1.WalletTypes.ORIGIN },
            });
        });
    }
    createOriginWallet(accountId, walletNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = new Wallet_1.Wallet();
            wallet.walletType = types_1.WalletTypes.ORIGIN;
            wallet.accountId = accountId;
            wallet.balance = 0;
            wallet.walletNumber = walletNumber;
            wallet.accountId = accountId;
            return yield this.create(wallet);
        });
    }
    getOrCreateSystemWalletOfProvider(providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            let systemWallet = yield this.getSystemWallet(providerId);
            if (!systemWallet) {
                const systemAccount = yield new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource).getSystemAccount();
                if (!systemAccount)
                    throw new NotFoundError_1.NotFoundError("No system wallet found");
                systemWallet = yield this.createSystemWallet(systemAccount.id, yield (0, adminController_1.generateWalletNumber)(typeorm_1.AppDataSource.getRepository(Wallet_1.Wallet)), providerId);
            }
            return systemWallet;
        });
    }
    getAllAccountWallets(walletId, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield this.getById(walletId);
            if (!wallet)
                throw new NotFoundError_1.NotFoundError("Wallet not found");
            return yield this.repository.find({
                where: {
                    accountId: wallet.accountId,
                },
                relations,
            });
        });
    }
    getAllProviderWallets(providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find({
                where: {
                    providerId,
                    walletType: types_1.WalletTypes.PROVIDER,
                },
            });
        });
    }
}
exports.WalletRepository = WalletRepository;
