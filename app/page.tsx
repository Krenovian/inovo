'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import About from '@/components/About';
import WhatWeDo from '@/components/WhatWeDo';
import Ecosystem from '@/components/Ecosystem';
import Team from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import ContactEditorial from '@/components/ContactEditorial';
import Footer from '@/components/Footer';
import ScrollEngine from '@/components/ScrollEngine';

export default function HomePage() {
  return (
    <>
      {/* Scroll animation engine */}
      <ScrollEngine />

      {/* Navigation */}
      <Navbar />

      {/* Main Continuous Journey */}
      <main>
        {/* 01: Hero — Full-screen visual impact */}
        <Hero />

        {/* 02: About — Fluid split layout */}
        <About />

        {/* 03: Projects — Interactive scroll timeline */}
        <ProjectsShowcase />

        {/* 04: Services — Image-driven interactive showcase */}
        <WhatWeDo />

        {/* 05: Ecosystem — Dark monochrome typographic section */}
        <Ecosystem />

        {/* 06: Team — Clean minimal portraits */}
        <Team />

        {/* 07: Testimonials — Horizontal scroll video carousel */}
        <Testimonials />

        {/* 08: Contact — Editorial two-column enquiry */}
        <ContactEditorial />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
