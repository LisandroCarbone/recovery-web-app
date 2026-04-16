import { useState } from 'react';
import Hero from './components/Hero';
import ScienceBenefits from './components/ScienceBenefits';
import ServicesGrid from './components/ServicesGrid';
import HowItWorks from './components/HowItWorks';
import InteractiveDiagnosis from './components/InteractiveDiagnosis';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import NavBar from './components/NavBar';
import AuthModal from './components/AuthModal';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  return (
    <main className="bg-background min-h-screen text-primary selection:bg-accent selection:text-slate-900">
      <NavBar onAuthClick={() => setIsAuthOpen(true)} user={user} />
      <Hero />
      <ScienceBenefits />
      <ServicesGrid />
      <HowItWorks />
      <InteractiveDiagnosis user={user} />
      <Footer />
      <WhatsAppButton />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={setUser} />
    </main>
  );
}

export default App;
