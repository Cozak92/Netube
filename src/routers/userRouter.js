import express from "express";
import routes from "../routes";
import { 

     userDetail, getEditProfile, postEditProfile, getChangePassword, postChangePassword

 } from "../controller/userController";
 import { onlyPrivate,uploadAvatar } from "../middlewares";
const user_Router = express.Router();



user_Router.get(routes.editProfile,onlyPrivate, getEditProfile);
user_Router.post(routes.editProfile,onlyPrivate,uploadAvatar, postEditProfile)

user_Router.get(routes.changePassword, onlyPrivate, getChangePassword);
user_Router.post(routes.changePassword, onlyPrivate, postChangePassword);
user_Router.get(routes.userDetail(), userDetail);




export default user_Router;



