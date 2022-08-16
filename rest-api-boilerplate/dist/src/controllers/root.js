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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootController = void 0;
const routing_controllers_1 = require("routing-controllers");
const inversify_1 = require("inversify");
const logger_1 = require("@src/util/logger");
const package_json_1 = __importDefault(require("../../package.json"));
let RootController = class RootController {
    constructor(logger) {
        this.logger = logger;
        this.packageVersion = package_json_1.default.version;
    }
    ping() {
        this.logger.debug('called ping');
        return { success: true };
    }
    tag() {
        this.logger.debug('called tag');
        return { version: this.packageVersion };
    }
};
__decorate([
    routing_controllers_1.Get('/ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RootController.prototype, "ping", null);
__decorate([
    routing_controllers_1.Get('/tag'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RootController.prototype, "tag", null);
RootController = __decorate([
    routing_controllers_1.JsonController(''),
    inversify_1.injectable(),
    __param(0, inversify_1.inject(logger_1.AppLogger)), __param(0, inversify_1.named('RootController')),
    __metadata("design:paramtypes", [logger_1.AppLogger])
], RootController);
exports.RootController = RootController;
//# sourceMappingURL=root.js.map