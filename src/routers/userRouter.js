import express from "express";
import routes from "../routes";
import { 

     userDetail, changePassword, getEditProfile, postEditProfile

 } from "../controller/userController";
 import { onlyPrivate,uploadAvatar } from "../middlewares";
const user_Router = express.Router();



user_Router.get(routes.changePassword,onlyPrivate,changePassword);

user_Router.get(routes.editProfile,onlyPrivate, getEditProfile);
user_Router.post(routes.editProfile,onlyPrivate,uploadAvatar, postEditProfile)




export default user_Router;



