import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  visible: { type: Boolean, default: true },// Add visibility field
  createdAt: {
    type: Date,
    default: Date.now // Set the default value to the current date and time
  },


});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;
