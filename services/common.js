const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // `true` for port 465, `false` for all other ports
  auth: {
    user: "ku15101998@gmail.com",
    pass: 'hoix hsxg pidk yylf',
  },
});


const passport = require('passport')
exports.isAuth = (req, res, done) => {
    return passport.authenticate('jwt')
  }

exports.sanitizeUser = (user)=>{
    return {id: user.id, role: user.role}
}

exports.cookieExtractor = function(req){
  let token = null;
  if(req && req.cookies){
    token = req.cookies['jwt']; 
  }
  return token
}

exports.sendMail = async function({to, subject, text, html}){
  //mail endpoint
  const info = await transporter.sendMail({
    from: '"Mrjeanswala" <maddison53@ethereal.email>', // sender address
    to: to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });
  return info;


}


