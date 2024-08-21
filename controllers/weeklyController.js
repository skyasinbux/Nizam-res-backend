import weeklyModel from "../models/weekModel.js";
import fs from 'fs'



// all weekly list
const listweekly = async (req, res,next) => {
   
    try {
        const weeklys = await weeklyModel.find({})
        res.json({ success: true, data: weeklys })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error list" })
    }
   

}

// add weekly
const addweekly = async (req, res) => {

    try {

        const weekly = new weeklyModel({
            name: req.body.name,

            price: req.body.price,

            category:req.body.category,

        })

        await weekly.save();
        res.json({ success: true, message: "weekly Item Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in adding" })
    }
}

// delete weekly
const removeweekly = async (req, res) => {
    try {
        await weeklyModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Weekly Item Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error del" })
    }

}

export { listweekly, addweekly, removeweekly }