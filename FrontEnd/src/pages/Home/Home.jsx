import React from 'react'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Banner from '../../components/Lower_Banner/Lower_Banner'
import Slider from 'components/Slider/Slider'
import ProductCategories from 'components/ProductCategories/ProductCategories'
import Stats from 'components/Stats/Stats'
import WhyChooseUs from 'components/WhyChooseUs/WhyChooseUs'
import Products from 'components/Products/Products'
import DealOfTheDay from 'components/DealOfTheDay/DealOfTheDay'
import HowToAvailOffers from 'components/HowToAvailOffers/HowToAvailOffers'
import MissionComponent from 'components/MissionComponent/MissionComponent'
import Testimonial from 'components/Testimonial/Testimonial'
import LatestArticles from 'components/LatestArticles/LatestArticles'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider/>
      <ProductCategories/>
      <Stats/>
      <WhyChooseUs/>
      <Products/>
      <DealOfTheDay></DealOfTheDay>
      <HowToAvailOffers></HowToAvailOffers>
      <MissionComponent></MissionComponent>
      <Testimonial></Testimonial>
      <LatestArticles></LatestArticles>
      <Banner />
      <Footer />
    </div>
  )
}

export default Home
