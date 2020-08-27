"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addCommentForm = document.getElementById('jsAddComment');
var commentList = document.getElementById('jsCommentList');
var commentNumber = document.getElementById('jsCommentNumber');
var addCommentButton = document.getElementById('jsAddCommentButton');
var removeCommentButton = document.querySelectorAll('.fa-times');

var increaseNumbet = function increaseNumbet() {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

var sendComment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(comment) {
    var videoId, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            videoId = window.location.href.split("/videos/")[1];
            videoId = videoId.replace('?', '');
            _context.next = 4;
            return (0, _axios["default"])({
              url: "/api/".concat(videoId, "/comment"),
              method: 'post',
              data: {
                comment: comment
              }
            });

          case 4:
            response = _context.sent;

            if (response.status === 200) {
              addComment(comment, response.data.commentId);
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendComment(_x) {
    return _ref.apply(this, arguments);
  };
}();

var removeComment = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(element) {
    var videoId, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            videoId = window.location.href.split("/videos/")[1];
            videoId = videoId.replace('?', '');
            _context2.next = 4;
            return (0, _axios["default"])({
              url: "/api/".concat(videoId, "/comment/remove"),
              method: 'post',
              data: {
                commentId: element.id
              }
            });

          case 4:
            response = _context2.sent;

            if (response.status === 200) {
              element.remove();
              commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
            } else {
              console.log(error);
            }

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function removeComment(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var handleSubmit = function handleSubmit(event) {
  event.preventDefault(); //새로고침 방지

  var commentInput = addCommentForm.querySelector('input');
  var comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
}; // const handleCommentButton = () => {
//     console.log(addCommentForm.submit);
//     // addCommentForm.submit();
// }


var handleRemoveComment = function handleRemoveComment(event) {
  console.log(event.path[1].id, _this);
  removeComment(event.path[1]);
};

var addComment = function addComment(comment, commentId) {
  var li = document.createElement("li");
  var span = document.createElement("span");
  var div = document.createElement("div");
  var i = document.createElement("i");
  li.setAttribute("id", commentId);
  div.classList.add("video__comment-box");
  i.classList.add("fas");
  i.classList.add("fa-times");
  span.innerHTML = comment;
  div.append(span);
  li.append(div);
  li.append(i); // commentList.append(li);

  commentList.prepend(li);
  li.addEventListener("click", handleRemoveComment);
  increaseNumbet();
};

var init = function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  addCommentButton.addEventListener("click", handleSubmit);
  removeCommentButton.forEach(function (element) {
    element.addEventListener("click", handleRemoveComment);
  });
};

if (addCommentForm) {
  init();
}