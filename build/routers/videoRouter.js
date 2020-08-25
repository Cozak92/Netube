"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controller/videoController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var video_Router = _express["default"].Router(); // upload


video_Router.get(_routes["default"].upload, _middlewares.onlyPrivate, _videoController.getUpload);
video_Router.post(_routes["default"].upload, _middlewares.onlyPrivate, _middlewares.uploadVideo, _videoController.postUpload);
video_Router.get(_routes["default"].videoDetail(), _videoController.videoDetail);
video_Router.get(_routes["default"].deleteVideo(), _middlewares.onlyPrivate, _videoController.deleteVideo);
video_Router.get(_routes["default"].editVideo(), _middlewares.onlyPrivate, _videoController.getEditVideo);
video_Router.post(_routes["default"].editVideo(), _middlewares.onlyPrivate, _videoController.postEditVideo);
var _default = video_Router;
exports["default"] = _default;