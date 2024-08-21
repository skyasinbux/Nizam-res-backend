import express from "express";


import { addweekly,listweekly,removeweekly } from "../controllers/weeklyController.js";
import multer from "multer";
const weeklyRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

weeklyRouter.get("/weeklylist", listweekly);
weeklyRouter.post("/weekly", upload.single("image"), addweekly);
weeklyRouter.post("/removeweekly", removeweekly);

export default weeklyRouter;
