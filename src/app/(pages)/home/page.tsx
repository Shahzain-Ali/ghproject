import React from 'react'

// import Image from "next/image";
import MainSection from '@/app/components/MainSection';
import FeaturedProducts from '@/app/components/FeatureProduct';
import TrendingProducts from '@/app/components/TrendingProducts';
import DiscountItem from '@/app/components/DiscountItems';
import TopCategories from '@/app/components/TopCategories';
import LeatestBlog from '@/app/components/LatestBlog';
// import ShopexOffer from '@/app/components/ShopexOffer';
import LatestProducts from '@/app/components/LatestProducts';
import Trending from '@/app/components/stylishGoldenSofa';

const Home = () => {
  return (
    <div>
        <MainSection/>
        <FeaturedProducts/>
        <TrendingProducts/>
        <LatestProducts/>
        <Trending/>
        <DiscountItem/>
        <TopCategories/>
        {/* <ShopexOffer/> */}
        <LeatestBlog/>
    </div>
  )
}

export default Home
