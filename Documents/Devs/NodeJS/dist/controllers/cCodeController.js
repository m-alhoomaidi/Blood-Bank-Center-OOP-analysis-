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
const Customer_1 = require("../entities/Customer");
const BadInputError_1 = require("../errors/BadInputError");
const NotAllowedError_1 = require("../errors/NotAllowedError");
const NotFoundError_1 = require("../errors/NotFoundError");
const typeorm_1 = require("../infrastructure/typeorm");
const config_1 = __importDefault(require("../lib/config"));
const permissions_1 = require("../lib/permissions");
const AccountRepo_1 = require("../repositories/AccountRepo");
const ConsumptionCodeRepository_1 = require("../repositories/ConsumptionCodeRepository");
const ProviderRepository_1 = require("../repositories/ProviderRepository");
const WalletRepository_1 = require("../repositories/WalletRepository");
const types_1 = require("../types");
const Log_1 = __importDefault(require("../util/Log"));
const transactionController_1 = require("./transactionController");
class ConsumptionCodeController {
    checkCode(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user.providerId)
                    throw new NotAllowedError_1.NotAllowedError("لا يمكنك القيام بهذه العملية");
                const { code, accountNumber } = req.params;
                const CcodeRepo = new ConsumptionCodeRepository_1.ConsumptionCodeRepository(typeorm_1.AppDataSource);
                const ccode = yield CcodeRepo.getCode(Number(code), Number(accountNumber));
                if (!ccode)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على الكود");
                switch (ccode.status) {
                    case types_1.ConsumptionCodeStatus.EXPIRED:
                        throw new BadInputError_1.BadInputError("الكود منتهي الصلاحية");
                    case types_1.ConsumptionCodeStatus.USED:
                        throw new BadInputError_1.BadInputError("الكود مستخدم من قبل");
                    case types_1.ConsumptionCodeStatus.PENDING:
                        const date = ccode.createdAt;
                        if (date.getTime() + config_1.default.cCodeExpirationHours * 2 * 60 * 60 * 1000 <
                            Date.now()) {
                            ccode.status = types_1.ConsumptionCodeStatus.EXPIRED;
                            yield CcodeRepo.update(ccode);
                            throw new BadInputError_1.BadInputError("الكود منتهي الصلاحية");
                        }
                        // get code user
                        const user = yield new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource).getByAccountNumber(ccode.accountNumber);
                        if (!user)
                            throw new NotFoundError_1.NotFoundError("لم يتم العثور على الحساب");
                        console.log(user);
                        const customer = yield typeorm_1.AppDataSource.getRepository(Customer_1.Customer)
                            .createQueryBuilder("c")
                            .where("c.accountId = :accountId", {
                            accountId: user.id,
                        })
                            .getOne();
                        if (!customer)
                            throw new NotFoundError_1.NotFoundError("لم يتم العثور على العميل");
                        res.status(200).json(Object.assign(Object.assign({}, ccode), { firstName: customer.firstName, lastName: customer.lastName }));
                        break;
                }
                next();
            }
            catch (error) {
                Log_1.default.error(`ProviderController.checkCode ${error.message}`);
                res
                    .status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500)
                    .json({ error: error.message, code: error.code });
                next();
            }
        });
    }
    consumeCode(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user.providerId)
                    throw new NotAllowedError_1.NotAllowedError("لا يمكنك القيام بهذه العملية");
                const { amount, code, accountNumber } = req.body;
                const CcodeRepo = new ConsumptionCodeRepository_1.ConsumptionCodeRepository(typeorm_1.AppDataSource);
                const walletRepo = new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource);
                const accountRepo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                const ccode = yield CcodeRepo.getCode(Number(code), Number(accountNumber));
                const acc = yield accountRepo.getByAccountNumber(accountNumber, [
                    "wallets",
                ]);
                if (!acc)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على الحساب");
                if (!ccode)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على الكود");
                switch (ccode.status) {
                    case types_1.ConsumptionCodeStatus.EXPIRED:
                        throw new BadInputError_1.BadInputError("الكود منتهي الصلاحية");
                    case types_1.ConsumptionCodeStatus.USED:
                        throw new BadInputError_1.BadInputError("الكود مستخدم من قبل");
                    case types_1.ConsumptionCodeStatus.PENDING:
                        const date = ccode.createdAt;
                        if (date.getTime() + config_1.default.cCodeExpirationHours * 60 * 60 * 1000 <
                            Date.now()) {
                            ccode.status = types_1.ConsumptionCodeStatus.EXPIRED;
                            yield CcodeRepo.update(ccode);
                            throw new BadInputError_1.BadInputError("الكود منتهي الصلاحية");
                        }
                        if (ccode.amount < amount)
                            throw new BadInputError_1.BadInputError("الكود لا يسمح بهذا المبلغ");
                        // all clear, consume code
                        const wallet = acc.wallets.find((w) => w.providerId === ccode.providerId);
                        if (!wallet)
                            throw new NotFoundError_1.NotFoundError("لم يتم العثور على المحفظة");
                        if (wallet.balance < amount)
                            throw new BadInputError_1.BadInputError("لا يوجد في المحفظة رصيد كافي");
                        const toWallet = yield walletRepo.getByAccountIdAndProviderId(Number(req.user.userId), ccode.providerId);
                        const trx = yield (0, transactionController_1.makeTransaction)(wallet, toWallet, types_1.TransactionTypes.PURCHASE, amount, 0);
                        ccode.amount -= amount;
                        if (ccode.amount <= 0)
                            ccode.status = types_1.ConsumptionCodeStatus.USED;
                        yield CcodeRepo.update(ccode);
                        res.status(200).json(trx);
                        break;
                }
            }
            catch (error) {
                Log_1.default.error(`ProviderController.consumeCode ${error.message}`);
                res
                    .status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500)
                    .json({ error: error.message, code: error.code });
                next();
            }
        });
    }
    generateConsumeCode(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount, walletId } = req.body;
                if (!req.user.customerId)
                    throw new NotAllowedError_1.NotAllowedError("لايمكنك القيام بهذه العملية.");
                const walletRepo = new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource);
                const accountRepo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                const CcodeRepo = new ConsumptionCodeRepository_1.ConsumptionCodeRepository(typeorm_1.AppDataSource);
                const wallet = yield walletRepo.getById(walletId);
                if (!wallet)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على المرسل!");
                (0, permissions_1.denyWalletNotOwnerOrCustomer)(req.user.userId, wallet);
                if (wallet.balance < amount)
                    throw new BadInputError_1.BadInputError("ليس لديك رصيدٌ كافٍ لإتمام هذه العملية");
                if (!wallet.providerId)
                    throw new NotAllowedError_1.NotAllowedError("لا يمكنك استخدام هذه المحفظة");
                const provider = yield providerRepo.getById(wallet.providerId);
                if (!provider)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على مزود الخدمة !");
                (0, permissions_1.denyProviderInactive)(provider);
                const account = yield accountRepo.getById(Number(req.user.userId));
                if (!account)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على الحساب!");
                // do the thing
                const code = yield CcodeRepo.generateCcode(amount, account.accountNumber, provider.id);
                res.status(200).json(Object.assign(Object.assign({}, code), { accountNumber: account.accountNumber }));
                next();
            }
            catch (err) {
                Log_1.default.error(`trxController.generateConsumeCode: ${err.message}`);
                res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).send(err.message);
            }
        });
    }
}
exports.default = ConsumptionCodeController;
