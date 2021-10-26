const express = require("express");
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");

const Item = require("../models/item");

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
router.use(fileUpload());

router.post("/additem", function (req, res) {
  let file;
  if (req.files.sampleFile.name) {
    file = Date.now() + req.files.sampleFile.name;
  }

  if (req.files) {
    req.files["sampleFile"].mv(
      path.join(__dirname, "../uploads/", file),
      function (err) {
        if (err) {
          return res.status(500).send();
        }
      }
    );
  }

  const { name, category, price } = req.body;

  const newItem = new Item({
    name: name,
    category: category,
    price: price,
    img: file,
  });

  newItem.save(function (err, item) {
    // hanlde err..
    // return res.json(item);
  });

  Item.find({}).exec(function (err, Items) {
    if (err) {
      res.send(404, "Error has occurred retrieving!");
    } else {
      res.json(Items);
    }
  });
});

router.post("/updateitem", function (req, res) {
  
  const { editName, editCategory, editPrice, oldImg } = req.body;

  console.log(req.body);

  let currentFile;
  if (req.files.editFile.name) {
    currentFile = Date.now() + req.files.editFile.name;
  }
console.log(req.body);
 
  fs.readdirSync(path.join(__dirname, "../uploads/")).forEach((file) => {
    if (file === oldImg) {
      fs.unlinkSync(path.join(__dirname, "../uploads/", oldImg));
    }
  });

  if (req.files) {
    req.files["editFile"].mv(
      path.join(__dirname, "../uploads/", currentFile),
      function (err) {
        if (err) {
          return res.status(500).send();
        }
      }
    );
  }

  Item.findOneAndUpdate(
    {
      _id: req.body.editId, // [query]
    },
    {
      $set: {
        name: editName,
        category: editCategory,
        price: editPrice,
        img: currentFile,
      },
    },
    function (err, newItem) {
      if (err) {
        console.log("error updating");
      } else {
        console.log(newItem);
        res.send(newItem);
      }
    }
  );
});

router.get("/getitems", function (req, res) {
  Item.find({}).exec(function (err, Items) {
    if (err) {
      res.send(404, "Error has occurred retrieving!");
    } else {
      res.json(Items);
    }
  });
});

router.post("/deleteitem", function (req, res) {
  const { img } = req.body.obj;

  fs.readdirSync(path.join(__dirname, "../uploads/")).forEach((file) => {
    if (file === img) {
      fs.unlinkSync(path.join(__dirname, "../uploads/", img));
    }
  });

  Item.deleteOne(
    {
      _id: req.body.obj.id,
    },
    function (err, item) {
      if (err) {
        res.send("error deleting");
      } else {
        res.status(204).send(item); //No content, success but nothing to return E.g DELETE
      }
    }
  );
});

module.exports = router;


