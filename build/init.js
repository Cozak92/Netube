"use strict";

var _app = _interopRequireDefault(require("./app"));

require("./db");

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./models/video");

require("./models/comment");

require("./models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var PORT = process.env.PORT || 4000;

var handelListening = function handelListening() {
  return console.log("\u2705  Listening on : http://localhost:".concat(PORT));
};

_app["default"].listen(PORT, handelListening);