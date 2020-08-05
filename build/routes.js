"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//global
var HOME = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search"; // users

var USERS = "/users";
var USER_DETAIL = "/:id";
var EDIT_PROFILE = "/edit-profile";
var CHANGE_PASSWORD = "/change-password";
var ME = "/me"; // videos

var VIDEOS = "/videos";
var UPLOAD = "/upload";
var VIDEO_DETAIL = "/:id";
var EDIT_VIDEO = "/:id/edit";
var DELETE_VIDEO = '/:id/delete'; // GOOGLE

var GOOGLE = "/auth/google";
var GOOGLE_CALLBACK = "/auth/google/callback"; //f acebook

var KAKAO = "/auth/kakao";
var KAKAO_CALLBACK = "/auth/kakao/callback";
var routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: function userDetail(id) {
    if (id) {
      return "/users/".concat(id);
    } else return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: function videoDetail(id) {
    if (id) {
      return "/videos/".concat(id);
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: function editVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/edit");
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: function deleteVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/delete");
    } else {
      return DELETE_VIDEO;
    }
  },
  google: GOOGLE,
  googleCallBack: GOOGLE_CALLBACK,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  me: ME
};
var _default = routes;
exports["default"] = _default;