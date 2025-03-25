import React from 'react'
import "./Reviews.css"
import imag1 from "../imges/testimonials-1.png";
import imag2 from "../imges/testimonials-2.png";
import imag3 from "../imges/testimonials-3.png";

const Reviews = () => {
  return (
    <section className="Reviews" id="Reviews">
       
       <div className="heading">
         <h2>OUR CLIENTS'S REVIEWS</h2>
      </div>

      <div className="clients-container">
       <div className="box">
        <div> <i className='bx bxs-star'></i>
        <i className='bx bxs-star'></i>
        <i className='bx bxs-star'></i>
        <i className='bx bxs-star'></i>
        <i className='bx bxs-star-half'></i>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio aliquid, nemo nostrum assumenda veniam omnis?</p>
        <h4> ikram Arafat</h4>
        <img src={imag1} alt="" /> 
      </div>
      <div className="box">
        <div> <i className='bx bxs-star'></i>
        <i className='bx bxs-star'></i>
        <i className='bx bxs-star'></i>
        <i className='bx bxs-star'></i>
        <i className='bx bxs-star-half'></i>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio aliquid, nemo nostrum assumenda veniam omnis?</p>
        <h4> Abdo Mak</h4>
        <img src={imag2} alt="" /> 
        </div>
        <div className="box">
        <div> <i className='bx bxs-star'></i>
        <i className='bx bxs-star'></i>
        <i className='bx bxs-star'></i>
        <i className='bx bxs-star'></i>
        <i className='bx bxs-star-half'></i>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio aliquid, nemo nostrum assumenda veniam omnis?</p>
        <h4> Wail sadaoui</h4>
        <img src={imag3} alt="" /> 
        </div>
      
     
      </div>

        <div className="chevrons">
          <i className='bx bx-chevron-left-circle' id="prev"></i>
          <i className='bx bx-chevron-right-circle' id="next"></i>  
        </div>
    </section>
  )
}

export default Reviews