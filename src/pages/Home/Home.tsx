import HeroContainer from '../../components/layout/HeroContainer/HeroContainer';
import Testimonials from '../../components/sections/Testimonials/Testimonials';
import PlatformStats from '../../components/sections/PlatformStats/PlatformStats';
import CallToActionSection from '../../components/layout/CallToActionSection/CallToActionSection';
import Features from '../../components/sections/Features/Features';
import HowItWorks from '../../components/sections/HowItWorks/HowItWorks';

const Home: React.FC = () => {
  return (
    <section className="py-6 mx-auto max-w-8xl sm:px-6 lg:px-8">
      <HeroContainer />
      <Features />
      <HowItWorks />
      <Testimonials />
      <PlatformStats />
      <CallToActionSection />
    </section>
  );
};

export default Home;
