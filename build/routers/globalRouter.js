"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controller/videoController");

var _userController = require("../controller/userController");

var _middlewares = require("../middlewares");

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var global_Router = _express["default"].Router();

global_Router.get(_routes["default"].join, _middlewares.onlyPublic, _userController.getJoin);
global_Router.post(_routes["default"].join, _middlewares.onlyPublic, _userController.postJoin, _userController.postLogin);
global_Router.get(_routes["default"].login, _middlewares.onlyPublic, _userController.getLogin);
global_Router.post(_routes["default"].login, _middlewares.onlyPublic, _userController.postLogin);
global_Router.get(_routes["default"].home, _videoController.home);
global_Router.get(_routes["default"].search, _videoController.search);
global_Router.get(_routes["default"].logout, _middlewares.onlyPrivate, _userController.logout);
global_Router.get(_routes["default"].google, _userController.googleLogin);
global_Router.get(_routes["default"].googleCallBack, _passport["default"].authenticate('google', {
  failureRedirect: _routes["default"].join,
  successFlash: "Welcom to Netube"
}), _userController.postgoogleLogin);
global_Router.get(_routes["default"].me, _userController.getMe);
global_Router.get(_routes["default"].kakao, _userController.kakaoLogin);
global_Router.get(_routes["default"].kakaoCallback, _passport["default"].authenticate('kakao', {
  failureRedirect: _routes["default"].join,
  successFlash: "Welcom to Netube"
}), _userController.postKakaoLogin);
var _default = global_Router;
exports["default"] = _default;