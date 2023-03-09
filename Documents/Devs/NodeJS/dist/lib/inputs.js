"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateComplaint = exports.ValidateRateProvider = exports.ValidateResetPassword = exports.ValidateEditWalletBonusFees = exports.ValidateAccountId = exports.ValidateWalletId = exports.ValidateUuid = exports.ValiateForgotPassword = exports.ValidateGetTrxByNumber = exports.ValidateAffiliateCode = exports.ValidateCashierId = exports.ValidateUpdateAffiliate = exports.ValidateCreateAffiliate = exports.ValidateUpdateCategory = exports.ValidateCreateCategory = exports.ValidateUpdateCountry = exports.ValidateCreateCountry = exports.ValidateAdminConsume = exports.ValidateEditProvider = exports.ValidateProviderId = exports.ValidateCcodeParams = exports.ValidateAddCashier = exports.ValidateGetTrxHistoryByAccount = exports.ValidateGetTrxHistory = exports.ValidateGetTrxHistoryByDate = exports.ValidateConsumeCCode = exports.ValidateGenerateCCode = exports.ValidateConsumePoints = exports.ValidateGetWalletTrx = exports.ValidateTransferPoints = exports.ValidateCheckFees = exports.ValidateGeneratePoints = exports.ValidateApproveProvider = exports.ValidateRegisterCustomer = exports.ValidateLogin = exports.ValidateRegisterProvider = void 0;
const joi_1 = __importDefault(require("joi"));
const types_1 = require("../types");
exports.ValidateRegisterProvider = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().min(4).required(),
    countryCode: joi_1.default.string().required(),
    businessName: joi_1.default.string().required(),
    businessEmail: joi_1.default.string().allow("").email(),
    businessAddress: joi_1.default.string().required(),
    businessAge: joi_1.default.number().required(),
    businessCategoryId: joi_1.default.number().required(),
    businessAgeUnit: joi_1.default.string()
        .valid(types_1.BusinessAgeUnit.MONTHS, types_1.BusinessAgeUnit.YEARS)
        .required(),
    businessPhoneNumber: joi_1.default.string()
        .min(12)
        .pattern(/^[+0-9]+$/)
        .required(),
    ownerAddress: joi_1.default.string().required(),
    ownerName: joi_1.default.string().required(),
    ownerNationality: joi_1.default.string().required(),
    ownerEmail: joi_1.default.string().allow("").email(),
    ownerGender: joi_1.default.string().valid("f", "m").required(),
    ownerBirthdate: joi_1.default.date().required(),
    ownerDocumentType: joi_1.default.string()
        .valid("passport", "idcard", "other")
        .required(),
    ownerDocumentNumber: joi_1.default.string().required(),
    language: joi_1.default.string().valid("ar", "en", ""),
    ownerPhoneNumber: joi_1.default.string()
        .min(12)
        .pattern(/^[+0-9]+$/)
        .required(),
    managerAddress: joi_1.default.string(),
    managerName: joi_1.default.string(),
    managerNationality: joi_1.default.string(),
    managerEmail: joi_1.default.string().email(),
    managerGender: joi_1.default.string().valid("f", "m"),
    managerBirthdate: joi_1.default.date(),
    managerDocumentType: joi_1.default.string().valid("passport", "idcard", "other"),
    managerDocumentNumber: joi_1.default.string(),
    managerPhoneNumber: joi_1.default.string()
        .min(12)
        .pattern(/^[+0-9]+$/),
    affiliateCode: joi_1.default.string(),
});
exports.ValidateLogin = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    loginType: joi_1.default.string().valid("provider", "customer", "admin").required(),
});
exports.ValidateRegisterCustomer = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    countryCode: joi_1.default.string().required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().empty("").default(""),
    email: joi_1.default.string().empty("").default(null).email(),
    isVolunteer: joi_1.default.bool().empty("").default(false),
    isInvestor: joi_1.default.bool().empty("").default(false),
    isBusinessOwner: joi_1.default.bool().empty("").default(false),
    phoneNumber: joi_1.default.string()
        .empty("")
        .default(null)
        .min(12)
        .pattern(/^[+0-9]+$/),
    language: joi_1.default.string().valid("ar", "en", ""),
});
exports.ValidateApproveProvider = joi_1.default.object({
    providerId: joi_1.default.number().required(),
});
exports.ValidateGeneratePoints = joi_1.default.object({
    providerId: joi_1.default.number().required(),
    pointAmount: joi_1.default.number().required(),
    pointType: joi_1.default.string().valid("WHITE", "نقاط بيضاء").required(),
    bonus: joi_1.default.number().min(0).max(200).required(),
    fees: joi_1.default.number().min(0).max(200),
});
exports.ValidateCheckFees = joi_1.default.object({
    fromId: joi_1.default.number().required(),
    amount: joi_1.default.number().required(),
});
exports.ValidateTransferPoints = joi_1.default.object({
    walletId: joi_1.default.number().required(),
    recepientAccountNumber: joi_1.default.number().required(),
    amount: joi_1.default.number().min(0).required(),
});
exports.ValidateGetWalletTrx = joi_1.default.object({
    walletId: joi_1.default.number().required(),
    take: joi_1.default.number().default(20),
    skip: joi_1.default.number().default(0),
});
exports.ValidateConsumePoints = joi_1.default.object({
    walletId: joi_1.default.number().required(),
    amount: joi_1.default.number().min(0).required(),
    cashierId: joi_1.default.number(),
});
exports.ValidateGenerateCCode = joi_1.default.object({
    walletId: joi_1.default.number().required(),
    amount: joi_1.default.number().min(0).required(),
});
exports.ValidateConsumeCCode = joi_1.default.object({
    code: joi_1.default.number().required(),
    accountNumber: joi_1.default.number().required(),
    amount: joi_1.default.number().min(1).required(),
});
exports.ValidateGetTrxHistoryByDate = joi_1.default.object({
    fromDate: joi_1.default.date().required(),
    toDate: joi_1.default.date().required(),
    incomingOnly: joi_1.default.boolean().default(false),
    outgoingOnly: joi_1.default.boolean().default(false),
    take: joi_1.default.number().default(10).max(30),
    skip: joi_1.default.number().default(0),
    accountId: joi_1.default.number(),
});
exports.ValidateGetTrxHistory = joi_1.default.object({
    incomingOnly: joi_1.default.boolean().default(false),
    outgoingOnly: joi_1.default.boolean().default(false),
    take: joi_1.default.number().default(10).max(30),
    skip: joi_1.default.number().default(0),
    accountId: joi_1.default.number(),
});
exports.ValidateGetTrxHistoryByAccount = joi_1.default.object({
    incomingOnly: joi_1.default.boolean().default(false),
    outgoingOnly: joi_1.default.boolean().default(false),
    take: joi_1.default.number().default(10).max(10),
    skip: joi_1.default.number().default(0),
});
exports.ValidateAddCashier = joi_1.default.object({
    name: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string()
        .min(12)
        .pattern(/^[+0-9]+$/)
        .required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.ValidateCcodeParams = joi_1.default.object({
    code: joi_1.default.number().required(),
    accountNumber: joi_1.default.number().required(),
});
exports.ValidateProviderId = joi_1.default.object({
    providerId: joi_1.default.number().required(),
});
exports.ValidateEditProvider = joi_1.default.object({
    id: joi_1.default.number().required(),
    isSystem: joi_1.default.boolean().default(false),
    accountId: joi_1.default.number(),
    businessName: joi_1.default.string(),
    businessEmail: joi_1.default.string().allow("").email(),
    businessAddress: joi_1.default.string(),
    businessPhoneNumber: joi_1.default.string()
        .min(12)
        .pattern(/^[+0-9]+$/),
    countryCode: joi_1.default.string(),
    ownerName: joi_1.default.string(),
    ownerEmail: joi_1.default.string().allow("").email(),
    ownerNationality: joi_1.default.string(),
    ownerGender: joi_1.default.string().valid("f", "m"),
    ownerBirthdate: joi_1.default.date(),
    ownerDocumentType: joi_1.default.string().valid("passport", "idcard", "other"),
    ownerDocumentNumber: joi_1.default.string(),
    language: joi_1.default.string().valid("ar", "en", ""),
    status: joi_1.default.valid("ACTIVE", "PENDING", "INACTIVE", "BANNED"),
    ownerPhoneNumber: joi_1.default.string()
        .min(12)
        .pattern(/^[+0-9]+$/),
});
exports.ValidateAdminConsume = joi_1.default.object({
    providerId: joi_1.default.number().required(),
    amount: joi_1.default.number().required(),
});
exports.ValidateCreateCountry = joi_1.default.object({
    nameEn: joi_1.default.string().required(),
    nameAr: joi_1.default.string().required(),
    code: joi_1.default.string().required().max(3),
    lang: joi_1.default.string().valid("ar", "en"),
});
exports.ValidateUpdateCountry = joi_1.default.object({
    id: joi_1.default.number().required(),
    nameEn: joi_1.default.string(),
    nameAr: joi_1.default.string(),
    code: joi_1.default.string(),
    lang: joi_1.default.string().valid("ar", "en"),
}).unknown(true);
exports.ValidateCreateCategory = joi_1.default.object({
    nameEn: joi_1.default.string().required(),
    nameAr: joi_1.default.string().required(),
});
exports.ValidateUpdateCategory = joi_1.default.object({
    id: joi_1.default.number().required(),
    nameEn: joi_1.default.string(),
    nameAr: joi_1.default.string(),
}).unknown(true);
exports.ValidateCreateAffiliate = joi_1.default.object({
    name: joi_1.default.string().required(),
    code: joi_1.default.string().min(2).required(),
});
exports.ValidateUpdateAffiliate = joi_1.default.object({
    name: joi_1.default.string(),
    code: joi_1.default.string().min(4),
}).unknown(true);
exports.ValidateCashierId = joi_1.default.object({
    cashierId: joi_1.default.number().required(),
    status: joi_1.default.valid("ACTIVE", "INACTIVE"),
});
exports.ValidateAffiliateCode = joi_1.default.object({
    affiliateCode: joi_1.default.string().required(),
});
// export const ValidateEditSystemConf = Joi.object({
// key: Joi.string().required(),
// value: Joi.string().required(),
// })
//
exports.ValidateGetTrxByNumber = joi_1.default.object({
    trxNumber: joi_1.default.number().required(),
    accountId: joi_1.default.number().required(),
});
exports.ValiateForgotPassword = joi_1.default.object({
    email: joi_1.default.string().email(),
    phoneNumber: joi_1.default.string()
        .min(12)
        .pattern(/^[+0-9]+$/),
    username: joi_1.default.string().required(),
});
exports.ValidateUuid = joi_1.default.object({
    uuid: joi_1.default.string().required(),
});
exports.ValidateWalletId = joi_1.default.object({
    walletId: joi_1.default.number().required(),
});
exports.ValidateAccountId = joi_1.default.object({
    accountId: joi_1.default.number().required(),
});
exports.ValidateEditWalletBonusFees = joi_1.default.object({
    walletId: joi_1.default.number().required(),
    fees: joi_1.default.number(),
    bonus: joi_1.default.number(),
});
exports.ValidateResetPassword = joi_1.default.object({
    accountId: joi_1.default.number().required(),
    password: joi_1.default.string().required(),
});
exports.ValidateRateProvider = joi_1.default.object({
    providerId: joi_1.default.number().required(),
    rating: joi_1.default.number().min(0).max(5).required(),
    comment: joi_1.default.string(),
});
exports.ValidateComplaint = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
});
