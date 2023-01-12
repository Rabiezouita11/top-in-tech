const http = require("http");
const { panier, expererpanier, user } = require("./models");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const PaimentClient = require("./routes/PaimentClient");
const authRouter = require("./routes/auth");
const shedule = require("node-schedule");
const categorieRouter = require("./routes/categorie");
const produitRouter = require("./routes/Produit");
const noterProduitRouter = require("./routes/noterproduit");
const likeRouter = require("./routes/like");
const panierRouter = require("./routes/panier");
const emailRouter = require("./routes/BienvenueEmail");
const quizRouter = require("./routes/quiz");
const promotionRouter = require("./routes/promotion");
const clientAdmin = require("./routes/clientAdmin");
const ContactClient = require("./routes/contactClient");
const deletedimageRouter = require("./routes/deletedimage");
const contactAdmin = require("./routes/contact");
const Totale = require("./routes/totale");
const bodyParser = require("body-parser");
const commandeAdmin = require("./routes/commandeAdmin");
const db = require("./models/index");
const checkout = require("./routes/checkout");
const coupon = require("./routes/coupon");
const avis = require("./routes/avis");
const cors = require("cors");
const { email } = require("./controllers/emaildeletePanier/email");
const {
  emaildeletecoupoun,
} = require("./controllers/emaildeletePanier/emaildeletecoupoun");
const { count } = require("console");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
global.__basedir = __dirname;
// how use toaster in express js

// view engine setup

app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:4200"],
    credentials: true,
  })
);

db.sequelize
  .sync() // { force: true } will drop the table if it already exists
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
db.sequelize.options.logging = false;
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(logger("dev"));
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/email", emailRouter); //path postman : http://localhost:3000/email/

app.use("/deletd", deletedimageRouter); //path postman : http://localhost:3000/deletd/remove/1.jpg )

app.use("/auth", authRouter); //path postman : http://localhost:8080/auth/login
// http://localhost:8080/users
app.use("/categories", categorieRouter); // http://localhost:8080/categories
app.use("/produit", produitRouter); // http://localhost:8080/produit
app.use("/panier", panierRouter); // http://localhost:8080/panier
app.use("/quiz", quizRouter); // http://localhost:8080/quiz

app.use("/promotion", promotionRouter); // http://localhost:8080/promotion
app.use("/clientAdmin", clientAdmin); // http://localhost:8080/clientAdmin
app.use("/ContactAdmin", contactAdmin); // http://localhost:8080/affichercontact")
app.use("/commandeAdmin", commandeAdmin); // http://localhost:8080/commandeAdmin
app.use("/paiment", PaimentClient);
app.use("/checkout", checkout);
app.use("/ContactClient", ContactClient); // http://localhost:8080/ContactClient/ajoutercontact
app.use("/totale", Totale);
app.use("/coupon", coupon);
app.use("/like", likeRouter); // http://localhost:8080/like
app.use("/noterproduit", noterProduitRouter);
app.use("/avis", avis);
// http://localhost:8080/paiment

// const someDate = new Date('2022-12-07 00:49:00');
// shedule.scheduleJob(someDate, function(){
//   console.log('The world is going to end today.');
// });

const myDailyTask = async () => {
  // how recupere user by data and delete this user
  const users = await db.user.findAll();
  users.forEach(async (user) => {
    var someDate = new Date();
    someDate.setDate(someDate.getDate());
    var dateFormated = someDate.toISOString().substr(0, 10);
    if (user.date_supprimer_compte == dateFormated) {
      await db.user.destroy({
        where: {
          id: user.id,
        },
      });
      await db.expererpanier.destroy({
        where: {
          id_user: user.id,
        },
      });
      await db.panier.destroy({
        where: {
          id_user: user.id,
        },
      });
    }
  });
};
const deletecoupon = async () => {
  // how recupere user by data and delete this user
  const coupon = await db.coupon.findAll();
  coupon.forEach(async (coupon) => {
    var someDate = new Date();
    someDate.setDate(someDate.getDate());
    var dateFormated = someDate.toISOString().substr(0, 10);
    // console.log(panierexpererr.date_expiration)
    // console.log(dateFormated)
    if (coupon.date_expiration == dateFormated) {
      findUser = await db.user.findOne({
        where: {
          id: coupon.id_user,
        },
      });
      emaildeletecoupoun(findUser.email, coupon.date_expiration, coupon.prix);
      await db.coupon.destroy({
        where: {
          id: coupon.id,
        },
      });
    }
  });
};
const deletecouponbyetat = async () => {
  // how recupere user by data and delete this user
  const coupon = await db.coupon.findAll();
  coupon.forEach(async (coupon) => {
    // console.log(panierexpererr.date_expiration)
    // console.log(dateFormated)
    if (coupon.etat != "en cours") {
      await db.coupon.destroy({
        where: {
          id: coupon.id,
        },
      });
    }
  });
};

const deletepanier = async () => {
  // how recupere user by data and delete this user
  const panierexpererr = await db.expererpanier.findAll();
  panierexpererr.forEach(async (panierexpererr) => {
    var someDate = new Date();
    someDate.setDate(someDate.getDate() - 1);
    var dateFormated = someDate.toISOString().substr(0, 10);
    // console.log(panierexpererr.date_expiration)
    // console.log(dateFormated)
    if (
      panierexpererr.date_expiration == dateFormated ||
      panierexpererr.date_expiration < dateFormated
    ) {
      const findUser = await db.user.findOne({
        where: {
          id: panierexpererr.id_user,
        },
      });
      const findPanier = await db.panier.findOne({
        where: {
          id_user: panierexpererr.id_user,
        },
      });

      await db.panier.destroy({
        where: {
          id_user: panierexpererr.id_user,
        },
      });
      await db.expererpanier.destroy({
        where: {
          id_user: panierexpererr.id_user,
        },
      });
      email(findUser.nom, findUser.email);
    }
  });
};

const deleteproduitPromotion = async () => {
  // how recupere user by data and delete this user
  const produit = await db.produit.findAll();
  produit.forEach(async (produit) => {
    var someDate = new Date();
    someDate.setDate(someDate.getDate());
    var dateFormated = someDate.toISOString().substr(0, 10);

    if (produit.date_exp == dateFormated) {
      await db.produit.update(
        {
          promotion: "false",
          date_exp: null,
          prix: produit.prixold,
        },
        {
          where: {
            id: produit.id,
          },
        }
      );
    }
  });
};

const deleteexpererpanier = async () => {
  const checkiduserpanierifexist = await db.expererpanier.findAll();
  const checkiduserexperepanierifexist = await db.expererpanier.findAll();
  // if iduser n'existe pas dans panier alors on supprime iduser dans expererpanier
  checkiduserpanierifexist.forEach(async (checkiduserpanierifexist) => {
    const findpanier = await db.panier.findOne({
      where: {
        id_user: checkiduserpanierifexist.id_user,
      },
    });
    if (findpanier == null) {
      await db.expererpanier.destroy({
        where: {
          id_user: checkiduserpanierifexist.id_user,
        },
      });
    }
  });
};

// io.on("connection",function(socket){
//   console.log("a user connected");
//   socket.emit('message', 'Hello from server');

// })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.json({ error: err });
});
const server = http.createServer(app);

server.listen(3000, function () {
  console.log(`server started at 3000`);
});

shedule.scheduleJob("*/2 * * * * * ", () => {
  myDailyTask();
  deleteproduitPromotion();
  deletepanier();
  deleteexpererpanier();
  deletecoupon();
  deletecouponbyetat();
});
const io = require("socket.io")(server);
let numConnectedClients = 0;
io.on("connection", (socket) => {
  console.log("a user connected");

  numConnectedClients++;
  console.log(numConnectedClients);
  socket.broadcast.emit("active-clients-changed", {
    numConnectedClients: numConnectedClients,
    date: new Date(),
  });
  socket.emit("active-clients-changed", {
    numConnectedClients: numConnectedClients,
    date: new Date(),
  });

  socket.on("xx", (data) => {
    socket.emit("active-clients-changed", {
      numConnectedClients: numConnectedClients,
      date: new Date(),
    });
  });

  socket.on("message", (aa) => {
    console.log(aa);
    db.user.findOne({ where: { id: aa } }).then((user) => {
      if (user.banier == "true") {
        console.log("user ban");
        socket.broadcast.emit("ban", { userId: user.id });
      } else {
        console.log("user not ban");
      }
    });
  });

  socket.on("produits", (data) => {
    db.produit.findAll().then((produit) => {
      produit.forEach((produit) => {
        if (produit.quantite == 0) {
          socket.broadcast.emit("produit", { produit: produit });
        }
      });
    });
  });
  socket.on("idusercountprdouit", (data) => {
    db.panier.findOne({ where: { id_user: data } }).then((panier) => {
      db.panier.findOne({ where: { id_user: data } }).then((panier) => {
        db.panier
          .findAll({
            where: { id_user: data },
            include: [
              {
                model: db.produit,
                as: "produit",
              },
            ],
          })
          .then((panier) => {
            var count = 0;
            let total = 0;
            panier.forEach((panier) => {
              count += panier.quantite;
              total += panier.quantite * panier.newprix;
            });

            socket.emit("count", { count: count });
            socket.emit("panier", { panier: panier });
            socket.emit("total", { total: total });
          });
      });
    });
  });

  socket.on("singleavis", (data) => {
    console.log(data.id);
    console.log(data.idUser);
    db.avis
      .findOne({ where: { id_user: data.idUser, id: data.id } })
      .then((avis) => {
        if (avis) {
          socket.broadcast.emit("avis", {
            avis: avis.message,
            idUser: data.idUser,
          });
          console.log(avis);

          db.avis
            .findAll({
              include: [
                {
                  model: user,
                  attributes: ["nom"],
                },
                {
                  model: user,
                  attributes: ["image"],
                },
                {
                  model: user,
                  attributes: ["id"],
                },
              ],
            })
            .then((avis) => {
              socket.broadcast.emit("listavis", avis);
              console.log(avis);
            });
        }
      });
  });

  socket.on("commande", (data) => {
    console.log(data);
    db.commande
      .findOne({
        where: { id_user: data },
        include: [
          {
            model: db.user,

            attributes: ["nom"],
          },
        ],
      })
      .then((commande) => {
        socket.broadcast.emit("commandeAdmin", commande);
      });
  });
  socket.on("commandeClient", (data) => {

    db.produit.findOne({ where: { id: data } }).then((produit) => {
      if (produit.quantite == 0) {
        socket.emit("produithorsStock", { xx: produit });
        console.log(produit);
        db.panier
          .destroy({ where: { id_produit: produit.id } })
          .then((panier) => {
       
          });
          
      }
    });
  });

  socket.on("listproduitClient", (data) => {
    db.panier
      .findAll({
        where: { id_user: data },
        include: [
          {
            model: db.produit,
            attributes: ["image", "nom", "id"],
          },
        ],
      })
      .then((panier) => {
  
        socket.emit("listproduitchechkout", panier);
      });
  });

  //  socket.on('chat', (message) => {
  //   const response =  nltk.generateResponse(message);
  //   socket.emit('chat', response);
  //   console.log(response)
  // });

  // if product is not in stock send notification to admin

  // setInterval(() => {
  //   db.produit.findAll().then(produit => {
  //     produit.forEach(produit => {
  //       if(produit.quantite == 0){
  //         socket.broadcast.emit('produit', { produit: produit });
  //       }
  //     })
  //   })
  // }, 1000);

  // if product is not in stock send notification to admin

  // setInterval(() => {
  //   db.produit.findAll().then(produit => {
  //     produit.forEach(produit => {
  //       if(produit.quantite == 0){
  //         socket.broadcast.emit('produit', { produit: produit });
  //       }
  //     })
  //   })
  // }, 1000);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    numConnectedClients--;
    console.log(numConnectedClients);
    socket.broadcast.emit("active-clients-changed", {
      numConnectedClients: numConnectedClients,
      date: new Date(),
    });
    socket.emit("active-clients-changed", {
      numConnectedClients: numConnectedClients,
      date: new Date(),
    });
  });
  // how recupere user if ban or not
});


 