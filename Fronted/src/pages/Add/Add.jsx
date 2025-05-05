import React, { useContext, useState } from 'react';
import './add.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../../assets/Asset';
import {Showcontext} from '../../context/Showcontext'


const Add = () => {
  const {url} = useContext(Showcontext);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    if (!data.name || !data.description || !data.price || !image) {
      toast.error('Please fill all the fields and upload an image.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token'); 
  
      if (!token) {
        toast.error('No authorization token found. Please log in.');
        return;
      }

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', Number(data.price));
      formData.append('category', data.category);
      formData.append('image', image);

      
  console.log('token',token)
      const response = await axios.post(
        `${url}/api/food/add`,  
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,  
          }
        }
      );
  
      if (response.data.success) {
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Salad',
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Axios error:', error);
      toast.error('Error while adding the food item. Please try again.');
    }
  };

  return (
    <div className='add-form-container'>
      <ToastContainer />
      <form   onSubmit={onSubmitHandler}>
        <div className="add-img-upload ">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Preview"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name ">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description ">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
          />
        </div>
        <div className="add-category-price">
          <div className="add-category ">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price ">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="Enter price ₹"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
