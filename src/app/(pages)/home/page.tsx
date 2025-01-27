import React from 'react'
// import Image from "next/image";
// import Navbar from './components/NavBar/page';
import MainSection from '@/app/components/Slide/page';
// import './globals.css'
import FeaturedProducts from '@/app/components/FeatureProduct/page';
// import ProductDisplay from "./components/LeatestProducts/page";
// import LatestProducts from "./components/LatestProducts/page";
import TrendingProducts from '@/app/components/TrendingProducts/page';
import DiscountItem from '@/app/components/DiscountItems/page';
import TopCategories from '@/app/components/TopCategories/page';
import LeatestBlog from '@/app/components/LeatestBlog/page';
import ShopexOffer from '@/app/components/ShopexOffer/page';
import LeatestProducts from '@/app/components/LatestProducts/page';
import Trending from '@/app/components/Trending.tsx/page';

const Home = () => {
  return (
    <div>
      <MainSection/>
        <FeaturedProducts/>
        {/* <LatestProducts/> */}
        <TrendingProducts/>
        <LeatestProducts/>
        <ShopexOffer/>
        <Trending/>
        <DiscountItem/>
        <TopCategories/>
        <LeatestBlog/>
    </div>
  )
}

export default Home
