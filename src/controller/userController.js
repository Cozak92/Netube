import routes from "../routes"
import User from "../models/user"
import passport from "passport"

export const getJoin = (req, res) => {
    res.render("join", {pageTitle : "Join"})


};
export const postJoin = async (req, res, next) => {
    const {
      body: { name, email, password, password2 }
    } = req;
    if (password !== password2) {
      req.flash("error", "Passwords don't match");
      res.status(400);
      res.render("join", { pageTitle: "Join" });
    } else {
      try {
        const user = await User({
          name,
          email
        });
        await User.register(user, password);
        next();
      } catch (error) {
        console.log(error);
        res.redirect(routes.home);
      }
    }
  };

export const getLogin = (req, res) => res.render("login", {pageTitle : "Login"})

export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home,
    successFlash: "Welcome to Netube",
    failureFlash: "Can't Login. Check your E-mail or password"
  });

export const googleLogin = passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/blogger'],
    accessType: 'offline', approvalPrompt: 'force'});

export const googleLoginCallback = async (token, tokenSecret, profile, done) => {
    const { 
        _json: {sub, name, email, picture}
    } = profile;

    console.log(profile);

    try{
        const user = await User.findOne({email});
        if(user){
            user.googleId = sub
            user.save();
            return done(null, user);
        }else{
            const newUser = await User.create({
                email: email,
                name : name,
                avatarUrl: picture,
                id: sub
                })
            return done(null, newUser);
        }
    }
    catch(error){
        console.log(error);
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
              return done(null, user);
          }
          
          
          const newUser = await User.create({
              email: email,
              name : nickname,
              avatarUrl: profile_image,
              id: id
              })

          
          return done(null,newUser)
      }
      catch(error){
          return done(error);
      }
  };


export const postKakaoLogin = (req,res) => {
    res.redirect(routes.home);
}






export const logout = (req, res) => {
        req.flash('info', "Logged out. Bye")
        req.logout();
        res.redirect(routes.home);

};

export const getMe = async (req,res) => {
    try {
        const user = await User.findById(req.user.id).populate('videos');
        res.render("userDetail", { pageTitle: "User Detail", user });
      } 
    catch (error) {
        req.flash("error","Sorry, User not Found")
        console.log(error);
        res.redirect(routes.home);
    }
    
}

export const userDetail = async (req, res) => {
    const {
      params: { id }
    } = req;
    try {
      const user = await User.findById(id).populate("videos");
      res.render("userDetail", { pageTitle: "User Detail", user });
    } catch (error) {
      req.flash("error", "User not found");
      res.redirect(routes.home);
    }
  };

export const users = (req, res) => res.render("users", {pageTitle : "Users"});

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      req.flash("error", "Passwords don't match");
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    req.flash("success", "Passwords changed");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't change password");
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
export const getEditProfile =  (req, res) =>{
    res.render("editProfile", {pageTitle : "Edit Profile"});
}

export const postEditProfile = async (req, res) => {
    const {
      body: { name, email },
      file
    } = req;
    try {
      await User.findByIdAndUpdate(req.user.id, {
        name,
        email,
        avatarUrl: file ? file.location : req.user.avatarUrl
      });
      req.flash("success", "Profile updated");
      res.redirect(routes.me);
    } catch (error) {
      req.flash("error", "Can't update profile");
      res.redirect(routes.editProfile);
    }
  };