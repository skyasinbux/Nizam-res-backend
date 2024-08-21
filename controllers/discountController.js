import discountsModel from "../models/discountModel.js";
import fs from 'fs'



// all discount list
const listdiscount = async (req, res) => {
    try {
        // Fetch only the 'discount' field from the database
        const discounts = await discountsModel.find({}, 'discount').lean();
        // Map through the results to extract just the discount values
        const discountValues = discounts.map(item => item.discount);
        res.status(200).json(discountValues);
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching discounts" });
      }
   

}

const listdiscount2 = async (req, res) => {
    try {
        const diss = await discountsModel.find({})
        res.json({ success: true, data: diss })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error list" })
    }

}

// add discount
const adddiscount = async (req, res) => {

    try {
        const discount = new discountsModel({
            discount: req.body.discount,
        })
        await discount.save();
        res.json({ success: true, message: "Discount Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in adding" })
    }
}

// delete discount
const removediscount = async (req, res) => {
    try {
        await discountsModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Discount Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error del" })
    }

}

export { listdiscount,listdiscount2, adddiscount, removediscount }