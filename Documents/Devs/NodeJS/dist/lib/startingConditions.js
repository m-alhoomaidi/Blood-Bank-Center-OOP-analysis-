// "use strict";
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });

const adminController_1 = require("../controllers/adminController");
const SystemConfiguration_1 = require("../entities/SystemConfiguration");
const Wallet_1 = require("../entities/Wallet");
const typeorm_1 = require("../infrastructure/typeorm");
const AccountRepo_1 = require("../repositories/AccountRepo");
const SystemConfigurationRepo_1 = require("../repositories/SystemConfigurationRepo");
const WalletRepository_1 = require("../repositories/WalletRepository");
const constants_1 = __importDefault(require("../util/constants"));
exports.default = () => async () => {
    // find system account
    const accountRepo = new AccountRepo_1.AccountRepository(typeorm_1.AppDataSource);
    const walletRepo = new WalletRepository_1.WalletRepository(typeorm_1.AppDataSource);
    const configRepo = new SystemConfigurationRepo_1.SystemConfigurationRepository(typeorm_1.AppDataSource);
    // known config
    for (var c in constants_1.default.DEFAULT_SYSTEM_CONF) {
        const config = await configRepo.getByKey(c);
        if (!config) {
            const newConfig = new SystemConfiguration_1.SystemConfiguration();
            newConfig.key = c;
            // @ts-ignore
            newConfig.value = constants_1.default.DEFAULT_SYSTEM_CONF[c];
            await configRepo.create(newConfig);
        }
    }
    const systemAccount = await accountRepo.getSystemAccount();
    const originWallet = await walletRepo.getOriginWallet();
    if (!originWallet) {
        await walletRepo.createOriginWallet(systemAccount.id, await (0, adminController_1.generateWalletNumber)(typeorm_1.AppDataSource.getRepository(Wallet_1.Wallet)));
    }
};
