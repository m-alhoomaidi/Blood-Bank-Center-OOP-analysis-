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
exports.WalletController = void 0;
const NotFoundError_1 = require("../errors/NotFoundError");
const typeorm_1 = require("../infrastructure/typeorm");
const permissions_1 = require("../lib/permissions");
const TransactionRepository_1 = require("../repositories/TransactionRepository");
const WalletRepository_1 = require("../repositories/WalletRepository");
const Wallet_1 = require("../entities/Wallet");
const Log_1 = __importDefault(require("../util/Log"));
class WalletController {
    constructor() {
        this.myWallets = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const test = yield typeorm_1.AppDataSource.getTreeRepository(Wallet_1.Wallet)
                    .createQueryBuilder("w")
                    .where("w.accountId = :accountId", { accountId: req.user.userId })
                    .getMany();
                Log_1.default.debug("TEST");
                // const wallets = await AppDataSource.getRepository(Wallet)
                // .createQueryBuilder("w")
                // .where("w.accountId = :accountId", { accountId: req.user.userId })
                // .innerJoinAndSelect("w.provider", "p")
                // .leftJoinAndSelect("w.records", "r")
                // .leftJoinAndSelect("w.incomingTransactions", "incomingTrx")
                // .take(10)
                // .leftJoinAndSelect("w.outgoingTransactions", "outgoingTrx")
                // .take(10)
                // .select(["w", "p.businessName", "r", "incomingTrx", "outgoingTrx"])
                // .getMany()
                res.status(200).json({ test });
            }
            catch (error) {
                Log_1.default.error(`WalletController.myWallets ${error.message}`);
                res.status(500).json({ error: error.message });
                next();
            }
        });
    }
    // get a list of transactions related to a certain wallet(history)
    getWalletTransactions(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { walletId, take, skip } = req.body;
                const walletRepo = new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource);
                const trxRepo = new TransactionRepository_1.TransactionRepository(typeorm_1.AppDataSource);
                const wallet = yield walletRepo.getById(walletId);
                if (!wallet)
                    throw new NotFoundError_1.NotFoundError("Unknown wallet");
                (0, permissions_1.denyNotWalletOwner)(Number(req.user.userId), wallet);
                // get all transactions related to this wallet
                const transactions = yield trxRepo.getAndCount(take, skip, []);
                res.status(200).json({
                    transactions,
                });
                next();
            }
            catch (err) {
                Log_1.default.error(`walletController.getWalletTransactions: ${err.message}`);
                res.status((_a = err.statusCode) !== null && _a !== void 0 ? _a : 500).send(err.message);
            }
        });
    }
}
exports.WalletController = WalletController;
