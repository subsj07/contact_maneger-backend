const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"User"
    }
    ,
    name:{
        type:"string",
        require:[true,"Please add contact name"]
    },
    email:{
        type:"string",
        require:[true,"Please add Email Id"]
    },
    phone:{
        type:"string",
        require:[true,"Please add phone number"]
    },
},{timestamps:true})

module.exports= mongoose.model("Contact",contactSchema)