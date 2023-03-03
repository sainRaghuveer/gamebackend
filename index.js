const express = require('express');
require('dotenv').config()
const{connection}=require("./configs/db")
const{UserRoute}=require("./routes/user.routes")
const cors = require('cors');

const app=express()
app.use(cors())

app.use(express.json())

app.use("/users",UserRoute)


app.listen(process.env.PORT,async ()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running at PORT ${process.env.PORT}`)
})