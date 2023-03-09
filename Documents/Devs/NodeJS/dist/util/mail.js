"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const Log_1 = __importDefault(require("./Log"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", "..", ".env") });
const fromMail = process.env.RESET_PASSWORD_ADDRESS;
var transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: fromMail,
        pass: process.env.RESET_PASSWORD_PW,
    },
});
// transporter.sendMail(mailOptions, function(error, info){
// if (error) {
// console.log(error);
// } else {
// console.log('Email sent: ' + info.response);
// }
// });
const mail = (to, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: fromMail,
        to,
        subject,
        text,
    };
    const response = yield transporter.sendMail(mailOptions);
    Log_1.default.debug("MAIL SENT");
    console.log(response);
});
exports.mail = mail;
