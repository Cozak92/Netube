"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _user = _interopRequireDefault(require("./models/user"));

var _passportGoogleOauth = _interopRequireDefault(require("passport-google-oauth20"));

var _passportKakao = _interopRequireDefault(require("passport-kakao"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _userController = require("./controller/userController");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_passport["default"].use(_user["default"].createStrategy());

_passport["default"].use(new _passportGoogleOauth["default"]({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: "http://localhost:4000".concat(_routes["default"].googleCallBack)
}, _userController.googleLoginCallback));

_passport["default"].use(new _passportKakao["default"]({
  clientID: process.env.KAKAO_ID,
  clientSecret: process.env.KAKAO_SECRET,
  callbackURL: "http://localhost:4000".concat(_routes["default"].kakaoCallback)
}, _userController.kakaoLoginCallback));

_passport["default"].serializeUser(_user["default"].serializeUser());

_passport["default"].deserializeUser(_user["default"].deserializeUser());