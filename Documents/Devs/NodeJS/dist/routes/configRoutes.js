"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_joi_validation_1 = require("express-joi-validation");
const configController_1 = __importDefault(require("../controllers/configController"));
const inputs_1 = require("../lib/inputs");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const controller = new configController_1.default();
const validator = (0, express_joi_validation_1.createValidator)();
router.route("/").get(controller.getSystemConf);
router.route("/").post(auth_1.authenticate, auth_1.isAdmin, controller.updateSystemConf);
router
    .route("/country/new")
    .post(auth_1.authenticate, auth_1.isAdmin, validator.body(inputs_1.ValidateCreateCountry), controller.createCountry);
router
    .route("/country")
    .post(auth_1.authenticate, auth_1.isAdmin, validator.body(inputs_1.ValidateUpdateCountry), controller.updateCountry);
router
    .route("/category/new")
    .post(auth_1.authenticate, auth_1.isAdmin, validator.body(inputs_1.ValidateCreateCategory), controller.createCategory);
router
    .route("/category")
    .post(auth_1.authenticate, auth_1.isAdmin, validator.body(inputs_1.ValidateUpdateCategory), controller.updateCategory);
exports.default = {
    router,
    path: "config",
};
