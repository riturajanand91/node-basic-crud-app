const express = require("express");
const router = new express.Router();
const User = require("../models/users");
// CRUD

//Route to create User
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  console.log(req.body);
  try {
    // console.log("try block");
    await user.save();
    res.status(201).send({ user });
    // console.log("User Registered");
  } catch (e) {
    res.status(400).send(e);
  }
});

//Route to Read User
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Route to Read User by specific id
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("No User Found");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Route to Update User
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    if (!user) {
      return res.status(404).send("No User Found");
    }
    res.send(user);
    console.log("User Updated");
  } catch (e) {
    res.status(500).send(e);
  }
});

//Route to Delete User
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(201).send();
  }
});

module.exports = router;
