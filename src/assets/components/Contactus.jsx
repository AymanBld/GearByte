import React from 'react'
import "./Contactus.css"
import contact from "../imges/contactus.png";

const Contactus = () => {
  return (
    <section className='contactus' id='Contactus'>
      <div className='form'>
         <h2 className='titre'>Get in touch</h2>
         <p className='paragraph'>We are here for you! How can we help?</p>
          <div className='inputs'>
          <label htmlFor="" className='name'>Name</label>
          <input type="text" id='name' />
          <label htmlFor="" className='email'>Email</label>
          <input type="email" id='email' />
          <label htmlFor="" className='msg'>Message</label>
          <input type="text" id='msg'/>
         </div>
            <button className='button'>submit</button>
         </div>
      <div className='contact-pic'>
        <img src={contact} alt="" />
     </div>
     
    </section>
  )
}

export default Contactus