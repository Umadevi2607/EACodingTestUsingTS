"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = exports.WinstonLoggerFactory = void 0;
const inversify_1 = require("inversify");
const winston_1 = require("winston");
const config_1 = require("./config");
let WinstonLoggerFactory = class WinstonLoggerFactory {
    constructor(config) {
        this.config = config;
        const appName = this.config.get('app.name');
        if (typeof appName !== 'string') {
            throw new Error('Expected app.name');
        }
        this.appName = appName;
        this.version = this.config.version;
        this.currentEnv = this.config.env;
    }
    get defaultMetadata() {
        return {
            service: this.appName,
            'tag.env': this.currentEnv,
            'tag.version': this.version,
        };
    }
    createLogger(innerLabel) {
        const loggerInstance = winston_1.createLogger({
            defaultMeta: this.defaultMetadata,
            format: winston_1.format.json(),
            transports: [],
        });
        if (this.config.isDev) {
            loggerInstance.add(new winston_1.transports.Console({
                level: 'debug',
                format: winston_1.format.combine(winston_1.format.label({ label: innerLabel }), winston_1.format.timestamp(), winston_1.format.colorize(), winston_1.format.prettyPrint(), this.localFormat()),
            }));
        }
        else {
        }
        return loggerInstance;
    }
    getRequestLogger() {
        const winstonInstance = this.createLogger('http');
        const expressWinstonOpts = {
            winstonInstance,
            baseMeta: this.defaultMetadata,
            headerBlacklist: ['x-api-key', 'authorization'],
            bodyBlacklist: ['email', 'password'],
            metaField: 'http',
            responseWhitelist: ['statusCode', 'body'],
            level: (_req, res) => {
                return res.statusCode !== 500 ? 'info' : 'error';
            },
            dynamicMeta: (_req, res) => {
                let requestId;
                if (res.hasHeader('x-request-id')) {
                    requestId = res.getHeader('x-request-id');
                }
                return { requestId };
            },
        };
        return expressWinstonOpts;
    }
    localFormat() {
        return winston_1.format.printf((info) => {
            return `${info.timestamp} [${info.service}]${info.label ? '[' + info.label + ']' : ''} ${info.level}: ${info.message} ${info.meta && info.meta.length ? JSON.stringify(info.meta, null, 2) : ''} ${info.http ? '\n' + JSON.stringify(info.http, null, 2) : ''}`;
        });
    }
};
WinstonLoggerFactory = __decorate([
    __param(0, inversify_1.inject(config_1.AppConfig)),
    __metadata("design:paramtypes", [config_1.AppConfig])
], WinstonLoggerFactory);
exports.WinstonLoggerFactory = WinstonLoggerFactory;
let AppLogger = class AppLogger {
    constructor(config, callerName) {
        this.config = config;
        this.loggerFactory = new WinstonLoggerFactory(config);
        this.logger = this.loggerFactory.createLogger(callerName);
    }
    debug(msg, ...meta) {
        return this.logger.debug(msg, { meta });
    }
    info(msg, ...meta) {
        return this.logger.info(msg, { meta });
    }
    error(msg, ...meta) {
        return this.logger.error(msg, { meta });
    }
    warn(msg, ...meta) {
        return this.logger.warn(msg, { meta });
    }
    log(level, msg, ...meta) {
        return this.logger.log(level, msg, { meta });
    }
};
AppLogger = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(config_1.AppConfig)),
    __metadata("design:paramtypes", [config_1.AppConfig, Object])
], AppLogger);
exports.AppLogger = AppLogger;
//# sourceMappingURL=logger.js.map