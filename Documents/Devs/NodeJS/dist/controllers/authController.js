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
exports.AuthController = void 0;
const InvalidCreds_1 = require("../errors/InvalidCreds");
const typeorm_1 = require("../infrastructure/typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Log_1 = __importDefault(require("../util/Log"));
const types_1 = require("../types");
const Account_1 = require("../entities/Account");
const NotFoundError_1 = require("../errors/NotFoundError");
const config_1 = __importDefault(require("../lib/config"));
const SessionRepo_1 = require("../repositories/SessionRepo");
const AccountRepo_1 = require("../repositories/AccountRepo");
const PasswordResetRepo_1 = require("../repositories/PasswordResetRepo");
const crypto_1 = require("crypto");
const mail_1 = require("../util/mail");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const NotAllowedError_1 = require("../errors/NotAllowedError");
const CashierRepository_1 = require("../repositories/CashierRepository");
const ProviderRepository_1 = require("../repositories/ProviderRepository");
const CustomerRepository_1 = require("../repositories/CustomerRepository");
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", "..", ".env") });
class AuthController {
    login(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = (_a = config_1.default.JWT_SECRET) !== null && _a !== void 0 ? _a : "";
                const { loginType, username, password } = req.body;
                const repo = new SessionRepo_1.SessionRepository(typeorm_1.AppDataSource);
                const accountRepo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                let account = yield typeorm_1.AppDataSource.getRepository(Account_1.Account).findOne({
                    where: { username },
                    relations: ["wallets"],
                    select: ["accountNumber", "id", "password", "type"],
                });
                if (!account || !bcrypt_1.default.compareSync(password, account.password))
                    throw new InvalidCreds_1.InvalidCredentialsError("معلومات الدخول غير صحيحة");
                switch (loginType) {
                    case "provider":
                        const providerRepo = new ProviderRepository_1.ProviderRepository(typeorm_1.AppDataSource);
                        let provider = yield providerRepo.getByAccountId(account.id);
                        let providerId, accountId = account.id;
                        if (!provider) {
                            // check if there's a cashier with this data
                            const cashierRepo = new CashierRepository_1.CashierRepository(typeorm_1.AppDataSource);
                            const cashier = yield cashierRepo.getByAccountId(account.id, [
                                "provider",
                                "provider.account",
                            ]);
                            if (!cashier || !cashier.provider)
                                throw new NotFoundError_1.NotFoundError("لم يتم العثور على المستخدم");
                            provider = cashier.provider;
                            providerId = cashier.provider.id;
                            accountId = cashier.provider.accountId;
                            account = cashier.provider.account;
                        }
                        else
                            providerId = provider.id;
                        // check if the provider is active
                        if (provider.status !== types_1.ProviderStatus.ACTIVE)
                            throw new NotAllowedError_1.NotAllowedError("المستخدم غير مفعل");
                        if (account.lastLogin) {
                            const daysSinceLastLogin = Math.floor((Date.now() - new Date(account.lastLogin).getTime()) /
                                (1000 * 60 * 60 * 24));
                            if (daysSinceLastLogin >= 30) {
                                provider.status = types_1.ProviderStatus.BANNED;
                                yield providerRepo.update(provider);
                                res.status(403).json("تم حظر هذا الحساب.");
                            }
                        }
                        const providerToken = jsonwebtoken_1.default.sign({
                            userId: accountId,
                            type: types_1.UserTypes.PROVIDER,
                            providerId: providerId,
                        }, secret);
                        account.lastLogin = new Date();
                        yield accountRepo.update(account);
                        yield repo.startNewSession(providerToken, account.id, false);
                        return res.status(200).json({
                            token: providerToken,
                            provider,
                            wallets: account.wallets,
                            accountNumber: account.accountNumber,
                        });
                    case "customer":
                        const customerRepo = new CustomerRepository_1.CustomerRepository(typeorm_1.AppDataSource);
                        const customer = yield customerRepo.getByAccountId(account.id);
                        if (!customer)
                            throw new NotFoundError_1.NotFoundError("Customer not found!");
                        if (customer.status === types_1.CustomerStatus.BANNED)
                            throw new NotAllowedError_1.NotAllowedError("هذا الحساب محظور.");
                        if (account.lastLogin) {
                            const daysSinceLastLogin = Math.floor((Date.now() - account.lastLogin.getTime()) / (1000 * 60 * 60 * 24));
                            if (daysSinceLastLogin >= 30) {
                                customer.status = types_1.CustomerStatus.BANNED;
                                yield customerRepo.update(customer);
                                res.status(403).json("تم حظر هذا الحساب لعدم النشاط.");
                            }
                        }
                        const customerToken = jsonwebtoken_1.default.sign({ userId: account.id, type: account.type, customerId: customer.id }, secret);
                        yield repo.startNewSession(customerToken, account.id);
                        account.lastLogin = new Date();
                        yield accountRepo.update(account);
                        return res.status(200).json({
                            token: customerToken,
                            customer,
                            wallets: account.wallets,
                            accountNumber: account.accountNumber,
                        });
                    case "admin":
                        const adminToken = jsonwebtoken_1.default.sign({ userId: account.id, type: account.type }, secret);
                        yield repo.startNewSession(adminToken, account.id);
                        return res.status(200).json({
                            token: adminToken,
                            wallets: account.wallets,
                            accountNumber: account.accountNumber,
                        });
                    default:
                        throw new InvalidCreds_1.InvalidCredentialsError("معلومات الدخول غير صحيحة");
                }
            }
            catch (error) {
                Log_1.default.error(`authController.login: ${error}`);
                res.status((_b = error.statusCode) !== null && _b !== void 0 ? _b : 500).json({ error: error.message });
                return next();
            }
        });
    }
    sendResetPasswordEmail(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, username } = req.body;
                const repo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
                const account = yield repo.getByUsername(username);
                if (!account)
                    throw new NotFoundError_1.NotFoundError("Account not found!");
                const resetRepo = new PasswordResetRepo_1.PasswordResetRepository(typeorm_1.AppDataSource);
                const uuid = (0, crypto_1.randomUUID)();
                yield resetRepo.create({ uuid, accountId: account.id });
                // #TODO don't do this
                const newPassword = Math.random().toString(36).substring(2, 6); // random string of length 4
                // mail things to the user
                yield (0, mail_1.mail)(email, "Password Reset", `Your new password is: ${newPassword}`);
                account.password = newPassword;
                yield repo.update(account);
                res.status(200).json("يرجى مراجعة بريدك الإلكتروني.");
                next();
            }
            catch (error) {
                Log_1.default.error(`authController.resetPassword: ${error}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({ error: error.message });
                return next();
            }
        });
    }
    resetPasswordCheck(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { uuid } = req.params;
                const repo = new PasswordResetRepo_1.PasswordResetRepository(typeorm_1.AppDataSource);
                const reset = yield repo.getByUUID(uuid);
                if (!reset || !reset.isValid)
                    throw new NotFoundError_1.NotFoundError("uuid not found");
                res.status(200).json(reset.account);
                next();
            }
            catch (error) {
                Log_1.default.error(`authController.resetPasswordCheck: ${error}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({ error: error.message });
                return next();
            }
        });
    }
}
exports.AuthController = AuthController;
