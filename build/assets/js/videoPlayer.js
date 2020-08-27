"use strict";

var _getBlobDuration = _interopRequireDefault(require("get-blob-duration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var videoContainer = document.getElementById("jsVideoPlayer");
var videoPlayer = document.querySelector("#jsVideoPlayer video");
var playBtn = document.getElementById("jsPlayButton");
var volumeBtn = document.getElementById("jsVolumeButton");
var fullScrnBtn = document.getElementById("jsFullScreen");
var currentTime = document.getElementById("currentTime");
var totalTime = document.getElementById("totalTime");
var volumeRange = document.getElementById("jsVolume");
var progress = document.getElementById("progress");
var currentVolume = 5.0;
var totalTimeString;

var registerView = function registerView() {
  var videoId = window.location.href.split("/videos/")[1];
  fetch("/api/".concat(videoId, "/view"), {
    method: "POST"
  });
};

var handlePlayClick = function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};

var volumeDraw = function volumeDraw(value) {
  if (value > 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value > 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};

var handleVolumeClick = function handleVolumeClick() {
  if (!videoPlayer.muted || currentVolume === "0") {
    videoPlayer.muted = true;
    volumeRange.value = 0;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    volumeDraw(currentVolume);
    videoPlayer.muted = false;
    volumeRange.value = currentVolume;
  }
};

var exitFullScreen = function exitFullScreen() {
  fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScrnBtn.addEventListener("click", goFullScreen);

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

var goFullScreen = function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }

  fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScrnBtn.removeEventListener("click", goFullScreen);
  fullScrnBtn.addEventListener("click", exitFullScreen);
};

var formatDate = function formatDate(seconds) {
  var secondsNumber = parseInt(seconds, 10);
  var hours = Math.floor(secondsNumber / 3600);
  var minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  var totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0".concat(hours);
  }

  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }

  if (totalSeconds < 10) {
    totalSeconds = "0".concat(totalSeconds);
  }

  return "".concat(hours, ":").concat(minutes, ":").concat(totalSeconds);
};

var getCurrentTime = function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
};

var handleEnded = function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
};

var handleDrag = function handleDrag(event) {
  var value = event.target.value;
  currentVolume = value;
  videoPlayer.volume = value;
  volumeDraw(value);
};

var handleTimeUpdate = function handleTimeUpdate() {
  getCurrentTime();
  progress.setAttribute("max", totalTimeString);
  progress.value = videoPlayer.currentTime;
};

var handleProgress = function handleProgress(e) {
  var pos = e.offsetX / progress.offsetWidth;
  videoPlayer.currentTime = pos * totalTimeString;
};

var setTotalTime = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var blob, duration;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(videoPlayer.duration === Infinity || videoPlayer.duration === NaN)) {
              _context.next = 10;
              break;
            }

            _context.next = 3;
            return fetch(videoPlayer.src).then(function (response) {
              return response.blob();
            });

          case 3:
            blob = _context.sent;
            _context.next = 6;
            return (0, _getBlobDuration["default"])(blob);

          case 6:
            duration = _context.sent;
            totalTimeString = duration;
            _context.next = 11;
            break;

          case 10:
            totalTimeString = videoPlayer.duration;

          case 11:
            totalTime.innerHTML = formatDate(Math.floor(totalTimeString));
            handleTimeUpdate();

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function setTotalTime() {
    return _ref.apply(this, arguments);
  };
}();

var init = function init() {
  currentVolume = 0.5;
  videoPlayer.volume = 0.5;
  videoPlayer.load();
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScrnBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
  progress.addEventListener("click", handleProgress);
  videoPlayer.addEventListener("timeupdate", handleTimeUpdate);
};

if (videoContainer) {
  init();
}