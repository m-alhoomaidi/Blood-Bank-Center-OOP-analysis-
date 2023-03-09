"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_joi_validation_1 = require("express-joi-validation");
const transactionController_1 = require("../controllers/transactionController");
const inputs_1 = require("../lib/inputs");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const validator = (0, express_joi_validation_1.createValidator)();
const controller = new transactionController_1.TransactionController();
router.route("/:acn").get(auth_1.authenticate, controller.getAccountInfo);
router
    .route("/transfer")
    .post(auth_1.authenticate, auth_1.isActiveUser, validator.body(inputs_1.ValidateTransferPoints), controller.transferPoints);
router
    .route("/consume")
    .post(auth_1.authenticate, auth_1.isActiveUser, validator.body(inputs_1.ValidateConsumePoints), controller.consumePoint);
router
    .route("/history")
    .post(auth_1.authenticate, validator.body(inputs_1.ValidateGetTrxHistoryByDate), controller.getTrxFromDates);
router
    .route("/history/latest")
    .post(auth_1.authenticate, validator.body(inputs_1.ValidateGetTrxHistory), controller.getLatestTrx);
router
    .route("/find")
    .post(auth_1.authenticate, validator.body(inputs_1.ValidateGetTrxByNumber), controller.getTrxByTrxNumber);
// router.route("/latest").get(authenticate, controller.getTrxFromDates)
exports.default = {
    router,
    path: "trx",
};
