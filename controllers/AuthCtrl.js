const { User } = require("../Model/user");
const crypto = require("crypto");
const { sanitizeUser, sendMail } = require("../services/common");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET-KEY";

exports.createUser = async (req, res) => {
  try {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({
          ...req.body,
          password: hashedPassword,
          salt: salt,
        });
        const doc = await user.save();
        req.login(sanitizeUser(doc), (err) => {
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
            res
              .cookie("jwt", token, {
                expire: new Date(Date.now() + 900000),
                httpOnly: true,
              })
              .status(201)
              .json({ id: doc.id, role: doc.role });
          }
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  const user = req.user;
  console.log(req.user);
  res
    .cookie("jwt", req.user.token, {
      expire: new Date(Date.now() + 900000),
      httpOnly: true,
    })
    .status(201)
    .json({ id: user.id, role: user.role, token: user.token });
};

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};
exports.resetPasswordRequest = async (req, res) => {
    const resetpage = 'http://localhost:3000/reset-password';
    const subject = "reset Paswsword for mjw";
    const html = `<p>click <a href='${resetpage}'>here</a> to reset your password</p>`
  if (req.body.email){
  const response = await  sendMail({
        to: req.body.email,
        subject,
        html
    })
    res.json(response)
  } else {
    res.sendStatus(401);
  }
};
