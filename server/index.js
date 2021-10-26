const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = 14700;
process.env.SECRET_KEY = "abc"; // used to encode the jwt

app.use(
  cors({
    // origin: "http://127.0.0.1:4200", to allow spesific url
    origin: "*",
    methods: ["GET", "PUT", "POST", "UPDATE", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authCredentials = require("./attributes/auth-credentials.attr");
const authCtrl = require("./ctrls/auth.ctrl");
app.use("/auth", authCredentials, authCtrl);

const userCredentials = require("./attributes/user-credentials.attr");
const userCtrl = require("./ctrls/user.ctrl");
app.use("/user", userCtrl);

const adminCredentials = require("./attributes/admin-credentials.attr");
const adminCtrl = require("./ctrls/admin.ctrl");
app.use("/admin", adminCredentials, adminCtrl);

app.get("/img", function (req, res) {
  res.sendFile(path.join(__dirname, "./uploads", req.query.i));
});

app.listen(PORT, () => console.log(`server started at port ${PORT}`));

// app.get("/cart/:id", function (req, res) {
//   // http://localhost:14700/cart/60f926fec5c99439b8faa5f0 like this in url

//   Cart.findOne({
//     _id: req.params.id, // body-parser did it !!!!
//   }).exec(function (err, Cart) {
//     if (err) {
//       console.log(err);
//       res.send(404, "Error Occurred!");
//     } else {
//       console.log(Cart);
//       res.json(Cart);
//     }
//   });
// });

// app.get("/add", function (req, res) {
//   const newCart = new Cart();
//   newCart.cartNumber = 444; //req.body.name;

//   newCart.save(function (err, cart) {
//     if (err) {
//       console.log(err);
//       res.send("Error saving cart!");
//     } else {
//       console.log(cart);
//       res.json(cart);
//     }
//   });
// });

// Update document
// app.get("/up/:id/:name", function (req, res) {
//   Cart.findOneAndUpdate(
//     {
//       _id: req.params.id, // [query]
//     },
//     {
//       $set: {
//         cartNumber: Number(req.params.name),
//       },
//     },
//     function (err, newCart) {
//       if (err) {
//         console.log("error updating");
//       } else {
//         console.log(newCart);
//         res.send(newCart);
//       }
//     }
//   );
// });




