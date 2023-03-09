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
// exports.isActiveUser = exports.isAdmin = exports.authenticate = void 0;

const NotAuthenticated_1 = require("../errors/NotAuthenticated");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Log_1 = __importDefault(require("../util/Log"));
const types_1 = require("../types");
const typeorm_1 = require("../infrastructure/typeorm");
const config_1 = __importDefault(require("../lib/config"));
const NotAllowedError_1 = require("../errors/NotAllowedError");
const Provider_1 = require("../entities/Provider");
const NotFoundError_1 = require("../errors/NotFoundError");
const Customer_1 = require("../entities/Customer");
const SessionRepo_1 = require("../repositories/SessionRepo");
const InvalidSessionError_1 = require("../errors/InvalidSessionError");


const authenticate = (req, res, next) => async () => {
    var _a, _b, _c;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        const repo = new SessionRepo_1.SessionRepository(typeorm_1.AppDataSource);
        if (!token)
            throw new NotAuthenticated_1.NotAuthenticatedError();
        const session = await repo.findByToken(token);
        Log_1.default.debug("FOUND SEESSION");
        console.log(session);
        if (!session)
            throw new InvalidSessionError_1.InvalidSessionError("لقد تم تسجيل خروجك من حسابك");
        const decoded = jsonwebtoken_1.default.verify(token, (_b = config_1.default.JWT_SECRET) !== null && _b !== void 0 ? _b : "");
        req.user = decoded;
        next();
    }
    catch (err) {
        Log_1.default.error(`middleware.authenticate: ${err.message}`);
        res
            .status((_c = err.statusCode) !== null && _c !== void 0 ? _c : 401)
            .json({ message: err.message, code: err.code });
    }
};
exports.authenticate = authenticate;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const user = req.user;
        if (!user)
            throw new NotFoundError_1.NotFoundError("User not found");
        if (user.type !== types_1.UserTypes.ADMIN)
            throw new NotAllowedError_1.NotAllowedError();
        next();
    }
    catch (err) {
        Log_1.default.error(`middleware.isAdmin: ${err.message}`);
        res
            .status((_d = err.statusCode) !== null && _d !== void 0 ? _d : 401)
            .json({ message: err.message, code: err.code });
    }
});
exports.isAdmin = isAdmin;
const isActiveUser = (req, res, next) => async () => {
    var _e;
    try {
        const userId = req.user.userId;
        if (!userId)
            throw new NotAuthenticated_1.NotAuthenticatedError();
        if (req.user.type === types_1.UserTypes.ADMIN) {
            // admins are active by default
            return next();
        }
        const repo = req.user.type === types_1.UserTypes.PROVIDER
            ? typeorm_1.AppDataSource.getRepository(Provider_1.Provider)
            : typeorm_1.AppDataSource.getRepository(Customer_1.Customer);
        const user = await repo.findOneBy({ accountId: Number(userId) });
        if (!user)
            throw new NotAuthenticated_1.NotAuthenticatedError();
        if (user.status !== types_1.ProviderStatus.ACTIVE &&
            user.status !== types_1.CustomerStatus.ACTIVE)
            throw new NotAllowedError_1.NotAllowedError("هذا الحساب غير مفعّل");
        next();
    }
    catch (err) {
        Log_1.default.error(`middleware.isActiveProvider: ${err.message}`);
        res
            .status((_e = err.statusCode) !== null && _e !== void 0 ? _e : 401)
            .json({ message: err.message, code: err.code });
    }
}
exports.isActiveUser = isActiveUser;
