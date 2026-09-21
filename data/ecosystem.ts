export interface EcosystemEntity {
  number: string;
  categoryTag: string;
  name: string;
  descriptor: string;
  role: string;
  focus: string;
  linkText: string;
}

export const ECOSYSTEM_ENTITIES: EcosystemEntity[] = [
  {
    number: '01',
    categoryTag: '01 / DESIGN CONSULTANCY',
    name: 'INOVO Developers',
    descriptor: 'Design Consultancy',
    role: 'Vision, spatial strategy, and holistic concept planning for discerning clients.',
    focus: 'Spatial curation, client dialogue, and master design orchestration across Kerala.',
    linkText: 'Explore Consultancy'
  },
  {
    number: '02',
    categoryTag: '02 / CONSTRUCTION',
    name: 'Upward',
    descriptor: 'Construction & Project Delivery',
    role: 'Turnkey structural delivery and high-precision building execution.',
    focus: 'Structural integrity, engineering excellence, and synchronized site timelines.',
    linkText: 'View Project Delivery'
  },
  {
    number: '03',
    categoryTag: '03 / INTERIORS',
    name: 'Scale',
    descriptor: 'Interiors, Furniture & Finishing',
    role: 'Artisan furniture manufacture, custom joinery, and tailored spatial finishes.',
    focus: 'Material detailing, bespoke millwork, and tactile interior layering.',
    linkText: 'Discover Scale'
  },
  {
    number: '04',
    categoryTag: '04 / DEVELOPMENT',
    name: 'INOVO Properties',
    descriptor: 'Property Development & Opportunities',
    role: 'Strategic land curation, joint development, and premium real estate opportunities.',
    focus: 'Site acquisition, feasibility analysis, and sustainable community building.',
    linkText: 'View Opportunities'
  }
];
