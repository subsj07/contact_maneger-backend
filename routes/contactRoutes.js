const express = require("express")
const router = express.Router()
const {getContact, CreateContact, getContacts, updateContact, deleteContact} = require("./../Controllers/ContactControllers")
const validateToken = require("../Middleware/validateTokenHandler")

router.use(validateToken)
router.route("/").get(getContacts).post(CreateContact)
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)


module.exports =router