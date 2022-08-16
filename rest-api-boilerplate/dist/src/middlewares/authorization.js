"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserChecker = exports.authorizationChecker = void 0;
const container_1 = require("@src/util/container");
const logger_1 = require("@src/util/logger");
function authorizationChecker(action, roles) {
    const logger = container_1.AppIoC.getNamed(logger_1.AppLogger, 'authorizationChecker');
    logger.info(`check auth for roles: ${roles}`);
    const apiKey = action.request.headers['x-api-key'];
    return apiKey === 'test-api-key';
}
exports.authorizationChecker = authorizationChecker;
async function currentUserChecker(action) {
    const logger = container_1.AppIoC.getNamed(logger_1.AppLogger, 'currentUserChecker');
    logger.info('lookup example user');
    const apiKey = action.request.headers['x-api-key'];
    return {
        apiKey,
        email: 'test@example.com',
        username: 'example',
    };
}
exports.currentUserChecker = currentUserChecker;
//# sourceMappingURL=authorization.js.map