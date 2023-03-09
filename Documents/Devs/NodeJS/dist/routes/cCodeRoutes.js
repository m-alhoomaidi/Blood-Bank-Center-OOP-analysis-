"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_joi_validation_1 = require("express-joi-validation");
const cCodeController_1 = __importDefault(require("../controllers/cCodeController"));
const inputs_1 = require("../lib/inputs");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const validator = (0, express_joi_validation_1.createValidator)();
const controller = new cCodeController_1.default();
// #TODO get code BEFORE ConsumptionCodeController
router
    .route("/:accountNumber/:code")
    .get(auth_1.authenticate, auth_1.isActiveUser, validator.params(inputs_1.ValidateCcodeParams), controller.checkCode);
router
    .route("/consume")
    .post(auth_1.authenticate, auth_1.isActiveUser, validator.body(inputs_1.ValidateConsumeCCode), controller.consumeCode);
router
    .route("/")
    .post(auth_1.authenticate, auth_1.isActiveUser, validator.body(inputs_1.ValidateConsumePoints), controller.generateConsumeCode);
exports.default = {
    router,
    path: "ccode",
};
