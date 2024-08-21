import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import adminRouter from "./routes/adminRoute.js";

import weeklyRouter from "./routes/weeklyRoute.js";
import cartRouter from "./routes/cartRoute.js";
import discountRouter from "./routes/discountRoute.js";
import categoryRouter from "./routes/categoryRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());



// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/admin", adminRouter);
app.use("/api/weekly", weeklyRouter);
app.use("/api/discount", discountRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
