const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Register User
//@route POST api/uses/register
//@access Public
const registerUser =asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body

if(!username || !email || !password){
    res.status(400).json({message: `All fields are required `})

}
  const userAvailable = await User.findOne({email})
 
  if(userAvailable){
    res.status(400).json({message: `User Already Exists`})
}
    // Hash password
    const hashpassword = await bcrypt.hash(password,10)
    

    const user = await User.create({
        username,email,password:hashpassword
    })
    console.log("User Created Successfully",user)
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }
    else{
        res.status(400).json({message: `User data is not valid`})
    }
    res.json({message: "Register the user"})
})

// Login User
//@route POST api/uses/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All Fields are required' });
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id, 
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "24h" }
        );
        
      
        return res.status(200).json({message:"Token Generated Successfully", accessToken: accessToken });
    } else {
      
        return res.status(401).json({ message: 'Email or password is invalid' });
    }
});


// Current User info
//@route POST api/uses/current
//@access Public
const currentUser =asyncHandler(async(req,res)=>{
    res.json({message: "Current user information",UserData: req.user})
})

module.exports={registerUser, loginUser,currentUser}