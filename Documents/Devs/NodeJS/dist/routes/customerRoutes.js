"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_joi_validation_1 = require("express-joi-validation");
const customerController_1 = __importDefault(require("../controllers/customerController"));
const inputs_1 = require("../lib/inputs");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const validator = (0, express_joi_validation_1.createValidator)();
const controller = new customerController_1.default();

router
    .route("/new")
    .post(validator.body(inputs_1.ValidateRegisterCustomer), controller.createCustomerAccount);
router.route("/me").get(auth_1.authenticate, auth_1.isActiveUser, controller.getCustomerInfo);
exports.default = {
    router,
    path: "customers",
};