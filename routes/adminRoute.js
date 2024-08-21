import express from "express";
import multer from "multer"; // For handling file uploads
import {
  addAdmin,
  listAdmin,
  loginAdmin,
  changePassword,
  forgetPassword,
  resetPassword,

} from "../controllers/adminController.js";

// Setup multer for file upload
const upload = multer({ dest: "uploads/" });

const adminRouter = express.Router();

adminRouter.post("/add", upload.single("image"), addAdmin); // Handle image upload
adminRouter.get("/list", listAdmin);

adminRouter.post("/login", loginAdmin);
adminRouter.post("/changepassword", changePassword);
adminRouter.post("/forgetpassword", forgetPassword);
adminRouter.post("/resetpassword/:token", resetPassword);


export default adminRouter;
