const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 8080;
const mongoose = require("mongoose");
const User = require("./schema/User");

mongoose.connect("mongodb://127.0.0.1:27017/member-list");
const db = mongoose.connect;
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello User!")
})

app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log("Error getting users: " + err);
      res.status(500).send("Error getting people!");
    });
});

app.get("/users/:id", (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            console.log(user);
            res.json(user)
        })
        .catch((err) => {
            console.log(err);
            res.json("Problem fetching user! " + err);
        })
    
});

app.post("/user", (res, req) => {
  console.log(req.body);
  const newUser = new User({
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
    memberDate: req.body.memberDate,
  });
  newUser
    .save()
    .then((user) => {
      console.log("New member saved! " + user);
    })
    .catch((err) => {
      console.log("Error saving new user: " + err);
      res.statusCode(500).send("Error having new user, sorry!");
    });
  res.send("New member created!");
});

app.put("/users/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      phone: req.body.phone,
      age: req.body.age,
      memberDate: req.body.memberDate,
    },
    { new: true }
  )
  .then((user) => {
    console.log("User updated! " + user);
    res.json(user);
  })
  .catch((err) => {
    console.log("Error updating user: " + err);
    res.status(500).send("Error updating user!")
  });
});

app.delete("/users/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((user) => {
        console.log("User deleted: " + user);
        res.send("User deleted.")
    })
    .catch((err) => {
        console.log("Error deleting user! " + err);
        res.status(500).send("Error deleting user!")
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});