"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.routingControllersOptions = void 0;
const routing_controllers_1 = require("routing-controllers");
const container_1 = require("@src/util/container");
const authorization_1 = require("@src/middlewares/authorization");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_winston_1 = __importDefault(require("express-winston"));
const express_request_id_1 = __importDefault(require("express-request-id"));
const hpp_1 = __importDefault(require("hpp"));
const config_1 = require("./util/config");
const logger_1 = require("./util/logger");
const appContainer = new container_1.AppContainer();
appContainer.bindAll();
routing_controllers_1.useContainer(container_1.AppIoC);
const expressApp = express_1.default();
expressApp.use(helmet_1.default());
expressApp.use(express_request_id_1.default({ headerName: 'x-request-id', setHeader: true, attributeName: 'requestId' }));
expressApp.use(hpp_1.default({ checkBody: false }));
const appConfig = container_1.AppIoC.get(config_1.AppConfig);
const expressWinstonLogger = new logger_1.WinstonLoggerFactory(appConfig);
expressApp.use(express_winston_1.default.logger(expressWinstonLogger.getRequestLogger()));
const baseDir = __dirname;
const routePrefix = appConfig.has('app.routePrefix')
    ? appConfig.get('app.routePrefix')
    : undefined;
exports.routingControllersOptions = {
    routePrefix,
    cors: true,
    controllers: [baseDir + '/controllers/*.{js,ts}'],
    middlewares: [baseDir + '/middlewares/*.{js,ts}'],
    validation: {
        whitelist: true,
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
    },
    development: appConfig.isDev,
    authorizationChecker: authorization_1.authorizationChecker,
    currentUserChecker: authorization_1.currentUserChecker,
    defaultErrorHandler: false,
};
exports.app = routing_controllers_1.useExpressServer(expressApp, exports.routingControllersOptions);
//# sourceMappingURL=app.js.map