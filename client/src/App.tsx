import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import ScienceBenefits from './components/ScienceBenefits';
import ServicesGrid from './components/ServicesGrid';
import HowItWorks from './components/HowItWorks';
import InteractiveDiagnosis from './components/InteractiveDiagnosis';
import Footer from './components/Footer';

import WhatsAppButton from './components/WhatsAppButton';

import Marquee from './components/Marquee';

import NavBar from './components/NavBar';

function App() {
  return (
    <main className="bg-background min-h-screen text-primary selection:bg-accent selection:text-slate-900">
      <NavBar />
      <Hero />
      <Marquee />
      {/* <SocialProof /> */}
      <ScienceBenefits />
      <ServicesGrid />
      <HowItWorks />
      <InteractiveDiagnosis />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

export default App;
