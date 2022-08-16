"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("@src/app");
const config_1 = require("@src/util/config");
const container_1 = require("@src/util/container");
const logger_1 = require("@src/util/logger");
const config = container_1.AppIoC.get(config_1.AppConfig);
const logger = container_1.AppIoC.get(logger_1.AppLogger);
const PORT = config.get('app.port');
app_1.app.listen(PORT, () => {
    logger.info(`started server: http://localhost:${PORT}/`);
});
//# sourceMappingURL=server.js.map