"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContainer = exports.AppIoC = void 0;
const inversify_1 = require("inversify");
const root_1 = require("@src/controllers/root");
const todo_1 = require("@src/controllers/todo");
const todo_2 = require("@src/services/todo");
const error_handler_1 = require("@src/middlewares/error-handler");
const config_1 = require("./config");
const logger_1 = require("./logger");
exports.AppIoC = new inversify_1.Container({ defaultScope: 'Singleton' });
class AppContainer {
    constructor() {
        this.container = exports.AppIoC;
    }
    bindAll() {
        this.bindUtils();
        this.bindMiddlewares();
        this.bindServices();
        this.bindControllers();
    }
    bindUtils() {
        this.container.bind(config_1.AppConfig).toSelf();
        this.container
            .bind(logger_1.AppLogger)
            .toDynamicValue((context) => {
            const namedMetadata = context.currentRequest.target.getNamedTag();
            const named = namedMetadata && namedMetadata.value ? namedMetadata.value : undefined;
            const config = this.container.get(config_1.AppConfig);
            return new logger_1.AppLogger(config, named);
        })
            .inTransientScope();
    }
    bindMiddlewares() {
        this.container.bind(error_handler_1.CustomErrorHandler).toSelf();
    }
    bindControllers() {
        this.container.bind(root_1.RootController).toSelf();
        this.container.bind(todo_1.TodoController).toSelf();
    }
    bindServices() {
        this.container.bind(todo_2.TodoService).toSelf();
    }
}
exports.AppContainer = AppContainer;
//# sourceMappingURL=container.js.map