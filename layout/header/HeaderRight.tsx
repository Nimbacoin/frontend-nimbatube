import React from 'react'
import Style from '../../styles/layout/header/header-compnents/header-right.module.css'
import MyAccount from './header-components/MyAccount'
import Bookings from './header-components/Bookings'
import WishList from './header-components/WishList'
import LangAndCurrency from './header-components/LangAndCurrency'


const HeaderRight = () => {
  return (
    <div className={Style.container}> 
   <LangAndCurrency />
       <WishList  />
       <Bookings  />
      <MyAccount  />
    </div>
  )
}

export default HeaderRight