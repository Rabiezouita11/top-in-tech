const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const sendemail = async (req, res) => {
  let email  = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "", // generated ethereal user
      pass: "",
    },
  });
  const mailOptions = {
    from: "rabie zouita", // sender address
    to: email.email, // list of receivers
    subject: "Wellcome from TO IN TECH 👻", // Subject line
    html: `<h1>Hi ${email.nom}</h1><br>
    <h4>Thanks for joining us</h4>`, // html body
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Error" });
    } else {
      res.json({ message: "Email sent!!!" });
    }
  });
};

module.exports = {
  sendemail
};
