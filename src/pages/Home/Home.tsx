import HeroContainer from '../../components/layout/HeroContainer/HeroContainer';
import Testimonials from '../../components/sections/Testimonials/Testimonials';
import PlatformStats from '../../components/sections/PlatformStats/PlatformStats';
import CallToActionSection from '../../components/layout/CallToActionSection/CallToActionSection';
import Features from '../../components/sections/Features/Features';
import HowItWorks from '../../components/sections/HowItWorks/HowItWorks';

const Home: React.FC = () => {
  return (
    <>
      <HeroContainer />
      <Features />
      <HowItWorks />
      <Testimonials />
      <PlatformStats />
      <CallToActionSection />
    </>
  );
};

export default Home;
