import React from 'react'
import './appd.css';
import { assets } from '../../assets/assets';
const Appd = () => {
  return (
    <div className='app-download' id='app-download'>
   <p>For Better Experience Download <br /> Tomato App</p>
    <div className="app-download-platforms">
        <img src={assets.playstore} alt="" />
        <img src={assets.app_store} alt="" />
    </div>
    </div>
  )
}

export default Appd