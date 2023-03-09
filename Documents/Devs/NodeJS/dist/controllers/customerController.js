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
exports.generateAccountNumber = void 0;
const Customer_1 = require("../entities/Customer");
const typeorm_1 = require("../infrastructure/typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Log_1 = __importDefault(require("../util/Log"));
const constants_1 = __importDefault(require("../util/constants"));
const Account_1 = require("../entities/Account");
const AccountRepo_1 = require("../repositories/AccountRepo");
const generateNumber_1 = __importDefault(require("../util/generateNumber"));
const config_1 = __importDefault(require("../lib/config"));
const types_1 = require("../types");
const SessionRepo_1 = require("../repositories/SessionRepo");
const CustomerRepository_1 = require("../repositories/CustomerRepository");
const BadInputError_1 = require("../errors/BadInputError");
const NotFoundError_1 = require("../errors/NotFoundError");
class CustomerController {
    getCustomerInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = new CustomerRepository_1.CustomerRepository(typeorm_1.AppDataSource);
                const id = Number(req.user.customerId);
                if (!id)
                    throw new BadInputError_1.BadInputError("هذا الحساب غير صحيح");
                const customer = yield repo.getById(id, ["account", "account.wallets"]);
                if (!customer)
                    throw new NotFoundError_1.NotFoundError("الحساب غير موجود");
                res.status(200).json({
                    currentBalance: Number(customer.account.wallets
                        .reduce((acc, cur) => acc + cur.balance, 0)
                        .toFixed(2)),
                    totalConsume: Number(customer.account.wallets
                        .reduce((acc, cur) => acc + cur.totalConsume, 0)
                        .toFixed(2)),
                });
            }
            catch (error) {
                Log_1.default.error(`CustomerController.getCustomerInfo ${error.message}`);
                res.status(500).json({ error: error.message });
                next();
            }
        });
    }
    createCustomerAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.AppDataSource.manager.transaction((em) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b, _c, _d;
                    console.log(req.body)
                    let customer = new Customer_1.Customer();
                    customer.firstName = req.body.firstName;
                    customer.lastName = req.body.lastName;
                    customer.email = req.body.email;
                    customer.phoneNumber = req.body.phoneNumber;
                    customer.language = req.body.language;
                    customer.isInvestor = (_a = req.body.isInvestor) !== null && _a !== void 0 ? _a : false;
                    customer.isVolunteer = (_b = req.body.isVolunteer) !== null && _b !== void 0 ? _b : false;
                    customer.isBusinessOwner = (_c = req.body.isBusinessOwner) !== null && _c !== void 0 ? _c : false;
                    // create customer account number

                    // const accountNumber = yield (0, exports.generateAccountNumber)(new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource));
                    const accountNumber = req.body.phoneNumber
                    let account = new Account_1.Account();
                    account.username = req.body.username;
                    account.password = req.body.password;
                    account.accountNumber = accountNumber;
                    account.type = types_1.UserTypes.CUSTOMER;
                    account = yield em.save(account);

                    // const account = await AppDataSource.getRepository(Account).save({
                    // username: req.body.username,
                    // password: req.body.password,
                    // accountNumber,
                    // })
                    customer.accountId = account.id;
                    customer = yield em.save(customer);
                    // immediately login
                    const token = jsonwebtoken_1.default.sign({
                        userId: account.id,
                        type: constants_1.default.TYPE_CUSTOMER,
                        customerId: customer.id,
                    }, (_d = config_1.default.JWT_SECRET) !== null && _d !== void 0 ? _d : "");
                    return { token, id: account.id, acn: account.accountNumber };
                }));
                const repo = new SessionRepo_1.SessionRepository(typeorm_1.AppDataSource);
                yield repo.startNewSession(result.token, result.id);
                res.status(201).json({
                    message: "Customer account created successfully!",
                    token: result.token,
                    accountNumber: result.acn,
                });
                return next();
            }
            catch (error) {
                Log_1.default.error(`CustomerController.createCustomerAccount ${error.message}`);
                if (error.code === "ER_DUP_ENTRY") {
                    return res
                        .status(400)
                        .json({ message: "اسم الحساب أو البريد الإلكتروني مستعمل بالفعل." });
                }
                res.status(500).json({ error: error.message });
                next();
            }
        });
    }
}
exports.default = CustomerController;
const generateAccountNumber = (repo) => __awaiter(void 0, void 0, void 0, function* () {
    const number = (0, generateNumber_1.default)(config_1.default.accountNumberLength);
    const acc = yield repo.getByAccountNumber(number);
    if (acc)
        return (0, exports.generateAccountNumber)(repo);
    return number;
});
exports.generateAccountNumber = generateAccountNumber;
