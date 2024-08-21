import mongoose from "mongoose";

const weeklySchema = new mongoose.Schema({
  name: { type: String, required: true },

  price: { type: Number, required: true },

  category: { type: String, required: true },
});

const weeklyModel = mongoose.models.weekly || mongoose.model("weekly", weeklySchema);
export default weeklyModel;
