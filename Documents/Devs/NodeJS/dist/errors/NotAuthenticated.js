"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthenticatedError = void 0;
class NotAuthenticatedError extends Error {
    constructor(message, code) {
        super(message || "Not Authenticated");
        this.name = "Not Authenticated";
        this.code = code || "NO_AUTH";
        this.statusCode = 401;
    }
}
exports.NotAuthenticatedError = NotAuthenticatedError;
