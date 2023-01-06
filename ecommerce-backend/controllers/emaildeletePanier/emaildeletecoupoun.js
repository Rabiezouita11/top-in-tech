const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const emaildeletecoupoun = (email , date_expiration, prix ) => {

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
    to:email, // list of receivers
    subject: "coupon supprimer 👻", // Subject line", // Subject line
    html: `<!DOCTYPE html>
    <html>
    <head>
    
    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
    
    <style>
    .coupon {
        border: 3px dashed #bcbcbc;
        border-radius: 10px;
        font-family: "HelveticaNeue-Light", "Helvetica Neue Light", 
        "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
        font-weight: 300;
    }
    
    .coupon #head {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        min-height: 56px;
    }
    
    .coupon #footer {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    
    #title .visible-xs {
        font-size: 12px;
    }
    
    .coupon #title img {
        font-size: 30px;
        height: 30px;
        margin-top: 5px;
    }
    
    @media screen and (max-width: 500px) {
        .coupon #title img {
            height: 15px;
        }
    }
    
    .coupon #title span {
        float: right;
        margin-top: 5px;
        font-weight: 700;
        text-transform: uppercase;
    }
    
    .coupon-img {
        width: 100%;
        margin-bottom: 15px;
        padding: 0;
    }
    
    .items {
        margin: 15px 0;
    }
    
    .usd, .cents {
        font-size: 20px;
    }
    
    .number {
        font-size: 40px;
        font-weight: 700;
    }
    
    sup {
        top: -15px;
    }
    
    #business-info ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        text-align: center;
    }
    
    #business-info ul li { 
        display: inline;
        text-align: center;
    }
    
    #business-info ul li span {
        text-decoration: none;
        padding: .2em 1em;
    }
    
    #business-info ul li span i {
        padding-right: 5px;
    }
    
    .disclosure {
        padding-top: 15px;
        font-size: 11px;
        color: #bcbcbc;
        text-align: center;
    }
    
    .coupon-code {
        color: #333333;
        font-size: 11px;
    }
    
    .exp {
        color: #f34235;
    }
    
    .print {
        font-size: 14px;
        float: right;
    }
    
    
    
    
    </style>        
    </head>
    
    <body>
    
    <div class="container">
    
        <div class="row"><h1 class="text-center">Coupon expiré</h1></div>
    
        </div>
    
    
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-default coupon">
                  <div class="panel-heading" id="head">
                    <div class="panel-title" id="title">
                        <img src="https://i.imgur.com/IOL5F9T.png">
                       
                    </div>
                  </div>
                  <div class="panel-body">
                   
                    <div class="col-md-9">
                       
                    </div>
                    <div class="col-md-3">
                        <div class="offer">
                            <span class="usd"><sup>TND</sup></span>
                            <span class="number">${prix}</span>
                           
                        </div>
                    </div>
                    <div class="col-md-12">
                        <p class="disclosure">Not applicable to ICANN fees, taxes, transfers, bulk pricing, premium domains, Search Engine Visibility advertising budget, or gift cards</p>
                    </div>
                  </div>
                  <div class="panel-footer">
                    <div class="coupon-code">
                        Code: cjccoup30
                        <span class="print">
                            <a href="#" class="btn btn-link"><i class="fa fa-lg fa-print"></i> Print Coupon</a>
                        </span>
                    </div>
                    <div class="exp">Expires: ${date_expiration}</div>
                  </div>
                </div>
            </div>
        </div>
        
    
    </div>
    </body>
    </html>
    
    `, // html body
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
    emaildeletecoupoun
};
