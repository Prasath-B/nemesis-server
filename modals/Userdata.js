const mongoose = require("mongoose");




const userdataSchema = new mongoose.Schema({
    username:{
        type:String,
        
    },
    mobile:{
        type:Number,
        
    },
    address:{
        type:String,
     
    },
    email:{
        type:String,
      
    }
});

const Userdata = mongoose.model('Userdata',userdataSchema);



module.exports = Userdata;
