"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_joi_validation_1 = require("express-joi-validation");
const providerController_1 = require("../controllers/providerController");
const inputs_1 = require("../lib/inputs");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const validator = (0, express_joi_validation_1.createValidator)();
const controller = new providerController_1.ProviderController();
router
    .route("/new")
    .post(validator.body(inputs_1.ValidateRegisterProvider), controller.registerNewProvider);
router.route("/me").get(auth_1.authenticate, auth_1.isActiveUser, controller.getProviderInfo);
router.route("/").get(controller.getActiveProviders);
// create cashier
router
    .route("/cashier/add")
    .post(auth_1.authenticate, auth_1.isActiveUser, validator.body(inputs_1.ValidateAddCashier), controller.addCashier);
router
    .route("/cashier/status")
    .post(auth_1.authenticate, auth_1.isActiveUser, validator.body(inputs_1.ValidateCashierId), controller.updateCashierStatus);
// get cashiers
router.route("/cashier").get(auth_1.authenticate, controller.getCashierList);
// get cashiers
router
    .route("/cashier/:providerId")
    .get(auth_1.authenticate, validator.params(inputs_1.ValidateProviderId), controller.getCashierByProviderId);
// customers (UNTESTED)
router
    .route("/customers")
    .get(auth_1.authenticate, auth_1.isActiveUser, controller.getCustomerList);
router
    .route("/affiliate/:code")
    .get(auth_1.authenticate, validator.params(inputs_1.ValidateAffiliateCode), controller.getAffiliate);
router
    .route("/rate")
    .post(auth_1.authenticate, auth_1.isActiveUser, validator.body(inputs_1.ValidateRateProvider), controller.rateProvider);
exports.default = {
    router,
    path: "providers",
};
