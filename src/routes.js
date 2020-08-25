//global

const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";


// users

const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// videos

const VIDEOS = "/videos";
const UPLOAD = "/upload"
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = '/:id/delete';

// GOOGLE

const GOOGLE = "/auth/google";
const GOOGLE_CALLBACK = "/auth/google/callback";

//facebook
const KAKAO = "/auth/kakao"
const KAKAO_CALLBACK = "/auth/kakao/callback"

// API

const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";


const routes = {
    home : HOME,
    join : JOIN,
    login : LOGIN,
    logout : LOGOUT,
    search : SEARCH,
    users : USERS,
    userDetail: (id) => {
        if(id){
            return `/users/${id}`;      
        }
        else
            return USER_DETAIL;
    },
    editProfile : EDIT_PROFILE,
    changePassword : CHANGE_PASSWORD,
    videos : VIDEOS,
    upload : UPLOAD,
    videoDetail : (id) => {
        if(id){
            return `/videos/${id}`;      
        }
        else{
            return VIDEO_DETAIL;
        }
    },
    editVideo: (id) =>{
        if(id){
            return `/videos/${id}/edit`;        
        }
        else{
            return EDIT_VIDEO
        }
    },
    deleteVideo : (id) =>{
        if(id){
            return `/videos/${id}/delete`
        }
        else{
            return DELETE_VIDEO
        }
    },
    google: GOOGLE,
    googleCallBack: GOOGLE_CALLBACK,
    kakao: KAKAO,
    kakaoCallback: KAKAO_CALLBACK,
    me: ME,
    api: API,
    registerView: REGISTER_VIEW,
    addComment: ADD_COMMENT
};

export default routes;