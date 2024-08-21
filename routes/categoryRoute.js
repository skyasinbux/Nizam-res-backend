import express from "express";
import {
  addcategory,
  listcategory,
  removecategory,
} from "../controllers/categoryController.js";
import multer from "multer";
const categoryRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

categoryRouter.get("/list", listcategory);
categoryRouter.post("/add", upload.single("image"), addcategory);
categoryRouter.post("/remove", removecategory);

export default categoryRouter;
