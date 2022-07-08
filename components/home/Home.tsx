import React from 'react'
import HomeSearch from './HomeSearch'
import Style from '../../styles/pages/home/home.module.css'

const Home = () => {
  return (
    <div className={Style.container}>
        <HomeSearch />
    </div>
  )
}

export default Home