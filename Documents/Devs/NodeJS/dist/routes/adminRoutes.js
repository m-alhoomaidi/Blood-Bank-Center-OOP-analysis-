// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = __importDefault(require("express"));
const express_joi_validation_1 = require("express-joi-validation");
const adminController_1 = __importDefault(require("../controllers/adminController"));
const inputs_1 = require("../lib/inputs");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const validator = (0, express_joi_validation_1.createValidator)();
const controller = new adminController_1.default();
router
    .route("/pending")
    .get(auth_1.authenticate, auth_1.isAdmin, controller.getPendingProviders);
router
    .route("/approve")
    .post(auth_1.authenticate, auth_1.isAdmin, validator.body(inputs_1.ValidateApproveProvider), controller.approveProvider);
router.route("/providers").get(auth_1.authenticate, auth_1.isAdmin, controller.listProviders);
router
    .route("/generateCredit")
    .post(auth_1.authenticate, auth_1.isAdmin, validator.body(inputs_1.ValidateGeneratePoints), controller.generateProviderCredit);
router
    .route("/providers/:providerId")
    .get(auth_1.authenticate, auth_1.isAdmin, validator.params(inputs_1.ValidateProviderId), controller.getProviderById);
router
    .route("/providers/cashier/:providerId")
    .post(auth_1.authenticate, auth_1.isAdmin, validator.params(inputs_1.ValidateProviderId), validator.body(inputs_1.ValidateAddCashier), controller.createProviderCashier);
router
    .route("/providers/:providerId")
    .post(auth_1.authenticate, auth_1.isAdmin, controller.editProvider);
router.route("/").get(auth_1.authenticate, auth_1.isAdmin, controller.getAdminInformation);
router.route("/customers").get(auth_1.authenticate, auth_1.isAdmin, controller.customerList);
router
    .route("/customers/:cid")
    .get(auth_1.authenticate, auth_1.isAdmin, controller.getCustomerById);
router
    .route("/customer/:cid")
    .post(auth_1.authenticate, auth_1.isAdmin, controller.editCustomer);
router
    .route("/consume")
    .post(auth_1.authenticate, auth_1.isAdmin, validator.body(inputs_1.ValidateAdminConsume), controller.consume);
router
    .route("/wallets")
    .get(auth_1.authenticate, auth_1.isAdmin, controller.getSystemWalletList);
router
    .route("/affiliate/new")
    .post(auth_1.authenticate, auth_1.isAdmin, validator.body(inputs_1.ValidateCreateAffiliate), controller.createAffiliate);
router.route("/affiliate").get(auth_1.authenticate, auth_1.isAdmin, controller.listAffiliates);
router
    .route("/affiliate")
    .post(auth_1.authenticate, auth_1.isAdmin, validator.body(inputs_1.ValidateUpdateAffiliate), controller.updateAffiliate);
router
    .route("/maprecords")
    .post(auth_1.authenticate, auth_1.isAdmin, validator.body(inputs_1.ValidateProviderId), controller.mapRecordsToBonuses);
router
    .route("/deactivatewallet")
    .post(auth_1.authenticate, auth_1.isAdmin, validator.body(inputs_1.ValidateWalletId), controller.deactivateWallet);
router
    .route("/activatewallet")
    .post(auth_1.authenticate, auth_1.isAdmin, validator.body(inputs_1.ValidateWalletId), controller.activateWallet);
router
    .route("/deleteaccount")
    .post(auth_1.authenticate, auth_1.isAdmin, validator.body(inputs_1.ValidateAccountId), controller.deleteAccount);
// router.route("/resetpassword")
router
    .route("/editwallet")
    .post(auth_1.authenticate, validator.body(inputs_1.ValidateEditWalletBonusFees), auth_1.isAdmin, controller.editWallet);
router
    .route("/resetpassword")
    .post(auth_1.authenticate, validator.body(inputs_1.ValidateResetPassword), auth_1.isAdmin, controller.resetUserPassword);
exports.default = {
    router,
    path: "admin",
};
