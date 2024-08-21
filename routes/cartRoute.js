import express from "express";


import { addcart,listcart,discount } from "../controllers/cartController.js";
import multer from "multer";
const cartRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)


const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

cartRouter.post("/addcart", upload.single("image"), addcart);
cartRouter.get("/cartlist", listcart);

cartRouter.get("/discount", discount);

export default cartRouter;
