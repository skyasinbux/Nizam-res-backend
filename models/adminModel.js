import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
});

const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema);
export default adminModel;
