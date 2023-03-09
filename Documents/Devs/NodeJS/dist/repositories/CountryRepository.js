"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryRepository = void 0;
const Country_1 = require("../entities/Country");
const BaseRepo_1 = require("./BaseRepo");
class CountryRepository extends BaseRepo_1.BaseRepository {
    constructor(dbConnection) {
        const repo = dbConnection.getRepository(Country_1.Country);
        super(dbConnection, repo);
    }
}
exports.CountryRepository = CountryRepository;
