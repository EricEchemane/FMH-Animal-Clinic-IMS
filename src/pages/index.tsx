import React from 'react'
import SampleCards from '~/components/SampleCards';
import Hero from '~/components/Hero';
import Navbar from '~/components/Navbar';
import Service from '~/components/Servicess';
import Products from '~/components/Products';
import Testimonials from '~/components/Testimonials';


export default function HomePage() {
  return <>
    <Navbar />
    <Hero />
    <Service />
    <Products />
    <Testimonials />
  </>
}
