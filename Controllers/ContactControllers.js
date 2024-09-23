const asyncHandler = require('express-async-handler')
const Contact = require("../models/contactModel")
const { query } = require('express')

// Get all contact Details
const getContacts =asyncHandler(async(req,res)=>{
    
    const page = req.query.page || 1
    const limit = req.query.limit || 5
  
    const skip = (page-1) * limit
    const contacts = await Contact.find({user_id: req.user.id}).skip(skip).limit(limit)
    res.status(200).json(contacts)
})
 
// Get Create contact Details
const CreateContact =asyncHandler(async(req,res)=>{
    
    const {name,email,phone}= req.body
     if(!email || !name || !phone){
        res.status(400)
        throw new Error("All Fields are required")
     }
     const contact = await Contact.create({
        name:name,email:email,phone:phone ,user_id:req.user.id
     })
     res.status(201).json({message: "Create Contact",Contact:contact})
    // console.log("req while creating new data", req.body)
})

const getContact = asyncHandler( async(req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if(!contact){
    res.status(404).json({message: `Contact Not found `})

    }
    res.status(200).json({message: `Get details for id ${req.params.id}`,contact:contact})
})

const updateContact =asyncHandler( async(req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if(!contact){
    res.status(404).json({message: `Contact Not found `})

    }
    if(contact.user_id.toString() === req.user.id){
        res.status(403).json({message: `User dont have permission to update other contacts`})
    }

    const updatedContact=  await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json({message: `Update for the id ${req.params.id}`,updatedContact:updatedContact})
})

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id); 
    if (!contact) {
        return res.status(404).json({ message: `Contact not found` });
    }

    if(contact.user_id.toString() === req.user.id){
        res.status(403).json({message: `User dont have permission to delete other contacts`})
    }
    await contact.deleteOne({_id:req.params.id});

    res.status(200).json({
        message: `Deleted Successfully`,
        contact: contact 
    });
});


module.exports = { getContact,CreateContact,getContacts,updateContact,deleteContact }