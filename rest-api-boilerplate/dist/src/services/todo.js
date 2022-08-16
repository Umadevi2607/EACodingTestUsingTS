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
exports.TodoService = void 0;
const inversify_1 = require("inversify");
const logger_1 = require("@src/util/logger");
const routing_controllers_1 = require("routing-controllers");
const todo_1 = require("@src/models/todo");
let TodoService = class TodoService {
    constructor(logger) {
        this.logger = logger;
        this.todoStorage = [];
    }
    add(todoToAdd) {
        this.logger.debug(`got a new todo to add`, { todo: todoToAdd });
        const id = todoToAdd.id;
        const todoFound = this.getById(id);
        if (todoFound) {
            throw new routing_controllers_1.BadRequestError(`duplicate todo id found ${id}`);
        }
        const newTodo = todo_1.Todo.create(todoToAdd);
        this.todoStorage.push(newTodo);
        return todoToAdd;
    }
    getById(id) {
        this.logger.debug(`looking up ${id} todo`);
        const todoRes = this.todoStorage.find((thisTodo) => thisTodo.id === id);
        this.logger.debug('found todo', { todo: todoRes });
        return todoRes;
    }
    listAll() {
        return this.todoStorage;
    }
};
TodoService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(logger_1.AppLogger)), __param(0, inversify_1.named('TodoService')),
    __metadata("design:paramtypes", [logger_1.AppLogger])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.js.map