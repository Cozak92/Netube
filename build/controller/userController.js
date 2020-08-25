"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postEditProfile = exports.getEditProfile = exports.postChangePassword = exports.getChangePassword = exports.users = exports.userDetail = exports.getMe = exports.logout = exports.postKakaoLogin = exports.kakaoLoginCallback = exports.kakaoLogin = exports.postgoogleLogin = exports.googleLoginCallback = exports.googleLogin = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = void 0;

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
              _context.next = 6;
              break;
            }

            req.flash("error", "Passwords don't match");
            res.render("join", {
              pageTitle: "Join"
            });
            _context.next = 19;
            break;

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return (0, _user["default"])({
              name: name,
              email: email
            });

          case 9:
            user = _context.sent;
            _context.next = 12;
            return _user["default"].register(user, password);

          case 12:
            next();
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](6);
            console.log(_context.t0);
            res.redirect(_routes["default"].home);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 15]]);
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
  successRedirect: _routes["default"].home,
  successFlash: "Welcome to Netube",
  failureFlash: "Can't Login. Check your E-mail or password"
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
            console.log(profile);
            _context2.prev = 2;
            _context2.next = 5;
            return _user["default"].findOne({
              email: email
            });

          case 5:
            user = _context2.sent;

            if (!user) {
              _context2.next = 12;
              break;
            }

            user.googleId = sub;
            user.save();
            return _context2.abrupt("return", done(null, user));

          case 12:
            _context2.next = 14;
            return _user["default"].create({
              email: email,
              name: name,
              avatarUrl: picture,
              id: sub
            });

          case 14:
            newUser = _context2.sent;
            return _context2.abrupt("return", done(null, newUser));

          case 16:
            _context2.next = 22;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
            return _context2.abrupt("return", done(_context2.t0));

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 18]]);
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
            return _context3.abrupt("return", done(null, user));

          case 10:
            _context3.next = 12;
            return _user["default"].create({
              email: email,
              name: nickname,
              avatarUrl: profile_image,
              id: id
            });

          case 12:
            newUser = _context3.sent;
            return _context3.abrupt("return", done(null, newUser));

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](2);
            return _context3.abrupt("return", done(_context3.t0));

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
  req.flash('info', "Logged out. Bye");
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
            return _user["default"].findById(req.user.id);

          case 3:
            user = _context4.sent;
            res.render("userDetail", {
              pageTitle: "User Detail",
              user: user
            });
            _context4.next = 12;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            req.flash("error", "Sorry, User not Found");
            console.log(_context4.t0);
            res.redirect(_routes["default"].home);

          case 12:
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

var userDetail = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _user["default"].findById(id).populate("videos");

          case 4:
            user = _context5.sent;
            res.render("userDetail", {
              pageTitle: "User Detail",
              user: user
            });
            _context5.next = 12;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            req.flash("error", "User not found");
            res.redirect(_routes["default"].home);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));

  return function userDetail(_x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.userDetail = userDetail;

var users = function users(req, res) {
  return res.render("users", {
    pageTitle: "Users"
  });
};

exports.users = users;

var getChangePassword = function getChangePassword(req, res) {
  return res.render("changePassword", {
    pageTitle: "Change Password"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body2, oldPassword, newPassword, newPassword1;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body2 = req.body, oldPassword = _req$body2.oldPassword, newPassword = _req$body2.newPassword, newPassword1 = _req$body2.newPassword1;
            _context6.prev = 1;

            if (!(newPassword !== newPassword1)) {
              _context6.next = 7;
              break;
            }

            req.flash("error", "Passwords don't match");
            res.status(400);
            res.redirect("/users/".concat(_routes["default"].changePassword));
            return _context6.abrupt("return");

          case 7:
            _context6.next = 9;
            return req.user.changePassword(oldPassword, newPassword);

          case 9:
            res.redirect(_routes["default"].me);
            _context6.next = 17;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            req.flash("error", "Can't change password");
            res.status(400);
            res.redirect("/users/".concat(_routes["default"].changePassword));

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));

  return function postChangePassword(_x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;

var getEditProfile = function getEditProfile(req, res) {
  res.render("editProfile", {
    pageTitle: "Edit Profile"
  });
};

exports.getEditProfile = getEditProfile;

var postEditProfile = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$body3, name, email, file, user;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, file = req.file;
            _context7.prev = 1;
            _context7.next = 4;
            return _user["default"].findByIdAndUpdate(req.user._id, {
              name: name,
              email: email,
              avatarUrl: file ? file.location : req.user.avatarUrl
            });

          case 4:
            user = _context7.sent;
            req.flash("sucesss", "Profile updated");
            user.save();
            res.redirect(_routes["default"].me);
            _context7.next = 15;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](1);
            req.flash("error", "Can't update profile");
            console.log(_context7.t0);
            res.render("editProfile", {
              pageTitle: "Edit Profile"
            });

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 10]]);
  }));

  return function postEditProfile(_x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postEditProfile = postEditProfile;