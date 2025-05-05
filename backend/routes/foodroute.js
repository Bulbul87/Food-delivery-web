import express from 'express';
import { addfood, listfood, removefood } from '../controllers/foodcontrollers.js';
import multer from 'multer';
import authmiddleware from '../middleware/auth.js';
const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: 'uploads', // Store files in 'uploads' directory
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post('/add',authmiddleware, upload.single('image'), addfood); 
foodRouter.get('/list',authmiddleware, listfood); 
foodRouter.post('/remove',authmiddleware, removefood); 

export default foodRouter;
