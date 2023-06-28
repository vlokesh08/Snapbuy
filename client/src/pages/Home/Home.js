import { React , useState } from "react";
import Banner from "../../components/Banner/Banner";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import SideOffers from "../../components/home/SpecialOffers/SideOffers";
import Pagination from "../../components/pageProps/shopPage/Pagination";

const Home = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };
  return (
    <div className="w-full mx-auto">
      <Banner />
      {/* <BannerBottom /> */}
      <div className="flex flex-wrap max-w-container mx-auto px-4">
        <NewArrivals />
        <BestSellers />
        {/* <YearProduct /> */}
        <div>
          
          <div className="w-full h-full flex pb-20 gap-10">
            <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
              <SideOffers />
            </div>
            <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
              {/* <SpecialOffers itemsPerPageFromBanner={itemsPerPageFromBanner} /> */}
              <Pagination itemsPerPage={itemsPerPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
