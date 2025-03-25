import React from 'react'
import "./OurServices.css"
const OurService = () => {
  return (
    <section className='services-sec' >
        <div className='title'>
            <h2>Our Services</h2>
        </div>
        <div className='items'>
            <div className='item'>
              
              <i className='bx bx-package'></i>
              <h3>Fast delivery</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>

            </div>
            <div className='item'>
              
              <i className='bx bx-laptop'></i>
              <h3>Buy Or Rent the Pc You want </h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>

            </div>
            <div className='item'>
              
              <i className='bx bx-headphone'></i>
              <h3>Free headphones</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>

            </div>

        </div>


    </section>
  )
}

export default OurService