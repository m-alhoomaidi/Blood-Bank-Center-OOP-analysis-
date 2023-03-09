"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runExpressServer = exports.createExpressApp = void 0;
const express_1 = __importDefault(require("express"));


const createExpressApp = () => {
    const app = (0, express_1.default)();
    return app;
};
exports.createExpressApp = createExpressApp;
const runExpressServer = (server) => {
    const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};
exports.runExpressServer = runExpressServer;