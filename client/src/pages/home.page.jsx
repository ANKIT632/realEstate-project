import HeroSection from "../components/heroSection.component";

import FeatureSection from "../components/featureSection.component";

import HomeCategory from '../components/homeCategory.component';
import NewDeals from '../components/NewDeals.component';

import Testimoials from '../components/review.component';

import Foter from '../components/foter.component';

function Home() {
  return (
    <div  >
      <HeroSection />
      <FeatureSection />
      <HomeCategory /> 
      <NewDeals />
       <Testimoials />
      <Foter/>
    </div>


  );
}

export default Home;