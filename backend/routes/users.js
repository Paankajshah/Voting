const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const decode = require("jwt-decode");


const User = require("../models/users");
users.use(cors());
process.env.SECRET_KEY = "pankaj";

users.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

users.post("/login", (req, res) => {
  const ranNum = Math.floor(Math.random() * 1000000 + 1);
  const today = new Date();
  const schema = Joi.object().keys({

    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(1).max(255).required(),
  });

  const { error } = schema.validate(req.body);
    if (error) return res.send(error.details[0].message);
    
  User.User.findOne({
    email: req.body.email,
  })
    .then( async (user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "vascode7@gmail.com",
              pass: "punkaj9411",
            },
          });
          const payload = {
            _id: user._id,
            name: user.name,
            username: user.username,
              email: user.email,
            otp: ranNum,
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });
            
        const data = {
          token: token,
          userData: payload,
          };
         
            
            let info = await transporter.sendMail({
              from: "'Voting' <vascode7@gmail.com>", // sender address
              to: user.email, // list of receivers
              subject: "Credentials", // Subject line
              html: `<div>
              <div style="text-align:center;">
              <h1 style="color:grey;"> Hi!! ${user.name}</h1>
              
              </div>
              <p>Your otp code is :<b>${ranNum}</b> </p>
              
              </div>`, // html body
            });
          

          res.send(token);
        } else {
          // Passwords don't match
          res.json({ error: "User does not exist" });
        }
      } else {
        res.json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

users.post("/verify", (req, res) => {
  const { token, otpCode } = req.body;
  const tokenData = decode(token);
  const { otp } = tokenData;
  const today = new Date();

  const userData = {
    name: tokenData.name,
    username: tokenData.username,
    email: tokenData.email,
    
  };
  if (otp.toString() === otpCode) {
  res.send(userData)
  } else {
    res.send("Invalid Otp");
  }
  console.log(typeof otp, typeof otpCode);
});
module.exports = users;
