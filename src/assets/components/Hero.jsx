import React from 'react'
import "./Hero.css"
import "./Nav.css"



const Hero = () => {
  return (
   <section className='Hero-sec'id='Hero'>
     <div className='hero'>
    
        <h1><span>From Your Vision to Reality </span>– Custom PCs Done Right! </h1>
        <p>From vision to reality—choose your specs, and we’ll build the perfect PC for gaming, work, and beyond. No stress, just pure performance</p>

      <div className='buttons'>
       <button className="btn" id='buy'> <a href="">Buy Now</a></button>
       <button className="btn" id='rent'><a href="">Rent Now</a></button>
     </div>
     
     </div>
     
    <div className='img'>    
    </div>

   </section>
  )
}

export default Hero