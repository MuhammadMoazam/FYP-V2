import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Banner from '../../components/Lower_Banner/Lower_Banner'
import TImage from '../../components/TImage/TImage'
import Contactcomp from 'components/Contactcomp/Contactcomp'
import './Contact.css'
const Contact = () =>
{
  return (
    <>
      <Navbar />
      <TImage
        title="Contact Us"
        description="Get in touch with us for more support and any inquiries about brand."
      />
      <Contactcomp  />
      <Banner />
      <Footer />
    </>
  )
}

export default Contact
