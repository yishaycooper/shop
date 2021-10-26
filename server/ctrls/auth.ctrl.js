const express = require("express");
const jwt = require("jsonwebtoken");
const util = require("util"); //to view form
const md5 = require("md5");

const mongoose = require("mongoose");
const Cart = require(".././models/cart");
const User = require(".././models/user");

mongoose.connect("mongodb://localhost:27017/cartdb", {
  // give the db a name
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

const router = express.Router();

// log in sign user credentials and send back to user.
router.post("/login", function (req, res) {
  const { user, pass } = req.body.form; // to retrieve form input
  
  User.find({ email: user, pass: pass }).exec(function (err, theUser) {
    
    if (theUser.length == 0) {
      // return res.status(404).send("Wrong username or password!");
      
      return res.json({ message: "Wrong username or password!" });
    }

    if (err) {
      return res.send(404, "Error has occurred retrieving!");
    }
    const token = jwt.sign(
      // create the token.
      {
        user_id: theUser[0].email,
        user_pass: theUser[0].pass,
        admin: theUser[0].admin, // if no user exists admin reference will be stored in the token
      },
      // process.env.SECRET_KEY,
      process.env.SECRET_KEY,
      {
        expiresIn: "5h",
      }
    );
    return res.send({ token: token });
  });
});

// register and save user credentials
router.post("/register", function (req, res) {
  const { user, pass } = req.body.form; // to retrieve form input
  let newUser;

  User.findOne(
    {
      email: user,
    },
    function (err, use) {
      // hanlde err..
      
      if (use) {
        return res.json({ message: "User already exists" });
      } else {
        const query = User.find();
        query.countDocuments().then((count) => {
         
          if (count == 0) {
            // if no users exist, first user will be admin.
            newUser = new User({ email: user, pass: pass, admin: true });
          } else {
            newUser = new User({ email: user, pass: pass, admin: false });
          }

          newUser.save(function (err, user) {
            // hanlde err..
            // return res.json(user); //no need to return, already returned "User already exists"
          });
        });
      }
    }
  );
});

module.exports = router;

// User.deleteMany({}, function (err, Users) {
//   if (err) {
//     res.send(404, "Error has occurred!");
//   } else {
//     console.log(Users);
//   }
//   });

//   }
// });
// TO LOG FORM INPUT
// console.log(`post/${util.inspect(req.body,false,null)}`);

// User.find({email: user, pass: pass}).exec(function (err, theUser) {
//   if (theUser) {
//     const token = jwt.sign(
//       {
//         user_id: theUser[0].user_id,
//         email: theUser[0].email,
//       },
//       process.env.SECRET_KEY,
//       {
//         expiresIn: "5h",
//       }
//     );

//     return res.send(token);
//   } else {
//     res.status(401).send();
//   }
// });



