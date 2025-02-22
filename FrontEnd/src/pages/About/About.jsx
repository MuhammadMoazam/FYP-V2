import React from 'react'
import './About.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Banner from '../../components/Lower_Banner/Lower_Banner'
import TImage from '../../components/TImage/TImage'
import AboutOne from 'components/AboutOne/AboutOne'
import AboutTwo from 'components/AboutTwo/AboutTwo'
import AboutThree from 'components/AboutThree/AboutThree'


const About = () => {
  return (
    <>
      <Navbar />
      <TImage
        title="About Us"
        description="Discover our story, values, and passion for delivering quality fashion."
      />
      <AboutOne/>
      <AboutTwo/>
      <AboutThree/>
      <Banner />
      <Footer />
    </>
  )
}

export default About
