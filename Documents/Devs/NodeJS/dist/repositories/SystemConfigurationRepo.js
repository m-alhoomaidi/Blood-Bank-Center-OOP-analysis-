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
exports.SystemConfigurationRepository = void 0;
const BaseRepo_1 = require("./BaseRepo");
const SystemConfiguration_1 = require("../entities/SystemConfiguration");
class SystemConfigurationRepository extends BaseRepo_1.BaseRepository {
    constructor(dbConnection) {
        const repo = dbConnection.getRepository(SystemConfiguration_1.SystemConfiguration);
        super(dbConnection, repo);
    }
    getByKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({ where: { key } });
        });
    }
    getValueByKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = yield this.getByKey(key);
            return config ? config.value : null;
        });
    }
    updateByKey(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = yield this.getByKey(key);
            if (config) {
                config.value = value;
                return yield this.update(config);
            }
            return config;
        });
    }
}
exports.SystemConfigurationRepository = SystemConfigurationRepository;
