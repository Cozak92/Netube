import routes from "../routes"
import User from "../models/user"
import passport from "passport"

export const getJoin = (req, res) => {
    res.render("join", {pageTitle : "Join"})


};
export const postJoin = async (req,res, next) =>{
    const {
        body:{name,email,password,password2}
    } = req;

    if (password !== password2){
        res.render("join",{pageTitle: "Join"});
    }
    else {
        try{
            const user = await User({
                name,email
            });
            await User.register(user,password);
            next();

        }
        catch(error){
            console.log(error)
            res.redirect(routes.home)
        }
        
    }
     

};
export const getLogin = (req, res) => res.render("login", {pageTitle : "Login"})
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
  });

export const googleLogin = passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/blogger'],
    accessType: 'offline', approvalPrompt: 'force'});

export const googleLoginCallback = async (token, tokenSecret, profile, done) => {
    const { _json: {sub, name, email, picture}} = profile;

    try{
        const user = await User.findOne({email});
        if(user){
            user.googleId = sub
            user.save();
        }else{
            const newUser = await User.create({
                email: email,
                name : name,
                avatarUrl: picture,
                googleId: sub
                })
            return (null, newUser);
        }
    }
    catch(error){
        return done(error)
    }
        
};


export const postgoogleLogin = (req,res) => {
    res.redirect(routes.home);
};

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (accessToken, refreshToken, profile, done) => {
    const { _json: {id ,properties: {nickname,profile_image} ,kakao_account : {email}}}
        = profile;

        console.log(profile);


      try{
          const user = await User.findOne({email:email});
          if(user != null){
              user.kakaoId = id;
              user.save();
              return cb(null, user);
          }
          
          
          const newUser = await User.create({
              email: email,
              name : nickname,
              avatarUrl: profile_image,
              kakaoId: id
              })

          
          return cb(null,newUser)
      }
      catch(error){
          return cb(error);
      }
  };


export const postKakaoLogin = (req,res) => {
    res.redirect(routes.home);
}






export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);

};

export const getMe = async (req,res) => {
    try {
        const user = await User.findById(req.user._id).populate("videos");
        res.render("userDetail", { pageTitle: "User Detail", user });
      } catch (error) {
        res.redirect(routes.home);
      }
    
}

export const users = (req, res) => res.render("users", {pageTitle : "Users"});

export const changePassword = (req, res) => res.render("changePassword", {pageTitle : "Change Password"});
export const getEditProfile =  (req, res) =>{
    res.render("editProfile", {pageTitle : "Edit Profile"});
}

export const postEditProfile = async (req, res) =>{
    const {
        body: {name,email},
        file
    } = req;

    
    try{
        const user = await User.findByIdAndUpdate(req.user._id,{
            name,
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl
        });
        user.save();
        res.redirect(routes.me);
        
        

    }
    catch(error){
        console.log(error);
        res.render("editProfile", {pageTitle : "Edit Profile"});
    }
}