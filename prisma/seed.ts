/**
 * Prisma seed script
 * Run with: npx prisma db seed
 *
 * This seeds:
 * 1. Admin user (set your own username/password below)
 * 2. Hero slides from the existing static data
 * 3. Projects from data/projects.ts
 * 4. Team members
 * 5. Services
 * 6. Testimonials
 * 7. About section
 * 8. Site settings
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// ─── CONFIGURE YOUR ADMIN CREDENTIALS HERE ───────────────────────────────────
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'inovo2026'; // CHANGE THIS BEFORE RUNNING IN PRODUCTION
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Seeding database...');

  // ── Admin User ──────────────────────────────────────────────────────────
  const existingAdmin = await prisma.adminUser.findUnique({ where: { username: ADMIN_USERNAME } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await prisma.adminUser.create({ data: { username: ADMIN_USERNAME, passwordHash } });
    console.log(`✅ Admin user created: ${ADMIN_USERNAME}`);
  } else {
    console.log(`⏭  Admin user already exists: ${ADMIN_USERNAME}`);
  }

  // ── Hero Slides ─────────────────────────────────────────────────────────
  const existingSlides = await prisma.heroSlide.count();
  if (existingSlides === 0) {
    await prisma.heroSlide.createMany({
      data: [
        { title: 'The Mist Pavilion', location: 'Wayanad', image: '/images/wayanad-pavilion.jpg', order: 0 },
        { title: 'Nalukettu Continuum', location: 'Calicut', image: '/images/calicut-courtyard.jpg', order: 1 },
        { title: 'Arabian Horizon', location: 'Kannur', image: '/images/kannur-cliff.jpg', order: 2 },
        { title: 'Waterfront Penthouse', location: 'Kochi', image: '/images/kochi-penthouse.jpg', order: 3 },
        { title: 'Laterite Grove', location: 'Malappuram', image: '/images/malappuram-estate.jpg', order: 4 },
      ],
    });
    console.log('✅ Hero slides seeded');
  } else {
    console.log('⏭  Hero slides already exist');
  }

  // ── Projects ────────────────────────────────────────────────────────────
  const existingProjects = await prisma.project.count();
  if (existingProjects === 0) {
    await prisma.project.createMany({
      data: [
        {
          slug: 'wayanad-glass-pavilion',
          title: 'The Mist Pavilion',
          location: 'Wayanad',
          category: 'Residential',
          year: '2024',
          status: 'Completed',
          area: '6,400 sq.ft',
          heroImage: '/images/wayanad-pavilion.jpg',
          overview: 'Perched along the emerald contours of Wayanad, the Mist Pavilion harmonizes contemporary glass cantilevers with raw laterite and teakwood, dissolving the barrier between living spaces and the surrounding rainforest.',
          scope: ['Design & Planning', 'Interior Design', 'Site Supervision'],
          gallery: [
            { title: 'Lush Pavilion Cantilever', stage: 'Exterior', image: '/images/wayanad-pavilion.jpg', caption: 'Cantilevered glass volume floating over the natural bio-pond.' },
            { title: 'Travertine & Teak Living Suite', stage: 'Interior', image: '/images/detail-interior.jpg', caption: 'Curated minimalist spatial palette with wabi-sabi lime plaster and low seating.' },
            { title: 'Board-Formed Concrete Joinery', stage: 'Details', image: '/images/detail-craft.jpg', caption: 'Meticulously supervised wood-concrete connection designed for Kerala monsoons.' },
          ],
          order: 0,
        },
        {
          slug: 'calicut-courtyard-residence',
          title: 'Nalukettu Continuum',
          location: 'Calicut',
          category: 'Residential',
          year: '2023',
          status: 'Completed',
          area: '5,800 sq.ft',
          heroImage: '/images/calicut-courtyard.jpg',
          overview: 'A modern spatial reinterpretation of traditional Malabar courtyard homes in Calicut.',
          scope: ['Design & Planning', 'Interior Design', 'Site Supervision'],
          gallery: [
            { title: 'Courtyard Reflection Pool', stage: 'Completed Work', image: '/images/calicut-courtyard.jpg', caption: 'Courtyard axis naturally ventilating the entire private residential quarters.' },
            { title: 'Spatial Materiality', stage: 'Interior', image: '/images/detail-interior.jpg', caption: 'Custom joinery and subtle lime plaster finishing by Scale Interiors.' },
          ],
          order: 1,
        },
        {
          slug: 'kannur-cliff-villa',
          title: 'Arabian Horizon Villa',
          location: 'Kannur',
          category: 'Residential',
          year: '2024',
          status: 'Completed',
          area: '7,200 sq.ft',
          heroImage: '/images/kannur-cliff.jpg',
          overview: 'Engineered into the sheer sea cliffs of Kannur, this multi-tier sanctuary commands panoramic views of the Arabian Sea.',
          scope: ['Design & Planning', 'Site Supervision'],
          gallery: [
            { title: 'Oceanfront Cantilever', stage: 'Exterior', image: '/images/kannur-cliff.jpg', caption: 'Cantilevered infinity pool suspended directly above coastal rock formations.' },
          ],
          order: 2,
        },
        {
          slug: 'kochi-backwater-penthouse',
          title: 'The Waterfront Penthouse',
          location: 'Kochi',
          category: 'InteriorDesign',
          year: '2023',
          status: 'Completed',
          area: '4,500 sq.ft',
          heroImage: '/images/kochi-penthouse.jpg',
          overview: 'A tranquil urban sky home hovering above Kochi backwaters.',
          scope: ['Interior Design', 'Design & Planning'],
          gallery: [
            { title: 'Twilight Pergola Terrace', stage: 'Landscape', image: '/images/kochi-penthouse.jpg', caption: 'Linear outdoor pergola framing panoramic lagoon vistas.' },
          ],
          order: 3,
        },
        {
          slug: 'malappuram-laterite-estate',
          title: 'Laterite Grove Pavilion',
          location: 'Malappuram',
          category: 'Hospitality',
          year: '2024',
          status: 'Completed',
          area: '8,900 sq.ft',
          heroImage: '/images/malappuram-estate.jpg',
          overview: 'Rooted in the indigenous soil of Malappuram, this estate celebrates handcrafted laterite masonry.',
          scope: ['Design & Planning', 'Site Supervision', 'Interior Design'],
          gallery: [
            { title: 'Laterite Courtyard Axis', stage: 'Exterior', image: '/images/malappuram-estate.jpg', caption: 'Hand-chiseled red laterite stone integrated with dark architectural steel.' },
          ],
          order: 4,
        },
        {
          slug: 'calicut-commercial-headquarters',
          title: 'Atelier Central',
          location: 'Calicut',
          category: 'Commercial',
          year: '2023',
          status: 'Completed',
          area: '11,200 sq.ft',
          heroImage: '/images/calicut-courtyard.jpg',
          overview: 'A serene corporate headquarters designed with generous internal gardens and natural light wells.',
          scope: ['Design & Planning', 'Interior Design', 'Site Supervision'],
          gallery: [],
          order: 5,
        },
        {
          slug: 'kannur-boutique-retreat',
          title: 'The Dune Sanctuary',
          location: 'Kannur',
          category: 'Hospitality',
          year: '2024',
          status: 'InProgress',
          area: '14,000 sq.ft',
          heroImage: '/images/kannur-cliff.jpg',
          overview: 'A low-density coastal eco-resort planned across dunes, emphasizing passive microclimate cooling.',
          scope: ['Design & Planning', 'Site Supervision'],
          gallery: [],
          order: 6,
        },
        {
          slug: 'wayanad-hillside-residence',
          title: 'Cloudline Villa',
          location: 'Wayanad',
          category: 'Residential',
          year: '2023',
          status: 'Completed',
          area: '5,100 sq.ft',
          heroImage: '/images/wayanad-pavilion.jpg',
          overview: 'Stepped along natural terrain gradients, this private retreat commands unbroken 360-degree perspectives.',
          scope: ['Design & Planning', 'Interior Design'],
          gallery: [],
          order: 7,
        },
      ],
    });
    console.log('✅ Projects seeded');
  } else {
    console.log('⏭  Projects already exist');
  }

  // ── Team Members ────────────────────────────────────────────────────────
  const existingTeam = await prisma.teamMember.count();
  if (existingTeam === 0) {
    await prisma.teamMember.createMany({
      data: [
        {
          name: 'Bilal M',
          role: 'Co-Founder & Managing Partner',
          quote: 'True spatial luxury is found in precision of proportion, quiet light, and the enduring honesty of materials.',
          image: '/images/founder-bilal.jpg',
          order: 0,
        },
        {
          name: 'Anu Shamil',
          role: 'Co-Founder & Managing Partner',
          quote: 'Our responsibility is to ensure that what begins as an inspired concept on paper survives every challenge of construction intact.',
          image: '/images/founder-anu.jpg',
          order: 1,
        },
      ],
    });
    console.log('✅ Team members seeded');
  } else {
    console.log('⏭  Team members already exist');
  }

  // ── Services ────────────────────────────────────────────────────────────
  const existingServices = await prisma.service.count();
  if (existingServices === 0) {
    await prisma.service.createMany({
      data: [
        {
          slug: 'design-planning',
          title: 'Design & Planning',
          number: '01',
          shortDesc: 'From concept to construction documentation, we develop spaces that are architecturally rigorous and contextually grounded. Our process integrates structural integrity with spatial poetry.',
          deliverables: ['Concept Design', 'Schematic Drawings', 'Design Development', 'Working Drawings', '3D Visualization', 'BOQ & Specifications'],
          image: '/images/model.jpg',
          order: 0,
        },
        {
          slug: 'interior-design',
          title: 'Interior Design',
          number: '02',
          shortDesc: 'Curated environments built from honest materials, quiet lighting, and precision proportion. We design interiors that live as beautifully as they photograph.',
          deliverables: ['Space Planning', 'Material & Finish Selection', 'Custom Furniture Design', 'Lighting Design', 'Art Direction', 'Procurement Coordination'],
          image: '/images/interior-living.jpg',
          order: 1,
        },
        {
          slug: 'site-supervision',
          title: 'Site Supervision',
          number: '03',
          shortDesc: 'Our on-site architects ensure every detail of the design is executed with precision. We bridge the gap between drawings and reality with rigorous quality control.',
          deliverables: ['Site Inspections', 'Contractor Coordination', 'Quality Control', 'Progress Reporting', 'Snag List Management', 'Completion Certification'],
          image: '/images/site-supervision.jpg',
          order: 2,
        },
      ],
    });
    console.log('✅ Services seeded');
  } else {
    console.log('⏭  Services already exist');
  }

  // ── Testimonials ────────────────────────────────────────────────────────
  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    await prisma.testimonial.createMany({
      data: [
        { name: 'Sarah Jenkins', role: 'Homeowner, Calicut', photo: '/images/calicut-courtyard.jpg', videoUrl: 'https://www.youtube.com/embed/YykjpeuMNEk?autoplay=1&mute=1&controls=0&loop=1&enablejsapi=1', order: 0 },
        { name: 'Michael Chen', role: 'CEO, TechFlow', photo: '/images/interior-living.jpg', videoUrl: 'https://www.youtube.com/embed/YykjpeuMNEk?autoplay=1&mute=1&controls=0&loop=1&enablejsapi=1', order: 1 },
        { name: 'Priya Sharma', role: 'Founder, Studio 9', photo: '/images/wayanad-pavilion.jpg', videoUrl: 'https://www.youtube.com/embed/YykjpeuMNEk?autoplay=1&mute=1&controls=0&loop=1&enablejsapi=1', order: 2 },
        { name: 'David Okafor', role: 'Managing Director, Apex', photo: '/images/calicut-courtyard.jpg', videoUrl: 'https://www.youtube.com/embed/YykjpeuMNEk?autoplay=1&mute=1&controls=0&loop=1&enablejsapi=1', order: 3 },
      ],
    });
    console.log('✅ Testimonials seeded');
  } else {
    console.log('⏭  Testimonials already exist');
  }

  // ── About Section ───────────────────────────────────────────────────────
  const existingAbout = await prisma.aboutSection.count();
  if (existingAbout === 0) {
    await prisma.aboutSection.create({
      data: {
        headlinePart1: 'Built on',
        headlinePart2: 'Precision.',
        body: 'What began as a focused design studio has grown into a multidisciplinary consultancy known for raw aesthetic clarity, uncompromised detailing, and the relentless pursuit of perfection. True spatial luxury is found in precision of proportion, quiet light, and the enduring honesty of materials.',
        stat1Value: '120+',
        stat1Label: 'Environments',
        stat2Value: '04',
        stat2Label: 'Pillars',
        shard1Image: '/images/calicut-courtyard.jpg',
        shard2Image: '/images/detail-craft.jpg',
      },
    });
    console.log('✅ About section seeded');
  } else {
    console.log('⏭  About section already exists');
  }

  // ── Site Settings ───────────────────────────────────────────────────────
  const settingsToSeed = [
    { key: 'logo', value: '/images/logo.png' },
    { key: 'tagline', value: 'Spaces shaped with intention — lasting beyond the moment.' },
    { key: 'availabilityStatus', value: 'Accepting New Projects' },
    { key: 'availabilityNote', value: 'For Q4 2026 onwards.' },
    { key: 'enquireText', value: 'Enquire Now' },
  ];

  for (const setting of settingsToSeed) {
    const existing = await prisma.siteSetting.findUnique({ where: { key: setting.key } });
    if (!existing) {
      await prisma.siteSetting.create({ data: setting });
    }
  }
  console.log('✅ Site settings seeded');

  console.log('\n🎉 Seed complete!\n');
  console.log(`📋 Admin login:`);
  console.log(`   Username: ${ADMIN_USERNAME}`);
  console.log(`   Password: ${ADMIN_PASSWORD}`);
  console.log(`   URL:      /admin/login\n`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
