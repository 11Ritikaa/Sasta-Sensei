import Download from './components/Download';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import PriceHistory from './components/PriceHistory';
import StepsSection from './components/StepsSection';
import SupportedStores from './components/SupportedStores';
import Tab from './components/Tab';
import Tabs from './components/Tabs';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <PriceHistory />
      <StepsSection />
      <Download />
      <h1 className='text-3xl mt-6 font-bold'>Frequently Asked Questions</h1>
      <h5 className='font-extralight mb-4'>Some of the most asked questions by our users</h5>
      <Tabs>
        <Tab title="General">
          <FAQ question="What is your return policy?" answer="You can return any item within 30 days." />
          <FAQ question="Do you ship internationally?" answer="Yes, we ship worldwide." />
        </Tab>
        <Tab title="Billing">
          <FAQ question="What payment methods do you accept?" answer="We accept all major credit cards." />
          <FAQ question="Can I get a refund?" answer="Yes, refunds are processed within 7 days." />
        </Tab>
        <Tab title="Technical">
          <FAQ question="How do I reset my password?" answer="Click on 'Forgot password' and follow the instructions." />
          <FAQ question="How do I update my profile?" answer="Go to your account settings and update your information." />
        </Tab>
      </Tabs>
      <SupportedStores />
      <Footer />
    </div>
  );
}

export default App;
