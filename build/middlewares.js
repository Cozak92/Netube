"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadAvatar = exports.uploadVideo = exports.onlyPrivate = exports.onlyPublic = exports.localMiddleware = void 0;

var _routes = _interopRequireDefault(require("./routes"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var s3 = new _awsSdk["default"].S3({
  accessKeyId: process.env.AWS_KEY,
  secrestAccessKey: process.env.AWS_PRIVATE_KEY
});
var multerVideo = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "netube/videos"
  })
});
var multerAvatar = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "netube/avatars"
  })
});

var localMiddleware = function localMiddleware(req, res, next) {
  res.locals.siteName = "NeTube";
  res.locals.routes = _routes["default"];
  res.locals.loggedUser = req.user || null;
  next();
};

exports.localMiddleware = localMiddleware;

var onlyPublic = function onlyPublic(req, res, next) {
  if (req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
};

exports.onlyPublic = onlyPublic;

var onlyPrivate = function onlyPrivate(req, res, next) {
  if (!req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
};

exports.onlyPrivate = onlyPrivate;
var uploadVideo = multerVideo.single("videoFile");
exports.uploadVideo = uploadVideo;
var uploadAvatar = multerAvatar.single("avatar");
exports.uploadAvatar = uploadAvatar;