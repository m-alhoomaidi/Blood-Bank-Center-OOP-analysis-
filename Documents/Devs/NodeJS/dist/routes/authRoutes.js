"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_joi_validation_1 = require("express-joi-validation");
const authController_1 = require("../controllers/authController");
const inputs_1 = require("../lib/inputs");
const router = express_1.default.Router();
const validator = (0, express_joi_validation_1.createValidator)();
const controller = new authController_1.AuthController();
router.route("/login").post(validator.body(inputs_1.ValidateLogin), controller.login);
router.route("/reset-password").post(validator.body(inputs_1.ValiateForgotPassword), controller.sendResetPasswordEmail);
router.route("/reset-password/:uuid").get(validator.params(inputs_1.ValidateUuid), controller.resetPasswordCheck);
// router.route("/test").post(authenticate, controller.test)
exports.default = {
    router,
    path: "auth",
};
