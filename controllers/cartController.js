import cartModel from "../models/cartModel.js";
import fs from 'fs'



// all cart list
const listcart = async (req, res) => {
  try {
    // RECENT ORDERS
    const recentOrders = await cartModel.find().sort({ createdAt: -1 }).limit(5);

    // TODAY ORDERS
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const todayOrdersCount = await cartModel.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    // LAST 30 DAYS ORDERS
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    startDate.setHours(0, 0, 0, 0); // Start of the day 30 days ago

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999); // End of today

    const last30DaysOrdersCount = await cartModel.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate }
    });


    // PAGIGNATION
    const page = parseInt(req.query.page) || 1;   // Default to page 1
    const limit = parseInt(req.query.limit) || 5; // Default to 10 items per page
    const skip = (page - 1) * limit;

    // Get total number of records
    const totalRecords = await cartModel.countDocuments();

    // Get paginated records
    const carts = await cartModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit);


    res.json({
      success: true,
      carts,
      totalRecords,// Return total number of records for frontend pagination
      todayOrdersCount,
      last30DaysOrdersCount,
      recentOrders 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart history'
    });
  }

}

// add cart
const addcart = async (req, res) => {
  try {
    const { order, total, discount, finalPrice, customerName,  deliveryAddress, phoneNumber } = req.body;

    // Validate the request body
    if (!order || total === undefined || discount === undefined || finalPrice === undefined || customerName === undefined || deliveryAddress === undefined || phoneNumber === undefined ) {
      return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    const newCart = new cartModel({ order, total, discount, finalPrice, customerName, deliveryAddress, phoneNumber, createdAt: new Date() });
    await newCart.save();

    res.status(200).json({ success: true, message: 'Cart saved successfully' });
  } catch (error) {
    console.error('Error saving cart:', error.message);
    res.status(500).json({ success: false, message: 'Error saving cart', error: error.message });
  }
};


// delete cart


const discount = async (req, res) => {
    const discount = 10; // 10% discount
  res.json({ discount });

}

export { listcart, addcart,discount }