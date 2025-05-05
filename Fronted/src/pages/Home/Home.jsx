import React, { useState } from 'react'
import './Home.css'
import Header from'../../components/Header/Header'
import Menu from '../../components/Exploremenu/menu'
import Fooddisplay from '../../components/fooddisplay/fooddisplay'
import Appd from '../../components/Appdownload/Appd'
const Home = () => {
  const [category, setcategory]=useState("All");
  return (
    <div>
        <Header/>
        <Menu  category={category} setcategory={setcategory}/>
        <Fooddisplay category={category}/>
        <Appd/>
    </div>
  )
}

export default Home