import React from 'react'
import { IoMailOpenOutline } from "@react-icons/all-files/io5/IoMailOpenOutline";
import Style from '../../../styles/layout/footer/footer-components/news-latter.module.css'

const NewsLatter = () => {
  return (
    <div className={Style.container}>
        <div className={Style.newslatter_container}>
            <p className={Style.newslatter}>Newsletter:</p>
       </div>
        <p className={Style.first_p}>
            <strong className={Style.first_strong}>
            Get the best deals on Active adventures!
            </strong>
            <small className={Style.first_small}>
            Be the first to hear about the best Active adventure package deals, straight to your inbox.
            </small>
        </p>
       <div>
    <form className={Style.form}>
        <IoMailOpenOutline />
        <input type="text" placeholder="Email"/>
        <button>
        Subscribe
        </button>
        </form>
        <small className={Style.second_small}>
        By submitting this form, I agree to the urexcursion T&Cs and Privacy policy.
            </small>
        </div>
    </div>
  )
}

export default NewsLatter