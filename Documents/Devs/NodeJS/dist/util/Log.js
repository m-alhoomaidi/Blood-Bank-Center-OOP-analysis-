"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colorts/lib/string");
class Log {
}
exports.default = Log;
Log.debug = (message) => console.log(`[Debug]: `.cyan + message);
Log.error = (message) => console.log(`[Error]: `.red + `${message}`);
Log.info = (message) => console.log(`[Info]: ${message}`);
Log.warning = (message) => console.log(`[Warning]: `.yellow + message);
