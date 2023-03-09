// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.NotAllowedError = void 0;

class NotAllowedError extends Error {
    constructor(message, code) {
        super(message || "Operation not allowed");
        this.name = "Not Allowed";
        this.code = code || "NOT_ALLOWED";
        this.statusCode = 403;
    }
}
exports.NotAllowedError = NotAllowedError;
