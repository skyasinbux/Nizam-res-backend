import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  discount: { type: Number, required: true },
});

const discountsModel = mongoose.models.discount || mongoose.model("discount", discountSchema);
export default discountsModel;
