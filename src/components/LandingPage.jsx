import React from 'react';
import Hero from './Hero';
import PressMentions from './PressMentions';
import BentoGrid from './BentoGrid';
import Craftsmanship from './Craftsmanship';
import ProductShowcase from './ProductShowcase';
import Testimonials from './Testimonials';

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <PressMentions />
      <BentoGrid />
      <Craftsmanship />
      <ProductShowcase />
      <Testimonials />
    </main>
  );
}
