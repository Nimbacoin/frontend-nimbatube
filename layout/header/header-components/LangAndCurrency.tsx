import React from 'react'
import Flag from 'react-world-flags'
import Style from "../../../styles/layout/header/header-compnents/lang-and-curreny.module.css"
const LangAndCurrency = () => {
  return (
    <div className={Style.container}>
            <Flag code="GB" height="200" />
    <span className={Style.currency}> 
            <strong>€ {" "}</strong>
            <small>EUR</small>
    </span>
    </div>
  )
}

export default LangAndCurrency