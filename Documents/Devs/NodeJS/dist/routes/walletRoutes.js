"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_joi_validation_1 = require("express-joi-validation");
const walletController_1 = require("../controllers/walletController");
const inputs_1 = require("../lib/inputs");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const validator = (0, express_joi_validation_1.createValidator)();
const controller = new walletController_1.WalletController();
router.route("/").get(auth_1.authenticate, controller.myWallets);
router
    .route("/trx")
    .post(auth_1.authenticate, validator.body(inputs_1.ValidateGetWalletTrx), controller.getWalletTransactions);
exports.default = {
    router,
    path: "wallet",
};
