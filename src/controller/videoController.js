
import routes from "../routes";
import Video from "../models/video"

export const home = async (req, res) => {

    try{
        const videos = await Video.find({}).sort({_id:-1});
        res.render("home", {pageTitle : "HOME", videos});
    }

    catch(error){
        console.log(error);
        res.render("home", {pageTitle : "HOME", videos});
    }

};
export const search = async (req, res) =>{
    const {
        query: {term : searchingBy}
    } = req;

    let videos = [];
    try{
        videos = await Video.find({title:{$regex : searchingBy, $options:"i"}})
    }
    catch(error){
        console.log(error);
    }
    res.render("Search" , {pageTitle : "Search", searchingBy, videos})
}
export const videos = (req, res) => res.render("videos" , {pageTitle : "Video Home"});


export const postUpload = async (req, res) => {

    try{
        const { 
            body:{ title, description},
            videoFile: {location}
        } = req;

    

        
        
        const newVideo = await Video.create({
            fileUrl: location,
            title: title,
            description: description,
            creator: req.user.id
        });
        req.user.videos.push(newVideo.id);
        req.user.save();
        res.redirect(routes.videoDetail(newVideo.id));
    }
    catch(error){
        res.redirect(routes.home);
    }
    


    
    
};

export const getUpload = (req, res) => {
    res.render("upload" , {pageTitle : "Video Upload"})
};


export const videoDetail = async (req, res) => {
    const {
        params: {id}
    } = req;

   try{
    const video = await Video.findById(id);
    res.render("videoDetail" , {pageTitle : `${video.title}`,video});
   }

   catch(error){
    res.redirect(routes.home);
   }
}
    
export const getEditVideo = async (req, res) => {
    const {
        params: {id}
    } = req;
    try{
        const video = await Video.findById(id);
        res.render("editVideo" , {pageTitle : `Edit ${video.title}`,video});

    }
    catch(error){
        res.redirect(routes.home);
    }
};

export const postEditVideo = async (req,res) => {
    const {
        params: {id},
        body: {title,description}
    }=req;
    try{
        await Video.findOneAndUpdate({_id:id},{title, description});
        res.redirect(routes.videoDetail(id));
    }
    catch(error){
        res.redirect(routes.home);
    }
};

export const deleteVideo = async (req, res) => {
    const {
        params: {id}
    } = req;

    try {
        await Video.findOneAndDelete({_id : id})
    }
    catch(error){
    }
    res.redirect(routes.home);
    res.render("deleteVideo" , {pageTitle : "video delete"})

}