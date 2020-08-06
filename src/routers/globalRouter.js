import express from "express";
import routes from "../routes";
import { home, search } from "../controller/videoController";
import { postKakaoLogin,kakaoLogin,getJoin, getLogin, logout,postJoin,postLogin,googleLogin, postgoogleLogin,getMe } from "../controller/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";
import passport from "passport"

const global_Router = express.Router();

global_Router.get(routes.join,onlyPublic, getJoin);
global_Router.post(routes.join,onlyPublic, postJoin, postLogin);

global_Router.get(routes.login,onlyPublic, getLogin);
global_Router.post(routes.login,onlyPublic, postLogin);

global_Router.get(routes.home, home);
global_Router.get(routes.search, search);
global_Router.get(routes.logout,onlyPrivate, logout);

global_Router.get(routes.google, googleLogin);
global_Router.get(routes.googleCallBack, passport.authenticate('google',{
    failureRedirect: routes.join, successFlash: "Welcom to Netube",
    }),
    postgoogleLogin
);

global_Router.get(routes.me, getMe);


global_Router.get(routes.kakao, kakaoLogin);
global_Router.get(routes.kakaoCallback, passport.authenticate('kakao',{
    failureRedirect: routes.join , successFlash: "Welcom to Netube",
    }),
    postKakaoLogin
);

export default global_Router;
