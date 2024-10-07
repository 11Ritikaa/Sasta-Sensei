import Navbar from './Navbar';
import Hero from './Hero';
import PriceHistory from './PriceHistory';
import Footer from './Footer';
import StepsSection from './StepsSection';
import Download from './Download';
import Tab from './Tab';
import Tabs from './Tabs';
import FAQ from './FAQ';
import SupportedStores from './SupportedStores';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../API';

const HomePage = () => {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products/random`);
        const parsedProducts = response.data.data
        setProducts(parsedProducts); 
      } catch (error) {
        console.error(error)
        
      }
    };

    fetchProducts();
  }, []);
  console.log(products)
  return (
    <div>
      <Navbar />
      <Hero />
      <PriceHistory products={products} />
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
};

export default HomePage;
