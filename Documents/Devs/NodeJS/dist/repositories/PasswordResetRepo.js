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
exports.PasswordResetRepository = void 0;
const PasswordReset_1 = require("../entities/PasswordReset");
const BaseRepo_1 = require("./BaseRepo");
class PasswordResetRepository extends BaseRepo_1.BaseRepository {
    constructor(dbConnection) {
        const repo = dbConnection.getRepository(PasswordReset_1.PasswordReset);
        super(dbConnection, repo);
    }
    getByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: {
                    uuid
                }
            });
        });
    }
}
exports.PasswordResetRepository = PasswordResetRepository;
