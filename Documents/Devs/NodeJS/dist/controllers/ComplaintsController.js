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
exports.ComplaintController = void 0;
const ComplaintRepository_1 = require("../repositories/ComplaintRepository");
const Log_1 = __importDefault(require("../util/Log"));
const typeorm_1 = require("../infrastructure/typeorm");
const Complaint_1 = require("../entities/Complaint");
const NotFoundError_1 = require("../errors/NotFoundError");
const types_1 = require("../types");
class ComplaintController {
    newComplaint(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = new ComplaintRepository_1.ComplaintRepository(typeorm_1.AppDataSource);
                let complaint = new Complaint_1.Complaint();
                complaint.description = req.body.description;
                complaint.title = req.body.title;
                if (req.user && req.user.userId)
                    complaint.accountId = Number(req.user.userId);
                complaint = yield repo.create(complaint);
                return res.status(201).json(complaint);
            }
            catch (error) {
                Log_1.default.error(`complaintController.newComplaint: ${error}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({ error: error.message });
                return next();
            }
        });
    }
    // get all unresolved complaints
    getUnresolvedComplaints(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = new ComplaintRepository_1.ComplaintRepository(typeorm_1.AppDataSource);
                const complaints = yield repo.getAllPending();
                return res.status(200).json(complaints);
            }
            catch (error) {
                Log_1.default.error(`complaintController.getUnresolvedComplaints: ${error}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({ error: error.message });
                return next();
            }
        });
    }
    // resolve complaint
    resolveComplaint(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = new ComplaintRepository_1.ComplaintRepository(typeorm_1.AppDataSource);
                let complaint = yield repo.getById(Number(req.params.id));
                if (!complaint)
                    throw new NotFoundError_1.NotFoundError("Complaint not found!");
                complaint.status = types_1.ComplaintStatus.RESOLVED;
                complaint = yield repo.update(complaint);
                return res.status(200).json(complaint);
            }
            catch (error) {
                Log_1.default.error(`complaintController.resolveComplaint: ${error}`);
                res.status((_a = error.statusCode) !== null && _a !== void 0 ? _a : 500).json({ error: error.message });
                return next();
            }
        });
    }
}
exports.ComplaintController = ComplaintController;
