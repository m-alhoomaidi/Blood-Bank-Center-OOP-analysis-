"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadInputError = void 0;
class BadInputError extends Error {
    constructor(message, code) {
        super(message || "Your input was incorrect.");
        this.name = "Bad Input";
        this.code = code || "BAD_INPUT";
        this.statusCode = 400;
    }
}
exports.BadInputError = BadInputError;
