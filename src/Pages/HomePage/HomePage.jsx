import React from 'react'
import './HomePage.css'

import MiddleColumn from '../../Components/MiddleColumn/MiddleColumn'
import Navbar from '../../Components/Navbar/Navbar'
import HomeLeft from '../../Components/Home-Left/HomeLeft'
import HomeRight from '../../Components/Home-Right/HomeRight'


const HomePage = () => {
  return (
    <>

      <Navbar />
      <div className="home">
      <div className="left-home-side">
      <HomeLeft/>
      </div>
      <div className="middle-home-side">
        <MiddleColumn />
      </div>
        <div className="right-home-side">
        <HomeRight/>
        </div>

      </div>
    </>
  )
}

export default HomePage
