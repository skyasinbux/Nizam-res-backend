import categoryModel from "../models/categoryModel.js";
import fs from 'fs'

// all category list
const listcategory = async (req, res) => {
    try {
        const discounts = await categoryModel.find({})
        res.json({ success: true, data: discounts })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// add category
const addcategory = async (req, res) => {

    try {
        let image_filename = `${req.file.filename}`

        const category = new categoryModel({
            name: req.body.name,
            image: image_filename,
        })

        await category.save();
        res.json({ success: true, message: "Category Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete category
const removecategory = async (req, res) => {
    try {

        const category = await categoryModel.findById(req.body.id);
        fs.unlink(`uploads/${category.image}`, () => { })

        await categoryModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Category Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

export { listcategory, addcategory, removecategory }