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
exports.ProviderController = void 0;
const Account_1 = require("../entities/Account");
const Affiliate_1 = require("../entities/Affiliate");
const Customer_1 = require("../entities/Customer");
const Provider_1 = require("../entities/Provider");
const NotFoundError_1 = require("../errors/NotFoundError");
const typeorm_1 = require("../infrastructure/typeorm");
const AccountRepo_1 = require("../repositories/AccountRepo");
const AffiliateRepo_1 = require("../repositories/AffiliateRepo");
const CashierRepository_1 = require("../repositories/CashierRepository");
const ProviderRepository_1 = require("../repositories/ProviderRepository");
const ReviewRepository_1 = require("../repositories/ReviewRepository");
const WalletRepository_1 = require("../repositories/WalletRepository");
const types_1 = require("../types");
const Log_1 = __importDefault(require("../util/Log"));
const customerController_1 = require("./customerController");
class ProviderController {
    registerNewProvider(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const provider = yield typeorm_1.AppDataSource.manager.transaction((em) => __awaiter(this, void 0, void 0, function* () {
                    const p = new Provider_1.Provider();
                    Object.assign(p, req.body);
                    // create account for provider
                    if (req.body.affiliateCode) {
                        const affiliate = yield em.findOne(Affiliate_1.Affiliate, {
                            where: { code: req.body.affiliateCode },
                        });
                        if (affiliate && affiliate.status === "ACTIVE")
                            p.affiliate = affiliate;
                    }
                    const account = new Account_1.Account();
                    account.username = req.body.username;
                    account.password = req.body.password;
                    account.accountNumber = yield (0, customerController_1.generateAccountNumber)(new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource));
                    account.type = types_1.UserTypes.PROVIDER;
                    yield em.save(account);
                    p.accountId = account.id;
                    p.account = account;
                    return yield em.save(p);
                }));
                res.status(201).json({
                    message: "Provider created successfully",
                    createdAt: provider.createdAt,
                    provider,
                    accountNumber: provider.account.accountNumber,
                });
                return next();
            }
            catch (error) {
                Log_1.default.error(`ProviderController.registerNewProvider ${error.message}`);
                if (error.code === "ER_DUP_ENTRY") {
                    return res
                        .status(400)
                        .json({ message: "اسم الحساب أو البريد الإلكتروني مستعمل بالفعل." });
                }
                res
                    .status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500)
                    .json({ error: error.message, code: error.code });
                next();
            }
        });
    }
    getActiveProviders(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const providerRepo = typeorm_1.AppDataSource.getRepository(Provider_1.Provider);
                const providers = yield providerRepo.find({
                    where: { status: types_1.ProviderStatus.ACTIVE, isSystem: false },
                    relations: ["wallets", "businessCategory"],
                });
                const response = providers.map(({ businessName, businessAddress, businessEmail, businessPhoneNumber, countryCode, businessCategory, wallets, }) => {
                    var _a;
                    return {
                        businessName,
                        businessPhoneNumber,
                        businessEmail,
                        businessAddress,
                        countryCode,
                        category: (_a = businessCategory === null || businessCategory === void 0 ? void 0 : businessCategory.nameAr) !== null && _a !== void 0 ? _a : "",
                        customerCount: wallets.filter((w) => w.walletType === types_1.WalletTypes.CUSTOMER).length,
                        bonuses: wallets
                            .filter((w) => w.walletType === types_1.WalletTypes.PROVIDER)
                            .map((w) => w.bonus),
                    };
                });
                res.status(200).json(response);
                next();
            }
            catch (error) {
                Log_1.default.error(`ProviderController.getActiveProviders ${error.message}`);
                res
                    .status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500)
                    .json({ error: error.message, code: error.code });
                next();
            }
        });
    }
    updateCashierStatus(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cashierId, status } = req.body;
                const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                const cahsierRepo = new CashierRepository_1.CashierRepository(typeorm_1.AppDataSource);
                const provider = yield providerRepo.getByAccountId(Number(req.user.userId));
                if (!provider)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على مزود الخدمة");
                const cashier = yield cahsierRepo.getById(cashierId);
                if (!cashier)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على المصروف");
                cashier.status = status;
                yield cahsierRepo.update(cashier);
                res.status(200).json({ message: "تم تعطيل المصروف بنجاح" });
                next();
            }
            catch (error) {
                Log_1.default.error(`ProviderController.addCashier ${error.message}`);
                res
                    .status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500)
                    .json({ error: error.message, code: error.code });
                next();
            }
        });
    }
    addCashier(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, phoneNumber, username, password } = req.body;
                const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                const accountRepo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                const cahsierRepo = new CashierRepository_1.CashierRepository(typeorm_1.AppDataSource);
                const provider = yield providerRepo.getByAccountId(Number(req.user.userId));
                if (!provider)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على مزود الخدمة");
                let account = new Account_1.Account();
                account.username = username;
                account.password = password;
                account.accountNumber = yield (0, customerController_1.generateAccountNumber)(accountRepo);
                account.type = types_1.UserTypes.CASHIER;
                account = yield accountRepo.create(account);
                const cashier = yield cahsierRepo.create({
                    name,
                    phoneNumber,
                    accountId: account.id,
                    providerId: provider.id,
                });
                res.status(200).json({
                    cashier,
                });
                next();
            }
            catch (error) {
                Log_1.default.error(`ProviderController.addCashier ${error.message}`);
                res
                    .status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500)
                    .json({ error: error.message, code: error.code });
                next();
            }
        });
    }
    getCashierList(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cashierRepo = new CashierRepository_1.CashierRepository(typeorm_1.AppDataSource);
                const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                const provider = yield providerRepo.getByAccountId(Number(req.user.userId));
                if (!provider)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على مزود الخدمة");
                const cashiers = yield cashierRepo.getAllByProviderId(provider.id);
                res.status(200).json(cashiers);
                next();
            }
            catch (error) {
                Log_1.default.error(`ProviderController.getCashierList ${error.message}`);
                res
                    .status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500)
                    .json({ error: error.message, code: error.code });
                next();
            }
        });
    }
    getCashierByProviderId(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cashierRepo = new CashierRepository_1.CashierRepository(typeorm_1.AppDataSource);
                const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                const cashiers = yield cashierRepo.getAllByProviderId(Number(req.params.providerId));
                res.status(200).json(cashiers);
                next();
            }
            catch (error) {
                Log_1.default.error(`ProviderController.getCashierByProviderId ${error.message}`);
                res
                    .status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500)
                    .json({ error: error.message, code: error.code });
                next();
            }
        });
    }
    getCustomerList(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                const provider = yield providerRepo.getByAccountId(Number(req.user.userId));
                if (!provider)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على مزود الخدمة");
                const accounts = yield typeorm_1.AppDataSource.getRepository(Account_1.Account)
                    .createQueryBuilder("a")
                    .leftJoinAndSelect("a.wallets", "w")
                    .leftJoinAndSelect("w.records", "r")
                    .where("w.providerId = :providerId AND w.walletType = :walletType", {
                    providerId: provider.id,
                    walletType: types_1.WalletTypes.CUSTOMER,
                })
                    .select(["a.id", "a.accountNumber", "r.amount", "w.totalConsume"])
                    .getMany();
                if (!accounts.length)
                    return res.status(200).json([]);
                const customers = yield typeorm_1.AppDataSource.getRepository(Customer_1.Customer)
                    .createQueryBuilder("c")
                    .leftJoinAndSelect("c.account", "a")
                    .where("c.accountId IN (:...accounts)", {
                    accounts: accounts.map((a) => a.id),
                })
                    .select([
                    "c.id",
                    "c.firstName",
                    "c.lastName",
                    "c.phoneNumber",
                    "c.accountId",
                ])
                    .getMany();
                res.status(200).json(customers.map((c) => {
                    const acc = accounts.find((a) => a.id === c.accountId);
                    if (!acc)
                        return c;
                    const { balance, totalConsume } = acc.wallets[0];
                    return Object.assign(Object.assign({}, c), { balance,
                        totalConsume, accountNumber: acc.accountNumber });
                }));
            }
            catch (error) {
                Log_1.default.error(`ProviderController.getCustomerList ${error.message}`);
                res
                    .status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500)
                    .json({ error: error.message, code: error.code });
                next();
            }
        });
    }
    getAffiliate(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = new AffiliateRepo_1.AffiliateRepository(typeorm_1.AppDataSource);
                const affiliate = yield repo.getAffiliateByCode(req.params.affiliateCode);
                if (!affiliate)
                    throw new NotFoundError_1.NotFoundError("كود المسوق غير صحيح !");
                res.status(200).json(affiliate);
            }
            catch (error) {
                Log_1.default.error(`ProviderController.getAffiliate ${error.message}`);
                res
                    .status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500)
                    .json({ error: error.message, code: error.code });
                next();
            }
        });
    }
    getProviderInfo(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                const walletRepo = new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource);
                const provider = yield providerRepo.getByAccountId(Number(req.user.userId), ["account", "account.wallets"]);
                if (!provider)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على مزود الخدمة");
                const wallets = yield walletRepo.getCustomerWalletsByProviderId(provider.id);
                res.status(200).json({
                    accountNumber: provider.account.accountNumber,
                    customerCount: wallets.length,
                    totalSold: provider.account.wallets
                        .filter((w) => w.walletType === types_1.WalletTypes.PROVIDER)
                        .reduce((acc, curr) => acc + curr.totalSold, 0),
                    totalCustomerCredit: wallets.reduce((total, curr) => total + curr.balance, 0),
                    currentBalance: provider.account.wallets.reduce((total, curr) => total + curr.balance, 0),
                });
                next();
            }
            catch (error) {
                Log_1.default.error(`ProviderController.getProviderInfo ${error.message}`);
                res
                    .status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500)
                    .json({ error: error.message, code: error.code });
                next();
            }
        });
    }
    rateProvider(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                const { customerId } = req.user;
                const { providerId, comment, rating } = req.body;
                if (!customerId)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على حساب العميل");
                const provider = yield providerRepo.getById(providerId);
                if (!provider)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على مزود الخدمة");
                const repo = new ReviewRepository_1.ReviewRepository(typeorm_1.AppDataSource);
                const review = yield repo.rate(providerId, Number(customerId), rating, comment);
                if (review)
                    res.status(201).json(review);
                else
                    res.status(400).json("لقد قمت بتقييم مزود الخدمة هذا بالفعل.");
                next();
            }
            catch (error) {
                Log_1.default.error(`ProviderController.rateProvider ${error.message}`);
                res
                    .status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500)
                    .json({ error: error.message, code: error.code });
                next();
            }
        });
    }
}
exports.ProviderController = ProviderController;
