const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateId = require("../CommonIdGenerate/GenerateId.js");

// POST
router.post("/user", async (req, res) => {
  try {
    const { user_id, user_password } = req.body;

    // if (!user_id || !user_password) {
    //   return res.status(400).json({
    //     message: "User ID and Password are required",
    //   });
    // }

    console.log(req.body);

    const existingUser = await User.findOne({ user_id });
    if (existingUser) {
      return res.status(409).json({
        message: "User ID Already exisiting",
      });
    }

    const hashPassword = await bcrypt.hash(user_password, 10);

    const userID = await generateId("user_id");

    const newUser = await new User({
      ...req.body,
      user_id: userID,
      user_password: hashPassword,
    }).save();

    return res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST /login
router.post("/login", async (req, res) => {
  try {
    const { user_id, user_password } = req.body;

    if (!user_id || !user_password) {
      return res.status(400).json({
        message: "User ID / Email and Password are required",
      });
    }

    // Login with User ID OR Email
    const user = await User.findOne({
      $or: [{ user_id: user_id }, { user_mail: user_id }],
    });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    // Only Admin can login
    if (user.user_role !== "Admin") {
      return res.status(403).json({
        message: "Access Denied. Admin only.",
      });
    }

    const isMatch = await bcrypt.compare(user_password, user.user_password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        user_role: user.user_role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    const userData = user.toObject();
    delete userData.user_password;

    return res.status(200).json({
      message: "Login Success",
      token,
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// token verify
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token Required",
      });
    }

    // const token = authHeader.split(" ")[1];
    const token = authHeader;

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
      error,
    });
  }
};

// GET
router.get("/user", async (req, res) => {
  try {
    const getData = await User.find().sort({ _id: -1 });
    return res.status(200).json(getData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET BY ID
router.get("/user/:id", verifyToken, async (req, res) => {
  try {
    const getByIdData = await User.findById(req.params.id);

    if (!getByIdData) {
      return res.status(404).json({
        message: "Data Not Found",
      });
    }
    return res.status(200).json(getByIdData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// PUT
router.put("/user/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.user_password) {
      req.body.user_password = await bcrypt.hash(req.body.user_password, 10);
    }

    const putData = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!putData) {
      return res.status(404).json({
        message: "Data Not Found",
      });
    }

    return res.status(200).json(putData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE
router.delete("/user/:id", verifyToken, async (req, res) => {
  try {
    const deleteData = await User.findByIdAndDelete(req.params.id);

    if (!deleteData) {
      return res.status(404).json({
        message: "Data Not Found",
      });
    }

    return res.status(200).json({
      message: "Data Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
