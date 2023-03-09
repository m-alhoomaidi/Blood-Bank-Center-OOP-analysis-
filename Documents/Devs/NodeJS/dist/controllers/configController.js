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
const BadInputError_1 = require("../errors/BadInputError");
const typeorm_1 = require("../infrastructure/typeorm");
const BusinessCategoryRepository_1 = require("../repositories/BusinessCategoryRepository");
const CountryRepository_1 = require("../repositories/CountryRepository");
const SystemConfigurationRepo_1 = require("../repositories/SystemConfigurationRepo");
const Log_1 = __importDefault(require("../util/Log"));
class SystemConfigurationController {
    getSystemConf(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get all configuration from the system
                // country list
                const repo = new CountryRepository_1.CountryRepository(typeorm_1.AppDataSource);
                const businessCategoryRepo = new BusinessCategoryRepository_1.BusinessCategoryRepository(typeorm_1.AppDataSource);
                const countries = yield repo.getAll();
                // get all business categories
                const categories = yield businessCategoryRepo.getAll();
                // actual config
                const configRepo = new SystemConfigurationRepo_1.SystemConfigurationRepository(typeorm_1.AppDataSource);
                const config = yield configRepo.getAll();
                res.status(200).json({
                    config: config.reduce((obj, item) => {
                        return Object.assign(Object.assign({}, obj), { [item.key]: item.value });
                    }, {}),
                    countries,
                    categories,
                });
                next();
            }
            catch (error) {
                Log_1.default.error(`SystemConfController.getSystemConf: ${error}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).send(error.message);
                next(error);
            }
        });
    }
    createCountry(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = new CountryRepository_1.CountryRepository(typeorm_1.AppDataSource);
                const country = yield repo.create(req.body);
                res.status(200).json(country);
                next();
            }
            catch (error) {
                Log_1.default.error(`SystemConfController.createCountry: ${error}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).send(error.message);
                next(error);
            }
        });
    }
    updateCountry(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = new CountryRepository_1.CountryRepository(typeorm_1.AppDataSource);
                const country = yield repo.update(req.body);
                res.status(200).json(country);
                next();
            }
            catch (error) {
                Log_1.default.error(`SystemConfController.updateCountry: ${error}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).send(error.message);
                next(error);
            }
        });
    }
    createCategory(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = new BusinessCategoryRepository_1.BusinessCategoryRepository(typeorm_1.AppDataSource);
                const category = yield repo.create(req.body);
                res.status(200).json(category);
                next();
            }
            catch (error) {
                Log_1.default.error(`SystemConfController.createCategory: ${error}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).send(error.message);
                next(error);
            }
        });
    }
    updateCategory(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = new BusinessCategoryRepository_1.BusinessCategoryRepository(typeorm_1.AppDataSource);
                const category = yield repo.update(req.body);
                res.status(200).json(category);
                next();
            }
            catch (error) {
                Log_1.default.error(`SystemConfController.updateCategory: ${error}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).send(error.message);
                next(error);
            }
        });
    }
    updateSystemConf(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { config } = req.body;
                if (!config || typeof config !== "object")
                    throw new BadInputError_1.BadInputError("لقد حدث خطأ ما...");
                const repo = new SystemConfigurationRepo_1.SystemConfigurationRepository(typeorm_1.AppDataSource);
                const arr = [];
                for (const key in config) {
                    arr.push(yield repo.updateByKey(key, config[key]));
                }
                res.status(200).json(arr);
                next();
            }
            catch (error) {
                Log_1.default.error(`SystemConfController.updateSystemConf: ${error}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).send(error.message);
                next(error);
            }
        });
    }
}
exports.default = SystemConfigurationController;
