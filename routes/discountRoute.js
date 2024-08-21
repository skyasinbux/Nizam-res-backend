import express from "express";


import { adddiscount,listdiscount,listdiscount2,removediscount } from "../controllers/discountController.js";
import multer from "multer";
const discountRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

discountRouter.get("/list", listdiscount);
discountRouter.get("/list2", listdiscount2);
discountRouter.post("/discount", upload.single("image"), adddiscount);
discountRouter.post("/removediscount", removediscount);

export default discountRouter;
