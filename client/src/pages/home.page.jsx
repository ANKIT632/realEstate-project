import HeroSection from "../components/heroSection.component";

import FeatureSection from "../components/featureSection.component";

import HomeCategory from '../components/homeCategory.component';
import NewDeals from '../components/NewDeals.component';

import Testimoials from '../components/review.component'


function Home() {
  return (
    <div >
      <HeroSection />
      <FeatureSection />
      <HomeCategory />
      <NewDeals />
      <Testimoials/>
    </div>


  );
}

export default Home;