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
exports.createDbConnection = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Provider_1 = require("../entities/Provider");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const Customer_1 = require("../entities/Customer");
const Session_1 = require("../entities/Session");
const Account_1 = require("../entities/Account");
const Transaction_1 = require("../entities/Transaction");
const Wallet_1 = require("../entities/Wallet");
const ConsumptionCode_1 = require("../entities/ConsumptionCode");
const Cashier_1 = require("../entities/Cashier");
const Affiliate_1 = require("../entities/Affiliate");
const Country_1 = require("../entities/Country");
const BusinessCategory_1 = require("../entities/BusinessCategory");
const CustomerPointsRecord_1 = require("../entities/CustomerPointsRecord");
const SystemConfiguration_1 = require("../entities/SystemConfiguration");
const PasswordReset_1 = require("../entities/PasswordReset");
const Review_1 = require("../entities/Review");
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", "..", ".env") });

exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: process.argv.includes("--sync"),
    entities: [
        ConsumptionCode_1.ConsumptionCode,
        SystemConfiguration_1.SystemConfiguration,
        Transaction_1.Transaction,
        Wallet_1.Wallet,
        PasswordReset_1.PasswordReset,
        Account_1.Account,
        Customer_1.Customer,
        Provider_1.Provider,
        Cashier_1.Cashier,
        Affiliate_1.Affiliate,
        Country_1.Country,
        BusinessCategory_1.BusinessCategory,
        CustomerPointsRecord_1.PointsRecord,
        Session_1.Session,
        Review_1.Review,
    ],
    dropSchema: process.argv.includes("--drop"),
    logging: process.argv.includes("--log"),
});
const createDbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.AppDataSource.initialize();
});
exports.createDbConnection = createDbConnection;