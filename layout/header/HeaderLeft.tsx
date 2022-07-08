import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Style from '../../styles/layout/header/header-compnents/header-left.module.css'

const HeaderLeft = () => {
  return (
    <div className={Style.container}>
          <Link href="/">
      <Image className={Style.logo} src="/../public/logo.jpg" width="380px"  height="109px"></Image>
      </Link>
    </div>
  )
}

export default HeaderLeft