/** @format */

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("./app");

const api = supertest(app);

//The contents of the index.js file used for starting the application gets simplified as follows:
/* const app = require("./app"); // the actual Express application
const config = require("./utils/config");
const logger = require("./utils/logger");

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
 */
