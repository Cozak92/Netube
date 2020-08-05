import express from "express";
import routes from "../routes";
import { 

    videoDetail, deleteVideo, getEditVideo, getUpload ,postUpload,postEditVideo

} from "../controller/videoController";

import {uploadVideo,onlyPrivate} from "../middlewares"


const video_Router = express.Router();

// upload
video_Router.get(routes.upload, onlyPrivate,getUpload);
video_Router.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

video_Router.get(routes.videoDetail(), videoDetail);
video_Router.get(routes.deleteVideo(),onlyPrivate, deleteVideo);

video_Router.get(routes.editVideo(),onlyPrivate, getEditVideo);
video_Router.post(routes.editVideo(), onlyPrivate, postEditVideo);



export default video_Router;
