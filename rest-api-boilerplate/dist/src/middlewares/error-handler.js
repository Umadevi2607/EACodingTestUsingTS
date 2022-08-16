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
exports.CustomErrorHandler = void 0;
const routing_controllers_1 = require("routing-controllers");
const inversify_1 = require("inversify");
const logger_1 = require("@src/util/logger");
const config_1 = require("@src/util/config");
let CustomErrorHandler = class CustomErrorHandler {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
    }
    error(error, request, response) {
        const logLevel = error.httpCode === 500 ? 'error' : 'warn';
        this.logger.log(logLevel, `${error.name} error`, { error, stack: error.stack });
        const jsonResponse = {
            success: false,
            message: error.message,
            errors: error.errors ? error.errors : [],
        };
        if (error.errors && error.errors.length > 0) {
            const validationErrors = error.errors;
            let prettyErrors = '';
            for (const [index, validateErrorObject] of validationErrors.entries()) {
                const constraints = Object.keys(validateErrorObject.constraints);
                prettyErrors += constraints
                    .map((inner) => validateErrorObject.constraints[inner])
                    .join(', ');
                if (index !== validationErrors.length - 1) {
                    prettyErrors += ', ';
                }
            }
            jsonResponse.message = prettyErrors;
        }
        const statusCode = error.httpCode || 500;
        if (statusCode === 500) {
            jsonResponse.message = 'Internal server error, please try again';
        }
        if (!this.config.isProd) {
            jsonResponse.stack = error.stack;
        }
        response.status(statusCode).json(jsonResponse);
    }
};
CustomErrorHandler = __decorate([
    routing_controllers_1.Middleware({ type: 'after' }),
    inversify_1.injectable(),
    __param(0, inversify_1.inject(config_1.AppConfig)),
    __param(1, inversify_1.inject(logger_1.AppLogger)), __param(1, inversify_1.named('ErrHandler')),
    __metadata("design:paramtypes", [config_1.AppConfig,
        logger_1.AppLogger])
], CustomErrorHandler);
exports.CustomErrorHandler = CustomErrorHandler;
//# sourceMappingURL=error-handler.js.map