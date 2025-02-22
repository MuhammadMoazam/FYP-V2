import React from 'react'
import './Blog.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Banner from '../../components/Lower_Banner/Lower_Banner'
import TImage from '../../components/TImage/TImage'
import CardsList from 'components/CardsList/CardsList'
const Blog = () => {
  return (
    <>
      <Navbar />
      <TImage
        title="Our Blogs"
        description="Explore trends, tips, and updates about fashion, style, and our store."
      />
      <CardsList />
      <Banner />
    <Footer/>
    </>
  )
}

export default Blog
