const router = require("express").Router();
const User = require("../model/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const userMailExist = await User.findOne({
      email: newUser.email
    })
    const userNameExist = await User.findOne({
      username: newUser.username
    })
    if (userNameExist) {
      return res.status(476).json({
        error: "Nazwa użytkownika jest już zajęta"
      });
    } else if (userMailExist) {
      return res.status(477).json({
        error: "Email jest już zajęty"
      });
    } else {
      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    }
  } catch (err) {
    //return res.status(409).json({message:"Nazwa użytkownika jest już zajęta"});    
    return res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username
    });
    if (!user) {
      return res
        .status(401)
        .json("Wrong credentials(login)!");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword != req.body.password) {
      return res
        .status(401)
        .json("Wrong credentials(password))!");
    }

    const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC, {
        expiresIn: "3d"
      }
    );
    const {
      password,
      ...others
    } = user._doc;

    res.status(200).json({
      ...others,
      accessToken
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;