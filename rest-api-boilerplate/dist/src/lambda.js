"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require('module-alias/register');
const app_1 = require("@src/app");
const awsServerlessExpress = require('aws-serverless-express');
const server = awsServerlessExpress.createServer(app_1.app);
exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
};
//# sourceMappingURL=lambda.js.map