import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    kakaoId: Number,
    googleId: String
});

userSchema.plugin(passportLocalMongoose,{usernameField: "email"});

const model = mongoose.model("User",userSchema);


export default model;