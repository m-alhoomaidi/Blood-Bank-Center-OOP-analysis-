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
exports.generateWalletNumber = void 0;
const Account_1 = require("../entities/Account");
const Customer_1 = require("../entities/Customer");
const Provider_1 = require("../entities/Provider");
const Transaction_1 = require("../entities/Transaction");
const Wallet_1 = require("../entities/Wallet");
const BadInputError_1 = require("../errors/BadInputError");
const InternalError_1 = require("../errors/InternalError");
const NotFoundError_1 = require("../errors/NotFoundError");
const typeorm_1 = require("../infrastructure/typeorm");
const config_1 = __importDefault(require("../lib/config"));
const permissions_1 = require("../lib/permissions");
const AccountRepo_1 = require("../repositories/AccountRepo");
const AffiliateRepo_1 = require("../repositories/AffiliateRepo");
const CashierRepository_1 = require("../repositories/CashierRepository");
const CustomerRepository_1 = require("../repositories/CustomerRepository");
const ProviderRepository_1 = require("../repositories/ProviderRepository");
const TransactionRepository_1 = require("../repositories/TransactionRepository");
const WalletRepository_1 = require("../repositories/WalletRepository");
const types_1 = require("../types");
const generateNumber_1 = __importDefault(require("../util/generateNumber"));
const Log_1 = __importDefault(require("../util/Log"));
const customerController_1 = require("./customerController");
class AdminController {
    // should be verified admin first #TODO
    getPendingProviders(_req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const providerRepo = typeorm_1.AppDataSource.getRepository(Provider_1.Provider);
                const providers = yield providerRepo.find({
                    where: {
                        status: types_1.ProviderStatus.PENDING,
                    },
                });
                res.status(200).json(providers);
                next();
            }
            catch (error) {
                Log_1.default.error(error.message);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({
                    code: error.code,
                    error: error.message,
                });
                next();
            }
        });
    }
    approveProvider(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                const provider = yield providerRepo.getById(req.body.providerId, [
                    "account",
                    "account.wallets",
                ]);
                if (!provider)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على المزود");
                if (provider.status === types_1.ProviderStatus.ACTIVE)
                    throw new BadInputError_1.BadInputError("مزود الخدمة مفعل بالفعل");
                provider.status = types_1.ProviderStatus.ACTIVE;
                // provider.account.wallets[0].fees = 2
                yield providerRepo.update(provider);
                res.status(200).json({
                    message: "Provider approved successfully",
                    updatedAt: provider.updatedAt,
                });
                next();
            }
            catch (error) {
                Log_1.default.error(`adminController.approveProvider: ${error.message}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({
                    code: error.code,
                    error: error.message,
                });
                next();
            }
        });
    }
    getAllAccounts(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountRepo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                const accounts = yield accountRepo.getAll();
                res.status(200).json(accounts);
                next();
            }
            catch (error) {
                Log_1.default.error(`adminController.approveProvider: ${error.message}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({
                    code: error.code,
                    error: error.message,
                });
                next();
            }
        });
    }
    listProviders(_req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const providerRepo = AppDataSource.getRepository(Provider)
                const providers = (yield typeorm_1.AppDataSource.createQueryBuilder("provider", "p")
                    .where("p.status = :status AND isSystem = false", {
                    status: types_1.ProviderStatus.ACTIVE,
                })
                    .leftJoinAndSelect("p.account", "acc")
                    .leftJoinAndSelect("acc.wallets", "wallets")
                    .getMany());
                // find system wallets at these providers
                const systemWallets = yield typeorm_1.AppDataSource.createQueryBuilder("wallet", "w")
                    .where("w.walletType = 'SYSTEM' AND w.providerId IN (:...providerIds)", { providerIds: providers.map((p) => p.id) })
                    .leftJoinAndSelect("w.records", "r")
                    .getMany();
                res.status(200).json({
                    providers,
                    systemWallets,
                });
                next();
            }
            catch (error) {
                Log_1.default.error(`adminController.approveProvider: ${error.message}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({
                    code: error.code,
                    error: error.message,
                });
                next();
            }
        });
    }
    generateProviderCredit(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // input: pointType, pointValue, providerId, notes,
                // verification: admin
                // create a wallet for the provider
                // add points to the wallet
                const { providerId, pointType, pointAmount, bonus, fees } = req.body;
                const providerRepo = typeorm_1.AppDataSource.getRepository(Provider_1.Provider);
                const accountRepo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                const provider = yield providerRepo.findOne({
                    where: { id: providerId },
                });
                if (!provider)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على المزود");
                const account = yield accountRepo.getById(provider.accountId, ["wallets"]);
                if (!account)
                    throw new InternalError_1.InternalError("no account for this provider.");
                let walletsOfPointType = account.wallets.filter((w) => w.pointType === pointType);
                let wallet;
                wallet = walletsOfPointType.find((w) => w.bonus === bonus);
                const walletRepo = typeorm_1.AppDataSource.getRepository(Wallet_1.Wallet);
                // no wallet of the same bonus/fees, create a new one from scratch
                if (!wallet || wallet.status === types_1.WalletStatus.INACTIVE) {
                    wallet = new Wallet_1.Wallet();
                    wallet.walletNumber = yield (0, exports.generateWalletNumber)(walletRepo);
                    wallet.pointType = pointType;
                    wallet.walletType = types_1.WalletTypes.PROVIDER;
                    wallet.balance = pointAmount;
                    wallet.accountId = account.id;
                    wallet.bonus = bonus;
                    wallet.providerId = provider.id;
                    wallet.fees = fees;
                    yield walletRepo.save(wallet);
                }
                else {
                    // wallet exists, add points to it
                    // #TODO warn admin that changing fees results in a new wallet.
                    // #TODO changing fees should result in new wallet?
                    if (wallet.fees !== fees) {
                        // fees changed, change them for all other wallest
                        wallet.fees = fees;
                        yield walletRepo.save(wallet);
                    }
                    wallet.balance += pointAmount;
                    yield walletRepo.save(wallet);
                }
                const originWallet = yield new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource).getOriginWallet();
                let trx = new Transaction_1.Transaction();
                trx.status = types_1.TransactionStatus.CONFIRMED;
                trx.transactionType = types_1.TransactionTypes.TRANSFER;
                trx.amount = pointAmount;
                trx.fromWalletId = originWallet.id;
                trx.toWalletId = wallet.id;
                trx.trxNumber = (0, generateNumber_1.default)(9);
                trx = yield new TransactionRepository_1.TransactionRepository(typeorm_1.AppDataSource).create(trx);
                res.status(200).json(trx);
                next();
            }
            catch (error) {
                Log_1.default.error(`adminController.generateProviderCredit: ${error.message}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({
                    error: error.message,
                    code: error.code,
                });
                next();
            }
        });
    }
    getProviderById(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const providerRepo = AppDataSource.getRepository(Provider)
                const providerId = Number(req.params.providerId);
                const query = yield typeorm_1.AppDataSource.getRepository(Provider_1.Provider)
                    .createQueryBuilder("p")
                    .where("p.id = :providerId", { providerId })
                    .leftJoinAndSelect("p.account", "acc")
                    .leftJoinAndSelect("acc.wallets", "wallets")
                    .leftJoinAndSelect("p.cashiers", "cashiers")
                    .getOne();
                const totalPoints = yield typeorm_1.AppDataSource.getRepository(Wallet_1.Wallet)
                    .createQueryBuilder("w")
                    .where("w.providerId = :providerId", { providerId })
                    .leftJoinAndSelect("w.records", "r")
                    .getMany();
                // console.lo
                // const providers = providerRepo.findAndCount({
                // relations: ["account", "account.wallets"],
                // })
                // const accounts = await accountRepo.getAll()
                res.status(200).json({
                    provider: query,
                    totalPoints: Number(totalPoints.reduce((tot, cur) => tot + cur.balance, 0).toFixed(2)),
                });
                next();
            }
            catch (error) {
                Log_1.default.error(`adminController.getProviderById: ${error.message}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({
                    code: error.code,
                    error: error.message,
                });
                next();
            }
        });
    }
    editProvider(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const provider = req.body;
                const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                res.status(200).json(yield providerRepo.update(provider));
                next();
            }
            catch (error) {
                Log_1.default.error(`adminController.editProvider: ${error.message}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({
                    code: error.code,
                    error: error.message,
                });
                next();
            }
        });
    }
    editCustomer(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = req.body;
                const customerRepo = new CustomerRepository_1.CustomerRepository(typeorm_1.AppDataSource);
                res.status(200).json(yield customerRepo.update(customer));
                next();
            }
            catch (error) {
                Log_1.default.error(`adminController.editCustomer: ${error.message}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({
                    code: error.code,
                    error: error.message,
                });
                next();
            }
        });
    }
    customerList(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerRepo = new CustomerRepository_1.CustomerRepository(typeorm_1.AppDataSource);
                const customers = yield customerRepo.getAll([
                    "account",
                    "account.wallets",
                ]);
                res.status(200).json(customers);
            }
            catch (error) {
                Log_1.default.error(`adminController.customerList: ${error.message}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({
                    code: error.code,
                    error: error.message,
                });
                next();
            }
        });
    }
    getAdminInformation(req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallets = yield typeorm_1.AppDataSource.getRepository(Wallet_1.Wallet)
                    .createQueryBuilder("w")
                    .where("w.walletType IN(:...types)", {
                    types: [types_1.WalletTypes.SYSTEM, types_1.WalletTypes.ORIGIN],
                })
                    .leftJoinAndSelect("w.records", "r")
                    .getMany();
                // trx
                const trxs = wallets.length
                    ? yield typeorm_1.AppDataSource.getRepository(Transaction_1.Transaction)
                        .createQueryBuilder("trx")
                        .where("trx.fromWalletId IN(:...ids) OR trx.toWalletId IN(:...ids)", {
                        ids: (_a = wallets.map((w) => w.id)) !== null && _a !== void 0 ? _a : [0],
                    })
                        .innerJoinAndSelect("trx.fromWallet", "fromWallet")
                        .innerJoinAndSelect("trx.toWallet", "toWallet")
                        .orderBy("trx.createdAt", "DESC")
                        .take(10)
                        .getMany()
                    : [];
                const arr = [];
                const accountRepo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                for (const trx of trxs) {
                    //id of the other person
                    const senderId = trx.fromWallet.accountId;
                    const sender = yield accountRepo.getById(senderId);
                    if (!sender)
                        continue;
                    let senderName = "";
                    switch (sender.type) {
                        case types_1.UserTypes.CUSTOMER:
                            const cst = yield typeorm_1.AppDataSource.getRepository(Customer_1.Customer).findOne({
                                where: {
                                    accountId: senderId,
                                },
                                select: ["firstName", "lastName"],
                            });
                            if (!cst)
                                continue;
                            senderName = cst.firstName + " " + cst.lastName;
                            break;
                        case types_1.UserTypes.PROVIDER:
                            const prv = yield typeorm_1.AppDataSource.getRepository(Provider_1.Provider).findOne({
                                where: { accountId: senderId },
                                select: ["businessName"],
                            });
                            senderName = (_b = prv === null || prv === void 0 ? void 0 : prv.businessName) !== null && _b !== void 0 ? _b : "";
                            break;
                        default:
                            senderName = "SYSTEM";
                            break;
                    }
                    if (!senderName)
                        continue;
                    //id of the other person
                    const recieverId = trx.toWallet.accountId;
                    const reciever = yield accountRepo.getById(recieverId);
                    if (!reciever)
                        continue;
                    let reciverName = "";
                    switch (reciever.type) {
                        case types_1.UserTypes.CUSTOMER:
                            const cst = yield typeorm_1.AppDataSource.getRepository(Customer_1.Customer).findOne({
                                where: {
                                    accountId: recieverId,
                                },
                                select: ["firstName", "lastName"],
                            });
                            if (!cst)
                                continue;
                            reciverName = cst.firstName + " " + cst.lastName;
                            break;
                        case types_1.UserTypes.PROVIDER:
                            const prv = yield typeorm_1.AppDataSource.getRepository(Provider_1.Provider).findOne({
                                where: { accountId: recieverId },
                                select: ["businessName"],
                            });
                            reciverName = (_c = prv === null || prv === void 0 ? void 0 : prv.businessName) !== null && _c !== void 0 ? _c : "";
                            break;
                        default:
                            reciverName = "SYSTEM";
                            break;
                    }
                    if (!reciverName)
                        continue;
                    arr.push({
                        trxNumber: trx.trxNumber,
                        trxDate: trx.createdAt,
                        amount: trx.amount,
                        pointType: trx.pointType,
                        status: trx.status,
                        transactionType: trx.transactionType,
                        senderName,
                        reciverName,
                    });
                }
                // get other data
                const providers = yield new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource).getAll();
                const customerCount = yield new CustomerRepository_1.CustomerRepository(typeorm_1.AppDataSource).customerCount();
                const trxRepo = new TransactionRepository_1.TransactionRepository(typeorm_1.AppDataSource);
                const trxCount = yield trxRepo.trxCountTotal();
                const trxCountToday = yield trxRepo.trxCountToday();
                res.status(200).json({
                    wallets,
                    trxCountToday,
                    trxCount,
                    customerCount,
                    providerCount: providers.filter((p) => p.status === types_1.ProviderStatus.ACTIVE).length,
                    applicantCount: providers.filter((p) => p.status === types_1.ProviderStatus.PENDING).length,
                    trxs: arr,
                });
                next();
            }
            catch (error) {
                Log_1.default.error(`adminController.getAdminInformation: ${error.message}`);
                res.status((_d = error.statusCode) !== null && _d !== void 0 ? _d : 500).json({
                    code: error.code,
                    error: error.message,
                });
                next();
            }
        });
    }
    getCustomerById(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const providerRepo = AppDataSource.getRepository(Provider)
                const customerId = Number(req.params.cid);
                const customerRepo = new CustomerRepository_1.CustomerRepository(typeorm_1.AppDataSource);
                const customer = yield customerRepo.getById(customerId, [
                    "account",
                    "account.wallets",
                    "account.wallets.provider",
                ]);
                if (!customer || !customer.account)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على العميل");
                const trxs = customer.account.wallets.length
                    ? yield typeorm_1.AppDataSource.getRepository(Transaction_1.Transaction)
                        .createQueryBuilder("trx")
                        .where("trx.fromWalletId IN(:...ids) OR trx.toWalletId IN(:...ids)", {
                        ids: customer.account.wallets.map((w) => w.id),
                    })
                        .orderBy("trx.createdAt", "DESC")
                        .take(5)
                        .getMany()
                    : [];
                res.status(200).json({ customer, trxs });
                next();
            }
            catch (error) {
                Log_1.default.error(`adminController.getCustomerById: ${error.message}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({
                    code: error.code,
                    error: error.message,
                });
                next();
            }
        });
    }
    consume(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount, providerId } = req.body;
                const walletRepo = new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource);
                const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                const fromWallet = yield walletRepo.getSystemWallet(providerId);
                if (!fromWallet)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على المرسل!");
                if (fromWallet.balance < amount)
                    throw new BadInputError_1.BadInputError("ليس لديك رصيدٌ كافٍ لإتمام هذه العملية");
                const provider = yield providerRepo.getById(providerId, [
                    "account",
                    "account.wallets",
                ]);
                if (!(provider === null || provider === void 0 ? void 0 : provider.account.wallets))
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على مزود الخدمة !");
                (0, permissions_1.denyProviderInactive)(provider);
                // do the thing
                // Logic for consuming points.
                let transactions = [];
                yield typeorm_1.AppDataSource.manager.transaction((em) => __awaiter(this, void 0, void 0, function* () {
                    const recs = fromWallet.records;
                    let total = 0;
                    let i = 0;
                    while (true) {
                        const rec = recs[i];
                        i++;
                        if (!rec.amount)
                            continue; // don't bother with empty recs
                        if (rec.amount < amount - total) {
                            const amt = rec.amount;
                            total += amt;
                            rec.amount = 0;
                            const recieveWallet = yield em.findOne(Wallet_1.Wallet, {
                                where: {
                                    id: rec.originWalletId,
                                },
                            });
                            if (!recieveWallet)
                                continue;
                            recieveWallet.balance += amt;
                            fromWallet.totalConsume += amt;
                            yield em.save(recieveWallet);
                            yield em.save(fromWallet);
                            let trx = new Transaction_1.Transaction();
                            trx.amount = amt;
                            trx.transactionType = types_1.TransactionTypes.PURCHASE;
                            trx.fromWalletId = rec.targetWalletId;
                            trx.toWalletId = rec.originWalletId;
                            trx.status = types_1.TransactionStatus.CONFIRMED;
                            trx.trxNumber = (0, generateNumber_1.default)(9);
                            trx = yield em.save(trx);
                            transactions.push(trx);
                        }
                        else {
                            const recieveWallet = yield em.findOne(Wallet_1.Wallet, {
                                where: { id: rec.originWalletId },
                            });
                            if (!recieveWallet)
                                continue;
                            const amt = amount - total;
                            rec.amount -= amt;
                            total += amt;
                            recieveWallet.balance += amt;
                            fromWallet.totalConsume += amt;
                            yield em.save(fromWallet);
                            yield em.save(recieveWallet);
                            let trx = new Transaction_1.Transaction();
                            trx.amount = amt;
                            trx.transactionType = types_1.TransactionTypes.PURCHASE;
                            trx.fromWalletId = rec.targetWalletId;
                            trx.toWalletId = rec.originWalletId;
                            trx.status = types_1.TransactionStatus.CONFIRMED;
                            trx.trxNumber = (0, generateNumber_1.default)(9);
                            trx = yield em.save(trx);
                            transactions.push(trx);
                        }
                        yield em.save(rec);
                        if (total >= amount)
                            break;
                    }
                }));
                res.status(200).json(transactions);
                next();
            }
            catch (err) {
                Log_1.default.error(`adminController.consume: ${err.message}`);
                res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).send(err.message);
            }
        });
    }
    createAffiliate(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = new AffiliateRepo_1.AffiliateRepository(typeorm_1.AppDataSource);
                const affiliate = yield repo.create(req.body);
                res.status(200).json(affiliate);
                next();
            }
            catch (err) {
                Log_1.default.error(`adminController.createAffiliate: ${err.message}`);
                res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).send(err.message);
            }
        });
    }
    listAffiliates(_req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = new AffiliateRepo_1.AffiliateRepository(typeorm_1.AppDataSource);
                const affiliate = yield repo.getAll();
                res.status(200).json(affiliate);
                next();
            }
            catch (err) {
                Log_1.default.error(`adminController.listAffiliates: ${err.message}`);
                res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).send(err.message);
            }
        });
    }
    updateAffiliate(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = new AffiliateRepo_1.AffiliateRepository(typeorm_1.AppDataSource);
                const affiliate = yield repo.update(req.body);
                res.status(200).json(affiliate);
                next();
            }
            catch (err) {
                Log_1.default.error(`adminController.listAffiliates: ${err.message}`);
                res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).send(err.message);
            }
        });
    }
    getSystemWalletList(_req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const walletRepo = new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource);
                const wallets = yield walletRepo.getSystemWallets(["provider"]);
                res.status(200).json(wallets);
                next();
            }
            catch (err) {
                Log_1.default.error(`adminController.getSystemWalletList: ${err.message}`);
                res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).send(err.message);
            }
        });
    }
    createProviderCashier(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, phoneNumber, username, password } = req.body;
                const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                const accountRepo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                const cahsierRepo = new CashierRepository_1.CashierRepository(typeorm_1.AppDataSource);
                const provider = yield providerRepo.getById(Number(req.params.providerId));
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
                Log_1.default.error(`adminController.createProviderCashier ${error.message}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({
                    error: error.message,
                    code: error.code,
                });
                next();
            }
        });
    }
    mapRecordsToBonuses(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { providerId } = req.body;
                const repo = new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource);
                const wallet = yield repo.getByAccountIdAndProviderId(Number(req.user.userId), providerId);
                const ids = wallet.records.map((r) => r.originWalletId);
                const bonuses = (yield typeorm_1.AppDataSource.createQueryBuilder("wallet", "w")
                    .where("id IN (:...ids)", {
                    ids,
                })
                    .getMany());
                const response = wallet.records.map((r) => {
                    var _a;
                    return {
                        amount: r.amount,
                        bonus: (_a = bonuses.find((b) => b.id === r.originWalletId)) === null || _a === void 0 ? void 0 : _a.bonus,
                    };
                });
                res.status(200).json(response);
                next();
            }
            catch (err) {
                Log_1.default.error(`adminController.mapRecordsToBonuses: ${err.message}`);
                res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).send(err.message);
            }
        });
    }
    deactivateWallet(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { walletId } = req.body;
                const walletRepo = new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource);
                const wallet = yield walletRepo.getById(walletId);
                if (!wallet)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على المحفظة");
                wallet.status = types_1.WalletStatus.INACTIVE;
                // get all transactions related to this wallet
                res.status(200).json({
                    wallet: yield walletRepo.update(wallet),
                });
                next();
            }
            catch (err) {
                Log_1.default.error(`adminController.deactivateWallet: ${err.message}`);
                res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).send(err.message);
            }
        });
    }
    activateWallet(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { walletId } = req.body;
                const walletRepo = new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource);
                const wallet = yield walletRepo.getById(walletId);
                if (!wallet)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على المحفظة");
                wallet.status = types_1.WalletStatus.ACTIVE;
                if (wallet.walletType === types_1.WalletTypes.PROVIDER && wallet.providerId) {
                    const wallets = yield walletRepo.getAllProviderWallets(wallet.providerId);
                    // MERGE WALLETS #todo
                    const walletsWithSameBonus = wallets.filter((w) => w.bonus === wallet.bonus && wallet.status === types_1.WalletStatus.ACTIVE);
                    // wallet.walletType
                }
                // get all transactions related to this wallet
                res.status(200).json({
                    wallet: yield walletRepo.update(wallet),
                });
                next();
            }
            catch (err) {
                Log_1.default.error(`adminController.deactivateWallet: ${err.message}`);
                res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).send(err.message);
            }
        });
    }
    deleteAccount(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { accountId, type } = req.body;
                const accountRepo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                const account = yield accountRepo.getById(accountId, [
                    "wallets",
                    "wallets.records",
                    "wallets.incomingTransactions",
                    "wallets.outgoingTransactions",
                ]);
                if (!account)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على الحساب");
                if (account.wallets.length) {
                    // has points / trx / etc.., isable his account and all his wallest
                    // step 1: deactivate all the wallets
                    for (const w of account.wallets) {
                        w.status = types_1.WalletStatus.INACTIVE;
                        yield typeorm_1.AppDataSource.manager.save(w);
                    }
                    // step 2: deactivate the account itself
                    switch (account.type) {
                        default:
                        case types_1.UserTypes.CUSTOMER:
                            const repo = new CustomerRepository_1.CustomerRepository(typeorm_1.AppDataSource);
                            const customer = yield repo.getByAccountId(accountId);
                            if (!customer)
                                throw new NotFoundError_1.NotFoundError("لم يتم العثور على المستهلك");
                            customer.status = types_1.CustomerStatus.BANNED;
                            yield repo.update(customer);
                            break;
                        case types_1.UserTypes.PROVIDER:
                            const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                            const provider = yield providerRepo.getByAccountId(accountId);
                            if (!provider)
                                throw new NotFoundError_1.NotFoundError("لم يتم العثور على المزود");
                            provider.status = types_1.ProviderStatus.BANNED;
                            yield providerRepo.update(provider);
                            break;
                    }
                    res.status(200).json("تم تعطيل الحساب");
                    return next();
                }
                // no points / trx / etc.., just delete the account
                switch (account.type) {
                    default:
                    case types_1.UserTypes.CUSTOMER:
                        const repo = new CustomerRepository_1.CustomerRepository(typeorm_1.AppDataSource);
                        const customer = yield repo.getByAccountId(accountId);
                        if (!customer)
                            throw new NotFoundError_1.NotFoundError("لم يتم العثور على المستهلك");
                        yield repo.delete(customer.id);
                        break;
                    case types_1.UserTypes.PROVIDER:
                        const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                        const provider = yield providerRepo.getByAccountId(accountId);
                        if (!provider)
                            throw new NotFoundError_1.NotFoundError("لم يتم العثور على المزود");
                        yield providerRepo.delete(provider.id);
                        break;
                }
                res.status(200).json("تم حذف الحساب");
            }
            catch (err) {
                Log_1.default.error(`adminController.deleteAccount: ${err.message}`);
                res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).send(err.message);
            }
        });
    }
    editWallet(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bonus, fees, walletId } = req.body;
                const repo = new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource);
                const wallet = yield repo.getById(walletId);
                if (!wallet)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على المحفظة");
                if (bonus)
                    wallet.bonus = bonus;
                if (fees)
                    wallet.fees = fees;
                yield repo.update(wallet);
                res.status(200).json(wallet);
                next();
            }
            catch (err) {
                Log_1.default.error(`adminController.editWallet: ${err.message}`);
                res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).send(err.message);
            }
        });
    }
    resetUserPassword(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, accountId } = req.body;
                const repo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                const account = yield repo.getById(accountId);
                if (!account)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على الحسابd");
                account.password = password;
                yield repo.update(account);
                res.status(200).json("تم تغيير كلمة المرور");
                next();
            }
            catch (err) {
                Log_1.default.error(`adminController.resetUserPassword: ${err.message}`);
                res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).send(err.message);
            }
        });
    }
}
exports.default = AdminController;
const generateWalletNumber = (walletRepo) => __awaiter(void 0, void 0, void 0, function* () {
    const number = (0, generateNumber_1.default)(config_1.default.walletNumberLength);
    const wallet = yield walletRepo.findOne({
        where: { walletNumber: number },
    });
    if (wallet)
        return (0, exports.generateWalletNumber)(walletRepo);
    return number;
});
exports.generateWalletNumber = generateWalletNumber;