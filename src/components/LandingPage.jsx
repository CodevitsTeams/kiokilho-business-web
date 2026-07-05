import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import PressMentions from './PressMentions';
import BentoGrid from './BentoGrid';
import Craftsmanship from './Craftsmanship';
import WhyUs from './WhyUs';
import ProductShowcase from './ProductShowcase';
import Testimonials from './Testimonials';

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // slight delay to ensure DOM is ready
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
  return (
    <main>
      <Hero />
      <PressMentions />
      <BentoGrid />
      <Craftsmanship />
      <WhyUs />
      <ProductShowcase />
      <Testimonials />
    </main>
  );
}
