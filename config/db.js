import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://nizam123:nizam786@cluster0.pfi7loo.mongodb.net/nizamdb"
    )
    .then(() => console.log("DATABASE Connected"));
};
