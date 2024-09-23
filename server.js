const express = require("express")
const dotenv = require("dotenv").config()
const contactRoutes = require("./routes/contactRoutes")
const userRoutes = require("./routes/userRoutes")

const { errorHandler } = require("./Middleware/errorHandler")
const connectDB = require("./config/dbConnection")

connectDB()
const app = express()
app.use(express.json())

 PORT = process.env.PORT || 5000

app.use("/api/contacts", contactRoutes)
app.use("/api/users", userRoutes)
app.use(errorHandler)
app.listen(PORT,()=>{
 console.log(`Server Running on PORT ${PORT}`)
})