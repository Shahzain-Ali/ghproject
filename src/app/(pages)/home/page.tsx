import React from 'react'

// import Image from "next/image";
import MainSection from '@/app/components/Slide';
import FeaturedProducts from '@/app/components/FeatureProduct';
import TrendingProducts from '@/app/components/TrendingProducts';
import DiscountItem from '@/app/components/DiscountItems';
import TopCategories from '@/app/components/TopCategories';
import LeatestBlog from '@/app/components/LeatestBlog';
import ShopexOffer from '@/app/components/ShopexOffer';
import LatestProducts from '@/app/components/LatestProducts';
import Trending from '@/app/components/Trending';

const Home = () => {
  return (
    <div>
      <MainSection/>
        <FeaturedProducts/>
        {/* <LatestProducts/> */}
        <TrendingProducts/>
        <LatestProducts/>
        <ShopexOffer/>
        <Trending/>
        <DiscountItem/>
        <TopCategories/>
        <LeatestBlog/>
    </div>
  )
}

export default Home
