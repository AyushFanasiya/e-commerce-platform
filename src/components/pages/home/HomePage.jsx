import React, { useContext } from 'react'
import Layout from '../../layout/Layout';
import HeroSection from '../../heroSection/HeroSection';
import Category from '../../category/Category';
import HomePageProductCard from '../../homePageProductCard/HomePageProductCard';
import Track from '../../track/Track';
import Testimonial from '../../testimonial/Testimonial';
import myContext from '../../../context/myContext';

const HomePage = () => {
  return (
      <Layout>
        <HeroSection/>
        <Category/>
        <HomePageProductCard/>
        <Track/>
        <Testimonial/>
      </Layout>
  )
}

export default HomePage;
