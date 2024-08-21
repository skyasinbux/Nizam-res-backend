import foodModel from "../models/foodModel.js";
import fs from 'fs'

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find().sort({ createdAt: -1 }); // Sort by creation date, latest first
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}


// add food
const addFood = async (req, res) => {

    try {
        let image_filename = `${req.file.filename}`

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category:req.body.category,
            image: image_filename,
        })

        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete food
const removeFood = async (req, res) => {
    try {

        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

const visibleFood = async (req, res) => {
    try {
        const { visible } = req.body;
        const food = await foodModel.findByIdAndUpdate(req.params.id, { visible }, { new: true });
        
        if (!food) {
          return res.status(404).json({ success: false, message: 'Food item not found' });
        }
        
        res.json({ success: true, message: 'Food item visibility updated', food });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating food item visibility' });
      }
}

const editFood = async (req, res) => {
    try {
        const { name, category, image, price, visible } = req.body;
        const food = await foodModel.findByIdAndUpdate(req.params.id, { name, category, image, price, visible }, { new: true });
    
        if (!food) {
          return res.status(404).json({ success: false, message: 'Food item not found' });
        }
    
        res.json({ success: true, message: 'Food item updated', food });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating food item' });
      }
}


export { listFood, addFood, removeFood, visibleFood, editFood }