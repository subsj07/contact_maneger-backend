const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:"string",
        require:[true,"Please add user name"]
    },
    email:{
        type:"string",
        require:[true,"Please add Email Id"],
        unique:[true,"Email address is already taken"]
    },
    password:{
        type:"string",
        require:[true,"Please add user pass word"]
    },
},{timestamps:true})

module.exports= mongoose.model("User",userSchema)