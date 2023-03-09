// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });

exports.InvalidSessionError = void 0;
class InvalidSessionError extends Error {
    constructor(message, code) {
        super(message || "Invalid Session");
        this.name = "Invalid Session";
        this.code = code || "INVALID_SESSION";
        this.statusCode = 403;
    }
}
exports.InvalidSessionError = InvalidSessionError;