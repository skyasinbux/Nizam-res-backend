import bcrypt from "bcrypt";
import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from 'nodemailer';




dotenv.config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};



// Add a new Admin
const addAdmin = async (req, res) => {
  const { userId, email,  password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newadmin = new adminModel({
      userId,
      email,
      password: hashedPassword,
    });
    await newadmin.save();
    res.json({ success: true, message: "Admin added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding admin" });
  }
};

// List all admin members
const listAdmin = async (req, res) => {
  try {
    const admin = await adminModel.find({});
    res.json({ success: true, data: admin });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching admin data" });
  }
};

// Change admin password



// Forget admin pass

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Please provide email" });
    }

    const checkUser = await adminModel.findOne({ email });

    if (!checkUser) {
      return res
        .status(400)
        .send({ message: "Admin not found" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const receiver = {
      from: "ys72300@gmail.com",
      to: email,
      subject: "Password Reset Request(Valid for 10 minute)",
      text: `Click on this link to generate your new password ${process.env.CLIENT_URL}/resetpassword/${token}`,
    };

    await transporter.sendMail(receiver);

    return res.status(200).send({
      message: "Password reset link send successfully on your gmail account, please check your mail",
    });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).send({ message: "Please provide password" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await adminModel.findOne({ email: decode.email });

    const salt = await bcrypt.genSalt(10);
    const newhashPassword = await bcrypt.hash(password, salt);


    user.password = newhashPassword;
    await user.save();

    return res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};


// Login admin
const loginAdmin = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const admin = await adminModel.findOne({ userId });

    if (!admin) {
      return res.json({ success: false, message: "User ID not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = createToken(admin._id);
    res.json({
      success: true,
      message: "Login successful",
      token, // Ensure the token is included in the response
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error logging in" });
  }
};


// CHANGE PASSWORD
const changePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Find user by email
    const user = await adminModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare current password with stored hash
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password does not match." });
    }

    // Validate new password (e.g., length, complexity)
    if (newPassword.length < 4) {
      return res.status(400).json({ message: "New password must be at least 4 characters long." });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    await adminModel.updateOne({ userId }, { password: hashedPassword });

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};

// const removeAdmin = async (req, res) => {
//   try {
//       await adminModel.findByIdAndDelete(req.body.id)
//       res.json({ success: true, message: "Admin Removed" })

//   } catch (error) {
//       console.log(error);
//       res.json({ success: false, message: "Error del" })
//   }

// }

// Get logged-in admin details
// const getadminDetails = async (req, res) => {
//   try {
//     const admin = await adminModel.findById(req.user.id); // req.user.id should be set by authentication middleware
//     if (!admin) {
//       return res.json({ success: false, message: "admin not found" });
//     }
//     res.json({ success: true, data: admin });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: "Error fetching admin details" });
//   }
// };

export { addAdmin, listAdmin, loginAdmin ,changePassword,forgetPassword, resetPassword};
