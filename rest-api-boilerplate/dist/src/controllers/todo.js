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
exports.TodoController = void 0;
const routing_controllers_1 = require("routing-controllers");
const inversify_1 = require("inversify");
const logger_1 = require("@src/util/logger");
const todo_1 = require("@src/services/todo");
const todo_2 = require("@src/requests/todo");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const todo_3 = require("@src/models/todo");
let TodoController = class TodoController {
    constructor(logger, service) {
        this.logger = logger;
        this.service = service;
    }
    getOne(id) {
        const foundTodo = this.service.getById(id);
        if (!foundTodo) {
            throw new routing_controllers_1.NotFoundError('todo provided not found');
        }
        return foundTodo;
    }
    getAll() {
        const todoList = this.service.listAll();
        return {
            result: todoList,
            count: todoList.length,
        };
    }
    post(todoToAdd) {
        return this.service.add(todoToAdd);
    }
};
__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_openapi_1.ResponseSchema(todo_3.Todo, { statusCode: 200 }),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "getOne", null);
__decorate([
    routing_controllers_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Post('/'),
    routing_controllers_1.Authorized(),
    __param(0, routing_controllers_1.Body({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_2.TodoNewRequest]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "post", null);
TodoController = __decorate([
    routing_controllers_1.JsonController('/todo'),
    inversify_1.injectable(),
    __param(0, inversify_1.inject(logger_1.AppLogger)), __param(0, inversify_1.named('TodoController')),
    __param(1, inversify_1.inject(todo_1.TodoService)),
    __metadata("design:paramtypes", [logger_1.AppLogger,
        todo_1.TodoService])
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=todo.js.map