const cloudinary=require("cloudinary").v2;
require("dotenv").config();

 function cloudinaryConnect(){
      try{
        cloudinary.config({
            cloud_name: "bazeercloud",
            api_key: "869273418911881",
            api_secret:"xm9spPQFO4q5HxkYyk5xEzT6KF4"
        });
        console.log("Cloudinary connected successfully.");
      }catch(error){
        console.log(error);
        
      }
}
module.exports=cloudinaryConnect;