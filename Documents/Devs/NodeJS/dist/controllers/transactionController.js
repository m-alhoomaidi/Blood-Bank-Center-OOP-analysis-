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
exports.transferGiftingPoints = exports.makeTransaction = exports.TransactionController = void 0;
const Customer_1 = require("../entities/Customer");
const Provider_1 = require("../entities/Provider");
const Wallet_1 = require("../entities/Wallet");
const Transaction_1 = require("../entities/Transaction");
const BadInputError_1 = require("../errors/BadInputError");
const InternalError_1 = require("../errors/InternalError");
const NotAllowedError_1 = require("../errors/NotAllowedError");
const NotFoundError_1 = require("../errors/NotFoundError");
const typeorm_1 = require("../infrastructure/typeorm");
const types_1 = require("../types");
const Log_1 = __importDefault(require("../util/Log"));
const generateNumber_1 = __importDefault(require("../util/generateNumber"));
const WalletRepository_1 = require("../repositories/WalletRepository");
const typeorm_2 = require("typeorm");
const permissions_1 = require("../lib/permissions");
const AccountRepo_1 = require("../repositories/AccountRepo");
const adminController_1 = require("./adminController");
const ProviderRepository_1 = require("../repositories/ProviderRepository");
const CustomerPointsRecord_1 = require("../entities/CustomerPointsRecord");
const PointRecordRepository_1 = require("../repositories/PointRecordRepository");
const SystemConfigurationRepo_1 = require("../repositories/SystemConfigurationRepo");
const constants_1 = __importDefault(require("../util/constants"));
class TransactionController {
    // get wallet owner info before transferring points
    getAccountInfo(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountRepo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                const account = yield accountRepo.getByAccountNumber(Number(req.params.acn));
                if (!account)
                    throw new NotFoundError_1.NotFoundError("Account not found!");
                const giftingFees = (_b = Number((_a = (yield new SystemConfigurationRepo_1.SystemConfigurationRepository(typeorm_1.AppDataSource).getByKey("GIFTING_FEES"))) === null || _a === void 0 ? void 0 : _a.value)) !== null && _b !== void 0 ? _b : constants_1.default.DEFAULT_SYSTEM_CONF.GIFTING_FEES;
                switch (account.type) {
                    default:
                    case types_1.UserTypes.CUSTOMER:
                        const customer = yield typeorm_1.AppDataSource.getRepository(Customer_1.Customer).findOne({
                            select: [
                                "firstName",
                                "lastName",
                                "phoneNumber",
                                "countryCode",
                                "status",
                            ],
                            where: { accountId: account.id },
                        });
                        if (!customer)
                            throw new InternalError_1.InternalError("حدث خطأ ما...");
                        if (customer.status !== types_1.CustomerStatus.ACTIVE)
                            throw new NotAllowedError_1.NotAllowedError("الحساب غير مفعل");
                        res.status(200).json({
                            customer,
                            giftingFees,
                        });
                        break;
                    case types_1.UserTypes.PROVIDER:
                        const provider = yield typeorm_1.AppDataSource.getRepository(Provider_1.Provider).findOne({
                            where: { accountId: account.id },
                            select: [
                                "ownerName",
                                "businessName",
                                "countryCode",
                                "businessEmail",
                                "status",
                            ],
                        });
                        if (!provider)
                            throw new NotFoundError_1.NotFoundError("لم يتم العثور على مزود الخدمة");
                        if (provider.status !== types_1.ProviderStatus.ACTIVE)
                            throw new NotAllowedError_1.NotAllowedError("الحساب غير مفعل");
                        res.status(200).json({
                            provider,
                            giftingFees,
                        });
                        break;
                }
                next();
            }
            catch (err) {
                Log_1.default.error(`trxController.getWalletInfo: ${err.message}`);
                res.status((_c = err.statusCode) !== null && _c !== void 0 ? _c : 500).send(err.message);
            }
        });
    }
    // Transfer points from a provider wallet to a customer wallet (receiving)
    // OR GIFTING
    transferPoints(req, res, next) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { walletId, recepientAccountNumber, amount } = req.body;
                const walletRepo = new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource);
                const accountRepo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                const fromWallet = yield walletRepo.getById(walletId);
                const configRepo = new SystemConfigurationRepo_1.SystemConfigurationRepository(typeorm_1.AppDataSource);
                if (!fromWallet)
                    throw new NotFoundError_1.NotFoundError("Sender not found!");
                if (fromWallet.status !== types_1.WalletStatus.ACTIVE)
                    throw new NotAllowedError_1.NotAllowedError("هذه المحفظة معطّلة.");
                (0, permissions_1.denyNotWalletOwner)(req.user.userId, fromWallet);
                const recepient = yield accountRepo.getByAccountNumber(recepientAccountNumber, ["wallets"]);
                if (!recepient)
                    throw new NotFoundError_1.NotFoundError("Recepient not found!");
                if (recepient.id === Number(req.user.userId))
                    throw new NotAllowedError_1.NotAllowedError("لا يمكن تحويل الرصيد إلى نفسك");
                if (recepient.type === types_1.UserTypes.PROVIDER)
                    throw new NotAllowedError_1.NotAllowedError("لا يمكن تحويل الرصيد إلى مزود الخدمة");
                let type = types_1.TransactionTypes.TRANSFER;
                // provider transferring points
                // incures granting fees
                let fees = (_a = fromWallet.fees) !== null && _a !== void 0 ? _a : 0;
                let subtotal = Number((amount + (amount * fees) / 100).toFixed(2));
                if (fromWallet.bonus)
                    subtotal += Number(((amount * fromWallet.bonus) / 100).toFixed(2));
                if (fromWallet.walletType === types_1.WalletTypes.CUSTOMER) {
                    const giftingFees = yield configRepo.getByKey("GIFTING_FEES");
                    const MAXIMUM_DAILY_TRANSACTIONS = (_b = Number(yield configRepo.getValueByKey("MAXIMUM_DAILY_TRANSACTIONS"))) !== null && _b !== void 0 ? _b : constants_1.default.DEFAULT_SYSTEM_CONF.MAXIMUM_DAILY_TRANSACTIONS;
                    const MAXIMUM_DAILY_TRANSACTIONS_AMOUNT = (_c = (yield configRepo.getValueByKey("MAXIMUM_DAILY_OUTGOING_POINTS"))) !== null && _c !== void 0 ? _c : constants_1.default.DEFAULT_SYSTEM_CONF.MAXIMUM_DAILY_OUTGOING_POINTS;
                    if (giftingFees)
                        fees = Number(giftingFees.value);
                    else
                        fees = constants_1.default.DEFAULT_SYSTEM_CONF.GIFTING_FEES;
                    subtotal = Number((amount + (amount * fees) / 100).toFixed(2));
                    // check maximums
                    const wallets = yield walletRepo.getAllAccountWallets(fromWallet.id, [
                        "outgoingTransactions",
                    ]);
                    const trxsToday = [];
                    wallets.map((wallet) => {
                        wallet.outgoingTransactions
                            .filter((t) => t.createdAt.getDate() === new Date().getDate())
                            .map((t) => trxsToday.push(t));
                    });
                    Log_1.default.debug("TRXS TODAY:");
                    console.log(trxsToday);
                    if (trxsToday.length >= MAXIMUM_DAILY_TRANSACTIONS)
                        return res
                            .status(403)
                            .json("لقد تخطّيت الحد الأقصى لعدد المعاملات اليومية.");
                    const trxAmount = Math.round(trxsToday.reduce((acc, trx) => acc + trx.amount, 0));
                    if (trxAmount + subtotal >= MAXIMUM_DAILY_TRANSACTIONS_AMOUNT)
                        return res
                            .status(403)
                            .json("لقد تخطّيت الحد الأقصى لمبلغ المعاملات اليومية.");
                }
                if (fromWallet.balance < subtotal)
                    throw new BadInputError_1.BadInputError(`ليس لديك رصيدٌ كافٍ لإتمام هذه العملية ${subtotal}`);
                // find the target wallet
                let wallet = recepient.wallets.find((w) => w.providerId === fromWallet.providerId);
                if (!wallet) {
                    // create a new wallet for the recepient
                    wallet = new Wallet_1.Wallet();
                    wallet.providerId = fromWallet.providerId;
                    wallet.balance = 0;
                    wallet.walletType = types_1.WalletTypes.CUSTOMER;
                    wallet.accountId = recepient.id;
                    wallet.pointType = fromWallet.pointType;
                    wallet.walletNumber = yield (0, adminController_1.generateWalletNumber)(typeorm_1.AppDataSource.getRepository(Wallet_1.Wallet));
                    wallet = yield walletRepo.create(wallet);
                }
                // if C2C
                if (fromWallet.walletType === types_1.WalletTypes.CUSTOMER ||
                    fromWallet.walletType === types_1.WalletTypes.SYSTEM) {
                    yield (0, exports.transferGiftingPoints)(fromWallet, wallet, amount, fees, fromWallet.walletType);
                    type = types_1.TransactionTypes.GIFT;
                }
                else
                    yield typeorm_1.AppDataSource.manager.transaction((em) => __awaiter(this, void 0, void 0, function* () {
                        const total = fromWallet.bonus
                            ? amount + Number(((amount * fromWallet.bonus) / 100).toFixed(2))
                            : amount;
                        // take system cut
                        // transfer
                        let record = yield em.findOne(CustomerPointsRecord_1.PointsRecord, {
                            where: {
                                originWalletId: fromWallet.id,
                                targetWalletId: wallet.id,
                            },
                        });
                        if (record)
                            record.amount += total;
                        else
                            record = em.create(CustomerPointsRecord_1.PointsRecord, {
                                originWalletId: fromWallet.id,
                                targetWalletId: wallet.id,
                                amount: total,
                            });
                        Log_1.default.debug("TWID");
                        yield em.save(record);
                        wallet.records = (wallet === null || wallet === void 0 ? void 0 : wallet.records)
                            ? [...wallet.records, record]
                            : [record];
                        yield em.save(wallet);
                    }));
                // #TODO should we check for wallet status first?
                const trx = yield (0, exports.makeTransaction)(fromWallet, wallet, type, amount, (_d = fromWallet.fees) !== null && _d !== void 0 ? _d : 0);
                // update provider account
                // #TODO I'm not supposed to be here
                res.status(201).json(trx);
                return next();
            }
            catch (err) {
                Log_1.default.error(`trxController.transferPoints: ${err.message}`);
                console.log(err);
                return res.status((_e = err.statusCode) !== null && _e !== void 0 ? _e : 500).send(err.message);
            }
        });
    }
    consumePoint(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount, walletId, cashierId } = req.body;
                const walletRepo = new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource);
                const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                const fromWallet = yield walletRepo.getById(walletId);
                if (!fromWallet)
                    throw new NotFoundError_1.NotFoundError("لم يتم العثور على المرسل!");
                (0, permissions_1.denyWalletNotOwnerOrCustomer)(req.user.userId, fromWallet);
                if (fromWallet.balance < amount)
                    throw new BadInputError_1.BadInputError("ليس لديك رصيدٌ كافٍ لإتمام هذه العملية");
                if (!fromWallet.providerId)
                    throw new NotAllowedError_1.NotAllowedError("لا يمكنك استخدام هذه المحفظة");
                const provider = yield providerRepo.getById(fromWallet.providerId, [
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
                            if (cashierId)
                                trx.cashierId = cashierId;
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
                Log_1.default.error(`trxController.consumePoints: ${err.message}`);
                res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).send(err.message);
            }
        });
    }
    getTrxFromDates(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { fromDate, take, skip, toDate, incomingOnly, outgoingOnly, accountId, } = req.body;
                if (accountId) {
                    if (req.user.type !== types_1.UserTypes.ADMIN)
                        throw new NotAllowedError_1.NotAllowedError("You are not allowed to perform this operation");
                    take = 50;
                }
                else
                    accountId = Number(req.user.userId);
                const accountRepo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                const incomingWhere = {
                    createdAt: (0, typeorm_2.Between)(fromDate, toDate),
                    toWallet: {
                        accountId,
                    },
                };
                const outgoingWhere = {
                    createdAt: (0, typeorm_2.Between)(fromDate, toDate),
                    fromWallet: {
                        accountId,
                    },
                };
                const where = incomingOnly
                    ? incomingWhere
                    : outgoingOnly
                        ? outgoingWhere
                        : [incomingWhere, outgoingWhere];
                const trxs = yield typeorm_1.AppDataSource.getRepository(Transaction_1.Transaction).find({
                    where,
                    take,
                    skip,
                    loadEagerRelations: false,
                    order: {
                        createdAt: "DESC",
                    },
                    relations: ["fromWallet", "toWallet"],
                    select: {
                        id: true,
                        createdAt: true,
                        trxNumber: true,
                        amount: true,
                        pointType: true,
                        transactionType: true,
                        status: true,
                        fromWallet: {
                            accountId: true,
                        },
                        toWallet: {
                            accountId: true,
                        },
                    },
                });
                // for each transaction, get the other person #TODO clean me up please for god's sake man
                const arr = [];
                for (const trx of trxs) {
                    const trxType = trx.fromWallet.accountId === accountId ? "outgoing" : "incoming";
                    //id of the other person
                    const id = trxType === "outgoing"
                        ? trx.toWallet.accountId
                        : trx.fromWallet.accountId;
                    const otherPerson = yield accountRepo.getById(id);
                    if (!otherPerson)
                        continue;
                    let name = "";
                    switch (otherPerson.type) {
                        case types_1.UserTypes.CUSTOMER:
                            const cst = yield typeorm_1.AppDataSource.getTreeRepository(Customer_1.Customer).findOne({
                                where: {
                                    accountId: otherPerson.id,
                                },
                                select: ["firstName", "lastName"],
                            });
                            if (!cst)
                                continue;
                            name = cst.firstName + " " + cst.lastName;
                            break;
                        case types_1.UserTypes.PROVIDER:
                            const prv = yield typeorm_1.AppDataSource.getTreeRepository(Provider_1.Provider).findOne({ where: { accountId: otherPerson.id }, select: ["businessName"] });
                            name = (_a = prv === null || prv === void 0 ? void 0 : prv.businessName) !== null && _a !== void 0 ? _a : "";
                            break;
                        default:
                        case types_1.UserTypes.ADMIN:
                            name = "SYSTEM";
                            break;
                    }
                    if (!name)
                        continue;
                    arr.push({
                        trxNumber: trx.trxNumber,
                        trxDate: trx.createdAt,
                        trxType,
                        amount: trx.amount,
                        pointType: trx.pointType,
                        status: trx.status,
                        transactionType: trx.transactionType,
                        name,
                    });
                }
                res.status(200).json(arr);
                next();
            }
            catch (err) {
                Log_1.default.error(`trxController.getTrxFromDates: ${err.message}`);
                res.status((_b = err.statusCode) !== null && _b !== void 0 ? _b : 500).send(err.message);
            }
        });
    }
    getLatestTrx(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { take, skip, incomingOnly, outgoingOnly, accountId } = req.body;
                if (accountId) {
                    if (req.user.type !== types_1.UserTypes.ADMIN)
                        throw new NotAllowedError_1.NotAllowedError("You are not allowed to perform this operation");
                }
                else
                    accountId = Number(req.user.userId);
                const incomingWhere = {
                    toWallet: {
                        accountId,
                    },
                };
                const outgoingWhere = {
                    fromWallet: {
                        accountId,
                    },
                };
                const where = incomingOnly
                    ? incomingWhere
                    : outgoingOnly
                        ? outgoingWhere
                        : [incomingWhere, outgoingWhere];
                const accountRepo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                const trxs = yield typeorm_1.AppDataSource.getRepository(Transaction_1.Transaction).find({
                    take,
                    where,
                    skip,
                    loadEagerRelations: false,
                    order: {
                        createdAt: "DESC",
                    },
                    relations: ["fromWallet", "toWallet"],
                    select: {
                        id: true,
                        createdAt: true,
                        trxNumber: true,
                        amount: true,
                        pointType: true,
                        transactionType: true,
                        status: true,
                        fromWallet: {
                            accountId: true,
                        },
                        toWallet: {
                            accountId: true,
                        },
                    },
                });
                // for each transaction, get the other person #TODO clean me up please for god's sake man
                const arr = [];
                for (const trx of trxs) {
                    const trxType = trx.fromWallet.accountId === accountId ? "outgoing" : "incoming";
                    //id of the other person
                    const id = trxType === "outgoing"
                        ? trx.toWallet.accountId
                        : trx.fromWallet.accountId;
                    const otherPerson = yield accountRepo.getById(id);
                    if (!otherPerson)
                        continue;
                    let name = "";
                    switch (otherPerson.type) {
                        case types_1.UserTypes.CUSTOMER:
                            const cst = yield typeorm_1.AppDataSource.getTreeRepository(Customer_1.Customer).findOne({
                                where: {
                                    accountId: otherPerson.id,
                                },
                                select: ["firstName", "lastName"],
                            });
                            if (!cst)
                                continue;
                            name = cst.firstName + " " + cst.lastName;
                            break;
                        case types_1.UserTypes.PROVIDER:
                            const prv = yield typeorm_1.AppDataSource.getTreeRepository(Provider_1.Provider).findOne({ where: { accountId: otherPerson.id }, select: ["businessName"] });
                            name = (_a = prv === null || prv === void 0 ? void 0 : prv.businessName) !== null && _a !== void 0 ? _a : "";
                            break;
                        default:
                        case types_1.UserTypes.ADMIN:
                            name = "SYSTEM";
                            break;
                    }
                    if (!name)
                        continue;
                    arr.push({
                        trxNumber: trx.trxNumber,
                        trxDate: trx.createdAt,
                        trxType,
                        amount: trx.amount,
                        pointType: trx.pointType,
                        status: trx.status,
                        transactionType: trx.transactionType,
                        name,
                    });
                }
                res.status(200).json(arr);
                next();
            }
            catch (err) {
                Log_1.default.error(`trxController.getLatestTrx: ${err.message}`);
                res.status((_b = err.statusCode) !== null && _b !== void 0 ? _b : 500).send(err.message);
            }
        });
    }
    getTrxByTrxNumber(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { accountId, trxNumber } = req.body;
                const accountRepo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                const acc = yield accountRepo.getById(accountId, ["wallets"]);
                if (!acc)
                    throw new NotFoundError_1.NotFoundError("Account not found");
                const wallets = acc.wallets.map((w) => w.id);
                const trx = yield typeorm_1.AppDataSource.getRepository(Transaction_1.Transaction)
                    .createQueryBuilder("t")
                    .where("t.trxNumber = :trxNumber AND (t.fromWalletId IN (:wallets) OR t.toWalletId IN (:wallets))", { trxNumber, wallets })
                    .getOne();
                if (!trx)
                    return res.status(404).send("Transaction not found");
                // find the name of the other person
                // #TODO
                return res.status(200).json({
                    trxNumber: trx.trxNumber,
                    trxDate: trx.createdAt,
                    trxType: wallets.includes(trx.fromWalletId) ? "outgoing" : "incoming",
                    amount: trx.amount,
                    type: trx.transactionType,
                    status: trx.status,
                    pointType: trx.pointType,
                });
            }
            catch (error) {
                Log_1.default.error(`trxController.getTrxByTrXNum: ${error.message}`);
                res
                    .status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500)
                    .json({ code: error.code, error: error.message });
                return next();
            }
        });
    }
}
exports.TransactionController = TransactionController;
const makeTransaction = (from, to, type, amount, fees) => __awaiter(void 0, void 0, void 0, function* () {
    const walletRepo = new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource);
    const recordRepo = new PointRecordRepository_1.PointRecordRepository(typeorm_1.AppDataSource);
    return yield typeorm_1.AppDataSource.manager.transaction((em) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // take system cut
        if (fees > 0 && from.walletType !== types_1.WalletTypes.SYSTEM) {
            // check if there's a system wallet for this provider:
            const cutAmount = Number(((amount * fees) / 100).toFixed(2));
            if (cutAmount > 0) {
                const systemWallet = yield walletRepo.getOrCreateSystemWalletOfProvider((_a = from.providerId) !== null && _a !== void 0 ? _a : 0);
                // update system wallet balance
                const record = yield recordRepo.updateWalletBalance(systemWallet.id, from.id, cutAmount);
                systemWallet.records = systemWallet.records
                    ? [...systemWallet.records, record]
                    : [record];
                // update provider balance
                from.balance -= cutAmount;
                from.totalSold += cutAmount;
                yield em.save(systemWallet);
                const trx = new Transaction_1.Transaction();
                trx.amount = cutAmount;
                trx.fromWalletId = from.id;
                trx.toWalletId = systemWallet.id;
                trx.pointType = types_1.PointTypes.WHITE;
                trx.transactionType = types_1.TransactionTypes.FEES;
                trx.trxNumber = (0, generateNumber_1.default)(9);
                trx.status = types_1.TransactionStatus.CONFIRMED;
                yield em.save(trx);
            }
        }
        // transfer points
        const trx = new Transaction_1.Transaction();
        if (from.bonus && type === types_1.TransactionTypes.TRANSFER)
            amount += Number(((amount * from.bonus) / 100).toFixed(2));
        if (from.balance < amount)
            throw new BadInputError_1.BadInputError("ليس لديك رصيدٌ كافي");
        trx.amount = amount;
        trx.fromWalletId = from.id;
        trx.toWalletId = to.id;
        trx.pointType = types_1.PointTypes.WHITE;
        trx.transactionType = type;
        trx.trxNumber = (0, generateNumber_1.default)(9);
        yield em.save(trx);
        // update wallets
        from.balance -= amount;
        from.totalTrx += 1;
        to.totalTrx += 1;
        if (from.walletType === types_1.WalletTypes.PROVIDER)
            from.totalSold += amount;
        if (type === types_1.TransactionTypes.PURCHASE)
            from.totalConsume += amount;
        yield em.save(from);
        yield em.save(to);
        trx.status = types_1.TransactionStatus.CONFIRMED;
        yield em.save(trx);
        return trx;
    }));
});
exports.makeTransaction = makeTransaction;
const transferGiftingPoints = (from, to, amount, fees, type) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    Log_1.default.debug("TRASNFER BEGINS");
    // only use this function when you want to transfer points between wallets from customer to customer or from provider to customer
    const walletRepo = new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource);
    const recordRepo = new PointRecordRepository_1.PointRecordRepository(typeorm_1.AppDataSource);
    const systemWallet = yield walletRepo.getOrCreateSystemWalletOfProvider((_b = from.providerId) !== null && _b !== void 0 ? _b : 0);
    // get the records of the sender
    const senderRecs = from.records;
    Log_1.default.debug("TO WALLET: ");
    console.log(to);
    console.log(senderRecs);
    let totalTransferred = 0;
    yield typeorm_1.AppDataSource.manager.transaction((em) => __awaiter(void 0, void 0, void 0, function* () {
        Log_1.default.debug("TRANSFERING THE AMOUNT");
        for (const rec of senderRecs) {
            if (totalTransferred >= amount)
                break;
            const amt = Math.min(rec.amount, amount - totalTransferred);
            Log_1.default.debug(`Transferred ${amt} points`);
            rec.amount -= amt;
            rec.amount = Number(rec.amount.toFixed(2));
            totalTransferred += amt;
            // add recs to reciever
            yield recordRepo.updateWalletBalance(to.id, rec.originWalletId, amt);
            Log_1.default.debug("UPSERT CONPETLTE");
            // update recs from sender
            yield em.save(rec);
            Log_1.default.debug(`RECORD SAVED`);
        }
        if (type === types_1.WalletTypes.SYSTEM)
            return;
        // take system cut
        Log_1.default.debug("TRANSFER COMPLETE . Taking system cut...");
        console.log(senderRecs);
        totalTransferred = 0;
        Log_1.default.debug(`${systemWallet.id}, ${fees}`);
        if (systemWallet && fees) {
            const cutAmount = Number(((amount * fees) / 100).toFixed(2));
            Log_1.default.debug(`Cut amount: ${cutAmount}`);
            if (cutAmount > 0) {
                // update system wallet balance
                Log_1.default.debug("BEGIN SECON LOOP");
                for (const rec of senderRecs) {
                    Log_1.default.debug(`tot: ${totalTransferred}`);
                    if (totalTransferred >= cutAmount)
                        break;
                    const amt = Math.min(rec.amount, cutAmount - totalTransferred);
                    rec.amount -= amt;
                    totalTransferred += amt;
                    rec.amount = Number(rec.amount.toFixed(2));
                    // add recs to reciever
                    yield recordRepo.updateWalletBalance(systemWallet.id, rec.originWalletId, amt);
                    // await em.upsert(
                    // PointsRecord,
                    // {
                    // originWalletId: rec.originWalletId,
                    // targetWalletId: systemWallet.id,
                    // amount: amt,
                    // },
                    // { conflictPaths: ["targetWalletId", "originWalletId"] }
                    // )
                    Log_1.default.debug("UPSERT CONPETLTE");
                    // update recs from sender
                    yield em.save(rec);
                    Log_1.default.debug(`RECORD SAVED`);
                }
                Log_1.default.debug("SYSTEM TRANFSER COMPLETE");
                console.log(senderRecs);
                const trx = new Transaction_1.Transaction();
                trx.amount = cutAmount;
                trx.fromWalletId = from.id;
                trx.toWalletId = systemWallet.id;
                trx.pointType = types_1.PointTypes.WHITE;
                trx.transactionType = types_1.TransactionTypes.FEES;
                trx.trxNumber = (0, generateNumber_1.default)(9);
                trx.status = types_1.TransactionStatus.CONFIRMED;
                yield em.save(trx);
                Log_1.default.debug("TRX: ");
                console.log(trx);
            }
        }
    }));
});
exports.transferGiftingPoints = transferGiftingPoints;
