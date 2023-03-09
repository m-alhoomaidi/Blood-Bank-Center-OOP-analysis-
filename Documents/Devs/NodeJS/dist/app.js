// "use strict";
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });


// const typeorm_1 = require("./infrastructure/typeorm");
// const express_1 = require("express");
// const constants_1 = __importDefault(require("./util/constants"));
// const fs_1 = __importDefault(require("fs"));
// const Log_1 = __importDefault(require("./util/Log"));
// const cors_1 = require("cors");
// const dotenv_1 = __importDefault(require("dotenv"));
// const path_1 = __importDefault(require("path"));
// const startingConditions_1 = __importDefault(require("./lib/startingConditions"));

// const bodyParser = require('body-parser')
// dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", ".env") });

// const routeFileNames = fs_1.default
//     .readdirSync(`${__dirname}/routes`)
//     .filter((f) => f.endsWith(".js"));
// const main = () => __awaiter(void 0, void 0, void 0, function* () {
//     const PORT = process.env.PORT || 8080;
//     const app = (0, express_1.default)();
//     // const app = express_1()
//     app.use(cors_1());
//     yield (0, typeorm_1.createDbConnection)();
//     const url = `/api/${constants_1.default.API_VERSION}`;
//     app.use(express_1.default.json());
//     app.use((req, _res, next) => {
//         Log_1.default.debug("Request:" + req.method + "\n" + req.url);
//         Log_1.default.debug("token: " + req.headers.authorization);
//         Log_1.default.debug("body: " + JSON.stringify(req.body));
//         next();
//     });
//     for (const route of routeFileNames) {
//         const data = require(`./routes/${route}`).default;
//         app.use(`${url}/${data.path}`, data.router);
//     }
//     yield (0, startingConditions_1.default)();
//     app.listen(PORT, () => Log_1.default.info(`Server running on ${PORT}`));
// });
// main();



var constants = require('./util/constants')
var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var cors = require('cors')
var path = require('path')
var startingConditions = require('./lib/startingConditions')
var log = require('./util/Log').default

const ORM = require('./infrastructure/typeorm')
require('dotenv').config()

var app = express()

const routeFileNames = fs.readdirSync(`${__dirname}/routes`).filter((f) => f.endsWith(".js"));


// Middleware 
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const server = async () => {
    await ORM.createDbConnection()
    app.use((req, _res, next) => {
        log.debug("Request:" + req.method + "\n" + req.url);
        log.debug("token: " + req.headers.authorization);
        log.debug("body: " + JSON.stringify(req.body));
        next();
    });
    const url = `/api/${constants.default.API_VERSION}`;
    for (const route of routeFileNames) {
        var data = require(`./routes/${route}`).default;
        app.use(`${url}/${data.path}`, data.router);
        // console.log(`${url}/${data.path}`)
    }
    app.get('/hello', (req, res) => {
        res.json({
            data: 'welcome'
        })
    })
    // console.log(data)

    await startingConditions.default()
    const PORT = process.env.PORT || 8040

    app.listen(PORT, () => {
        console.log(`The server is listening on port ${PORT}`)
    })
}
server()