"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintStatus = exports.BusinessAgeUnit = exports.CashierStatus = exports.ConsumptionCodeStatus = exports.TransactionStatus = exports.WalletTypes = exports.TransactionTypes = exports.WalletStatus = exports.PointTypes = exports.CustomerStatus = exports.ProviderStatus = exports.UserTypes = void 0;
var UserTypes;
(function (UserTypes) {
    UserTypes["PROVIDER"] = "PROVIDER";
    UserTypes["CUSTOMER"] = "CUSTOMER";
    UserTypes["ADMIN"] = "ADMIN";
    UserTypes["CASHIER"] = "CASHIER";
})(UserTypes = exports.UserTypes || (exports.UserTypes = {}));
var ProviderStatus;
(function (ProviderStatus) {
    ProviderStatus["PENDING"] = "PENDING";
    ProviderStatus["ACTIVE"] = "ACTIVE";
    ProviderStatus["INACTIVE"] = "INACTIVE";
    ProviderStatus["BANNED"] = "BANNED";
})(ProviderStatus = exports.ProviderStatus || (exports.ProviderStatus = {}));
var CustomerStatus;
(function (CustomerStatus) {
    CustomerStatus["ACTIVE"] = "ACTIVE";
    CustomerStatus["INACTIVE"] = "INACTIVE";
    CustomerStatus["BANNED"] = "BANNED";
})(CustomerStatus = exports.CustomerStatus || (exports.CustomerStatus = {}));
var PointTypes;
(function (PointTypes) {
    PointTypes["WHITE"] = "\u0646\u0642\u0627\u0637 \u0628\u064A\u0636\u0627\u0621";
})(PointTypes = exports.PointTypes || (exports.PointTypes = {}));
var WalletStatus;
(function (WalletStatus) {
    WalletStatus["ACTIVE"] = "ACTIVE";
    WalletStatus["INACTIVE"] = "INACTIVE";
})(WalletStatus = exports.WalletStatus || (exports.WalletStatus = {}));
var TransactionTypes;
(function (TransactionTypes) {
    TransactionTypes["TRANSFER"] = "TRANSFER";
    TransactionTypes["GIFT"] = "GIFT";
    TransactionTypes["PURCHASE"] = "PURCHASE";
    TransactionTypes["FEES"] = "FEES";
})(TransactionTypes = exports.TransactionTypes || (exports.TransactionTypes = {}));
var WalletTypes;
(function (WalletTypes) {
    WalletTypes["PROVIDER"] = "PROVIDER";
    WalletTypes["CUSTOMER"] = "CUSTOMER";
    WalletTypes["SYSTEM"] = "SYSTEM";
    WalletTypes["ORIGIN"] = "ORIGIN";
})(WalletTypes = exports.WalletTypes || (exports.WalletTypes = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "PENDING";
    TransactionStatus["CONFIRMED"] = "CONFIRMED";
    TransactionStatus["CANCELLED"] = "CANCELLED";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
var ConsumptionCodeStatus;
(function (ConsumptionCodeStatus) {
    ConsumptionCodeStatus["PENDING"] = "PENDING";
    ConsumptionCodeStatus["EXPIRED"] = "EXPIRED";
    ConsumptionCodeStatus["USED"] = "USED";
})(ConsumptionCodeStatus = exports.ConsumptionCodeStatus || (exports.ConsumptionCodeStatus = {}));
var CashierStatus;
(function (CashierStatus) {
    CashierStatus["ACTIVE"] = "ACTIVE";
    CashierStatus["DISABLED"] = "DISABLED";
    CashierStatus["INACTIVE"] = "INACTIVE";
})(CashierStatus = exports.CashierStatus || (exports.CashierStatus = {}));
var BusinessAgeUnit;
(function (BusinessAgeUnit) {
    BusinessAgeUnit["DAYS"] = "DAYS";
    BusinessAgeUnit["MONTHS"] = "MONTHS";
    BusinessAgeUnit["YEARS"] = "YEARS";
})(BusinessAgeUnit = exports.BusinessAgeUnit || (exports.BusinessAgeUnit = {}));
var ComplaintStatus;
(function (ComplaintStatus) {
    ComplaintStatus["PENDING"] = "PENDING";
    ComplaintStatus["RESOLVED"] = "RESOLVED";
})(ComplaintStatus = exports.ComplaintStatus || (exports.ComplaintStatus = {}));
