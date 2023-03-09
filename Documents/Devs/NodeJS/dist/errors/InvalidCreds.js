"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsError = void 0;
class InvalidCredentialsError extends Error {
    constructor(message, code) {
        super(message || "Inavlid Credentials");
        this.name = "Invalid Credentials";
        this.code = code || "INVALID_CREDENTIALS";
        this.statusCode = 403;
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
