"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(message, code) {
        super(message || "Data Not Found");
        this.name = "Not Found";
        this.code = code || "NOT_FOUND";
        this.statusCode = 404;
    }
}
exports.NotFoundError = NotFoundError;
