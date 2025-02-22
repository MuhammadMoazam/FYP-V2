import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Banner from '../../components/Lower_Banner/Lower_Banner'
import TImage from '../../components/TImage/TImage'
import TermsConditions from 'components/TermsCondition/TermsCondition'
import './Terms.css'
const Term = () =>
{
  return (
    <>
      <Navbar />
      <TImage
        title="Terms and Conditions"
        description="Read our terms governing purchases, policies, and store interactions."
      />
      <TermsConditions />
      <Banner />
      <Footer />
    </>
  )
}

export default Term
