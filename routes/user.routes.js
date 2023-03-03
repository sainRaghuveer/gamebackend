const express = require('express');
const { UserModel } = require("../models/user.model")

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticate } = require('../middleware/token');


const UserRoute = express.Router()


UserRoute.post("/register", async (req, res) => {
  const { name, email, password } = req.body
  try {
    const isAlready = await UserModel.findOne({ email })
    if (isAlready) {
      res.send("Please login user is already registered")
    }
    else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ "msg": "Enter valid email and password" })
        }
        else {
          const user = new UserModel({ name, email, password: hash })
          user.save()
          res.status(200).json({
            success: true,
            users,
          })
        }
      });
    }

  } catch (error) {
    res.send({ "msg": error.message })
  }

})

UserRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email })
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        if (result) {
          var token = jwt.sign({ user: user[0]._id }, 'game', { expiresIn: "3h" })
          res.send({ "msg": "Login Successful", "token": token })
        }
        else {
          res.send({ "msg": "wrong password" })
        }
      })
    }
    else {
      res.send({ "msg": "Wrong email" })
    }

  } catch (error) {
    res.send({ "msg": error.message })
  }
})

UserRoute.get("/all", async (req, res) => {
  try {
    const users = await UserModel.find()
    res.status(200).json({
      success: true,
      users,
    })
  } catch (error) {
    res.status(400).json({
      success: false
    })
  }
})

UserRoute.get("/single/:id", async (req, res) => {
  try {
    const user=await UserModel.findById(req.params.id)
    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(400).json({
      success: false
    })
  }
})

module.exports = {
  UserRoute
}