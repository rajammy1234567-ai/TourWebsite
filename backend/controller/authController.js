const User = require('../models/UserModels');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    let user = await User.findOne({ email });

    if (user) {
      if (user.password !== password) {
        return res.status(400).json({ message: "Incorrect password for existing account." });
      }
      return res.status(200).json({ message: "Login successful", user });
    }

    user = await User.create({ name, email, password });
    return res.status(201).json({ message: "Account created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};