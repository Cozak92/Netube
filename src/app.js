
import path from "path";
import flash from "express-flash"
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookie_parser from "cookie-parser";
import body_parser from "body-parser";
import userRouter from "./routers/userRouter";
import video_Router from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localMiddleware } from "./middlewares";
import passport from "passport";
import "./passport";
import MongoStore from "connect-mongo";
import mongoose from "mongoose"
import session from "express-session";
import dotenv from "dotenv"
dotenv.config();

const app = express();

const cokieStore = MongoStore(session)
// middleware

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.join(__dirname,"views"))
app.use("/static", express.static(path.join(__dirname,"static")));
app.use(cookie_parser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended:true }));
app.use(morgan("dev")); 
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:true,
    saveUninitialized:false,
    store: new cokieStore({mongooseConnection:mongoose.connection})
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(localMiddleware);




//

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos,video_Router);


export default app;