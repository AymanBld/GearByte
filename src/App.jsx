import React from 'react'
import Nav from './assets/components/Nav'
import Hero from './assets/components/Hero'
import OurService from './assets/components/OurService'
import Reviews from './assets/components/Reviews'
import Footer from './assets/components/Footer'
import Copyright from './assets/components/copyright'
import Contactus from './assets/components/Contactus'

const App = () => {
  return (
   <>
    <Nav/>
    <Hero/>
    <OurService/>
    <Reviews/>
    <Contactus/>
    <Footer/>
    <Copyright/>
   </>
  )
}

export default App