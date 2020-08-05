"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postEditProfile = exports.getEditProfile = exports.changePassword = exports.users = exports.getMe = exports.logout = exports.postKakaoLogin = exports.kakaoLoginCallback = exports.kakaoLogin = exports.postgoogleLogin = exports.googleLoginCallback = exports.googleLogin = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _user = _interopRequireDefault(require("../models/user"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getJoin = function getJoin(req, res) {
  res.render("join", {
    pageTitle: "Join"
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, name, email, password, password2, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;

            if (!(password !== password2)) {
              _context.next = 5;
              break;
            }

            res.render("join", {
              pageTitle: "Join"
            });
            _context.next = 18;
            break;

          case 5:
            _context.prev = 5;
            _context.next = 8;
            return (0, _user["default"])({
              name: name,
              email: email
            });

          case 8:
            user = _context.sent;
            _context.next = 11;
            return _user["default"].register(user, password);

          case 11:
            next();
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](5);
            console.log(_context.t0);
            res.redirect(_routes["default"].home);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 14]]);
  }));

  return function postJoin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageTitle: "Login"
  });
};

exports.getLogin = getLogin;

var postLogin = _passport["default"].authenticate("local", {
  failureRedirect: _routes["default"].login,
  successRedirect: _routes["default"].home
});

exports.postLogin = postLogin;

var googleLogin = _passport["default"].authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/blogger'],
  accessType: 'offline',
  approvalPrompt: 'force'
});

exports.googleLogin = googleLogin;

var googleLoginCallback = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(token, tokenSecret, profile, done) {
    var _profile$_json, sub, name, email, picture, user, newUser;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _profile$_json = profile._json, sub = _profile$_json.sub, name = _profile$_json.name, email = _profile$_json.email, picture = _profile$_json.picture;
            _context2.prev = 1;
            _context2.next = 4;
            return _user["default"].findOne({
              email: email
            });

          case 4:
            user = _context2.sent;

            if (!user) {
              _context2.next = 10;
              break;
            }

            user.googleId = sub;
            user.save();
            _context2.next = 14;
            break;

          case 10:
            _context2.next = 12;
            return _user["default"].create({
              email: email,
              name: name,
              avatarUrl: picture,
              googleId: sub
            });

          case 12:
            newUser = _context2.sent;
            return _context2.abrupt("return", (null, newUser));

          case 14:
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", done(_context2.t0));

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 16]]);
  }));

  return function googleLoginCallback(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.googleLoginCallback = googleLoginCallback;

var postgoogleLogin = function postgoogleLogin(req, res) {
  res.redirect(_routes["default"].home);
};

exports.postgoogleLogin = postgoogleLogin;

var kakaoLogin = _passport["default"].authenticate("kakao");

exports.kakaoLogin = kakaoLogin;

var kakaoLoginCallback = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(accessToken, refreshToken, profile, done) {
    var _profile$_json2, id, _profile$_json2$prope, nickname, profile_image, email, user, newUser;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _profile$_json2 = profile._json, id = _profile$_json2.id, _profile$_json2$prope = _profile$_json2.properties, nickname = _profile$_json2$prope.nickname, profile_image = _profile$_json2$prope.profile_image, email = _profile$_json2.kakao_account.email;
            console.log(profile);
            _context3.prev = 2;
            _context3.next = 5;
            return _user["default"].findOne({
              email: email
            });

          case 5:
            user = _context3.sent;

            if (!(user != null)) {
              _context3.next = 10;
              break;
            }

            user.kakaoId = id;
            user.save();
            return _context3.abrupt("return", cb(null, user));

          case 10:
            _context3.next = 12;
            return _user["default"].create({
              email: email,
              name: nickname,
              avatarUrl: profile_image,
              kakaoId: id
            });

          case 12:
            newUser = _context3.sent;
            return _context3.abrupt("return", cb(null, newUser));

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](2);
            return _context3.abrupt("return", cb(_context3.t0));

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 16]]);
  }));

  return function kakaoLoginCallback(_x8, _x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.kakaoLoginCallback = kakaoLoginCallback;

var postKakaoLogin = function postKakaoLogin(req, res) {
  res.redirect(_routes["default"].home);
};

exports.postKakaoLogin = postKakaoLogin;

var logout = function logout(req, res) {
  req.logout();
  res.redirect(_routes["default"].home);
};

exports.logout = logout;

var getMe = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _user["default"].findById(req.user._id).populate("videos");

          case 3:
            user = _context4.sent;
            res.render("userDetail", {
              pageTitle: "User Detail",
              user: user
            });
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.redirect(_routes["default"].home);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function getMe(_x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getMe = getMe;

var users = function users(req, res) {
  return res.render("users", {
    pageTitle: "Users"
  });
};

exports.users = users;

var changePassword = function changePassword(req, res) {
  return res.render("changePassword", {
    pageTitle: "Change Password"
  });
};

exports.changePassword = changePassword;

var getEditProfile = function getEditProfile(req, res) {
  res.render("editProfile", {
    pageTitle: "Edit Profile"
  });
};

exports.getEditProfile = getEditProfile;

var postEditProfile = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body2, name, email, file, user;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, file = req.file;
            _context5.prev = 1;
            _context5.next = 4;
            return _user["default"].findByIdAndUpdate(req.user._id, {
              name: name,
              email: email,
              avatarUrl: file ? file.path : req.user.avatarUrl
            });

          case 4:
            user = _context5.sent;
            user.save();
            res.redirect(_routes["default"].me);
            _context5.next = 13;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);
            res.render("editProfile", {
              pageTitle: "Edit Profile"
            });

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 9]]);
  }));

  return function postEditProfile(_x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postEditProfile = postEditProfile;