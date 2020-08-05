import passport from "passport";
import User from "./models/user";
import GoogleStrategty from "passport-google-oauth20"
import kakaoStrategty from "passport-kakao"
import dotenv from "dotenv"
import {googleLoginCallback,kakaoLoginCallback} from "./controller/userController"
import routes from "./routes";
dotenv.config();

passport.use(User.createStrategy());

passport.use(new GoogleStrategty({

    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `http://localhost:4000${routes.googleCallBack}`
    },googleLoginCallback)
    
);

passport.use(new kakaoStrategty({

    clientID: process.env.KAKAO_ID,
    clientSecret: process.env.KAKAO_SECRET,
    callbackURL: `http://localhost:4000${routes.kakaoCallback}`
    },kakaoLoginCallback)
)

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());