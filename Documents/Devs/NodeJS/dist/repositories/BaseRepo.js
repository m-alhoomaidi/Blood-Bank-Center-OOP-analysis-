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
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(dbConnection, repository) {
        this.dbConnection = dbConnection;
        this.repository = repository;
    }
    getById(id, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const result = yield this.repository.findOne({ where: { id }, relations });
            if (!result)
                return undefined;
            return result;
        });
    }
    //   public async getMany(amt: number, from: ) #TODO pagination
    getAll(relations) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.find({ relations: relations });
            return result;
        });
    }
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = this.repository.create(input);
            return yield this.repository.save(t);
        });
    }
    createMany(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.save(input);
            return result;
        });
    }
    update(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const year = yield this.repository.save(input);
            return year;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.delete(id);
        });
    }
}
exports.BaseRepository = BaseRepository;
