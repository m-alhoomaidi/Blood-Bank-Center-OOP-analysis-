"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.denyProviderInactive = exports.denyUndefined = exports.denyWalletNotOwnerOrCustomer = exports.denyNotWalletOwner = void 0;
const BadInputError_1 = require("../errors/BadInputError");
const NotAllowedError_1 = require("../errors/NotAllowedError");
const types_1 = require("../types");
const denyNotWalletOwner = (userId, wallet, message = "You are not the owner of this wallet") => {
    if (wallet.accountId !== Number(userId))
        throw new NotAllowedError_1.NotAllowedError(message);
};
exports.denyNotWalletOwner = denyNotWalletOwner;
const denyWalletNotOwnerOrCustomer = (userId, wallet, message = "أنت لست مالك هذه المحفظة.") => {
    (0, exports.denyNotWalletOwner)(userId, wallet, message);
    if (wallet.walletType === types_1.WalletTypes.PROVIDER)
        throw new NotAllowedError_1.NotAllowedError("لايمكنك إتمام هذه العملية بهذه المحفظة");
};
exports.denyWalletNotOwnerOrCustomer = denyWalletNotOwnerOrCustomer;
const denyUndefined = (value, message = "Undefined value") => {
    if (value === undefined)
        throw new BadInputError_1.BadInputError(message);
};
exports.denyUndefined = denyUndefined;
const denyProviderInactive = (provider, message = "مزود الخدمة غير مفعّل") => {
    if (provider.status !== types_1.ProviderStatus.ACTIVE)
        throw new NotAllowedError_1.NotAllowedError(message);
};
exports.denyProviderInactive = denyProviderInactive;
