users.post("/register", (req, res) => {
  const ranNum = Math.floor(Math.random() * 1000000 + 1);
  const today = new Date();
  const schema = Joi.object().keys({
    first_name: Joi.string().min(1).max(50).required(),
    last_name: Joi.string().min(1).max(50).required(),
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(1).max(255).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);

  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    otp: ranNum,
    created: today,
  };

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        const messageData = {
          from: "Authenticate <pshah9411@gmail.com>",
          to: userData.email,
          subject: "pankaj",
          text: `Your OTP code is ${ranNum}`,
        };
        mg.messages().send(messageData, function (error, body) {
          console.log(body);
        });
        let token = jwt.sign(userData, process.env.SECRET_KEY, {
          expiresIn: 1460,
        });

        const data = {
          token: token,
          userData: userData,
        };
        res.send(data);
        // res.json({ status: user.email + 'Registered!' })
      } else {
        res.send("User already exists");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});
