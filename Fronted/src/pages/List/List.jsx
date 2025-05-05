import React, { useContext, useEffect, useState } from "react";
import "./list.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Showcontext } from "../../context/Showcontext";
const List = () => {
  const { url, token } = useContext(Showcontext);
  const [list, setList] = useState([]);
// fetch list fuction
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Failed to fetch list. Please try again.");
    }
  };

 //remove food fuction
  const removeFood = async (foodId) => {
    
    const confirmDelete = window.confirm("Are you sure you want to delete this food item?");
    if (!confirmDelete) {
     
      return;
    }
  
    try {
      const response = await axios.post(
        `${url}/api/food/remove`,
        { id: foodId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
  
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); 
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      toast.error("Failed to remove food. Please try again.");
    }
  };
  

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <ToastContainer />
     
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default List;
