// import Image from "next/image";
// import Navbar from './components/NavBar/page';
import MainSection from './components/Slide/page';
import './globals.css'
import FeaturedProducts from "./components/FeatureProduct/page";
// import ProductDisplay from "./components/LeatestProducts/page";
// import LatestProducts from "./components/LatestProducts/page";
// import TrendingProducts from "./components/TrendingProducts/page";
import DiscountItem from "./components/DiscountItems/page";
import TopCategories from "./components/TopCategories/page";
import LeatestBlog from "./components/LeatestBlog/page";

export default function Home() {
  return (
    <div>
      <MainSection/>
            <FeaturedProducts/>
        {/* <LatestProducts/> */}
        {/* <TrendingProducts/> */}
        <DiscountItem/>
        <TopCategories/>
        <LeatestBlog/>
    </div>
  );
}
