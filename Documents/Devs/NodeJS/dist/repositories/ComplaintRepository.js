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
exports.ComplaintRepository = void 0;
const types_1 = require("../types");
const Complaint_1 = require("../entities/Complaint");
const BaseRepo_1 = require("./BaseRepo");
class ComplaintRepository extends BaseRepo_1.BaseRepository {
    constructor(dbConnection) {
        const repo = dbConnection.getRepository(Complaint_1.Complaint);
        super(dbConnection, repo);
    }
    setToResolved(complaintId) {
        return __awaiter(this, void 0, void 0, function* () {
            const complaint = yield this.getById(complaintId);
            if (!complaint)
                return null;
            complaint.status = types_1.ComplaintStatus.RESOLVED;
            return this.repository.save(complaint);
        });
    }
    getAllPending() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: {
                    status: types_1.ComplaintStatus.PENDING,
                },
            });
        });
    }
}
exports.ComplaintRepository = ComplaintRepository;
