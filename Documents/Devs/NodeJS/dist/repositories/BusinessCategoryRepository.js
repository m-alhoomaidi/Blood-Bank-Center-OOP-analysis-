"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessCategoryRepository = void 0;
const BusinessCategory_1 = require("../entities/BusinessCategory");
const BaseRepo_1 = require("./BaseRepo");
class BusinessCategoryRepository extends BaseRepo_1.BaseRepository {
    constructor(dbConnection) {
        const repo = dbConnection.getRepository(BusinessCategory_1.BusinessCategory);
        super(dbConnection, repo);
    }
}
exports.BusinessCategoryRepository = BusinessCategoryRepository;
