import mongoose from "mongoose";
mongoose.set('debug', true);


const cartSchema = new mongoose.Schema({
    order: Array,
    total: Number,
    discount: { type: Number, required: true },
    finalPrice: { type: Number, required: true },
    customerName: String,
    deliveryAddress: String,
    phoneNumber: String,
    createdAt: {
        type: Date,
        default: Date.now // Set the default value to the current date and time
      },



    
 
});

const cartModel = mongoose.models.cart || mongoose.model("cart", cartSchema);
export default cartModel;
