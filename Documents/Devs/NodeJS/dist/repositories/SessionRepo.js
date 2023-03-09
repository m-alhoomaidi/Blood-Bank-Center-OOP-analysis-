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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRepository = void 0;
const Session_1 = require("../entities/Session");
const BaseRepo_1 = require("./BaseRepo");
class SessionRepository extends BaseRepo_1.BaseRepository {
    constructor(dbConnection) {
        const repo = dbConnection.getRepository(Session_1.Session);
        super(dbConnection, repo);
    }
    findByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: {
                    token,
                    isValid: true,
                },
            });
        });
    }
    invaliate(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update({ token }, { invaliedAt: new Date() });
        });
    }
    startNewSession(token, accountId, logoutAllOtherSessions = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (logoutAllOtherSessions)
                yield this.repository.update({ accountId, isValid: true }, { isValid: false });
            yield this.repository.insert({ token, accountId });
        });
    }
}
exports.SessionRepository = SessionRepository;
