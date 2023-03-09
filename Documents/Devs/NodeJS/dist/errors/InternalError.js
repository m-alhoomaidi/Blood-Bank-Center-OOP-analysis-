"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = void 0;
class InternalError extends Error {
    constructor(message, code) {
        super(message || "Something went wrong...");
        this.name = "Internal Error";
        this.code = code || "INTERNAL_ERROR";
        this.statusCode = 500;
    }
}
exports.InternalError = InternalError;
