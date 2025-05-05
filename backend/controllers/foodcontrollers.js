import Foodmodel from "../models/foodmodel.js";
import fs from 'fs';

// Add food item
const addfood = async (req, resp) => {
  if (!req.file) {
    return resp.status(400).json({ success: false, message: 'Image is required' });
  }

  const image_filename = req.file.filename;
   const food = new Foodmodel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
console.log("food",food)
  try {
    await food.save();
    resp.json({ success: true, message: 'Food added successfully' });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ success: false, message: 'Error while adding food' });
  }
};

// List all food items
const listfood = async (req, resp) => {
  try {
    const foods = await Foodmodel.find({});
    resp.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ success: false, message: 'Error fetching food list' });
  }
};

// Remove food item
const removefood = async (req, resp) => {
  try {
    const food = await Foodmodel.findById(req.body.id);

    if (!food) {
      return resp.status(404).json({ success: false, message: 'Food not found' });
    }

    fs.unlink(`uploads/${food.image}`, () => {}); // Delete the image file from the server

    await Foodmodel.findByIdAndDelete(req.body.id);
    resp.json({ success: true, message: 'Food removed successfully' });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ success: false, message: 'Error removing food item' });
  }
};

export { addfood, listfood, removefood };

