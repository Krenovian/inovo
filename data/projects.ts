export interface Project {
  id: string;
  title: string;
  location: 'Calicut' | 'Kannur' | 'Wayanad' | 'Malappuram' | 'Kochi' | 'Other active project locations';
  category: 'Residential' | 'Commercial' | 'Hospitality' | 'Interior Design';
  year: string;
  status: 'Completed' | 'In Progress';
  area: string;
  heroImage: string;
  overview: string;
  scope: ('Design & Planning' | 'Interior Design' | 'Site Supervision')[];
  gallery: {
    title: string;
    stage: 'Exterior' | 'Interior' | 'Details' | 'Landscape' | 'Completed Work';
    image: string;
    caption: string;
  }[];
}

export const PROJECTS: Project[] = [
  {
    id: 'wayanad-glass-pavilion',
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
      {
        title: 'Lush Pavilion Cantilever',
        stage: 'Exterior',
        image: '/images/wayanad-pavilion.jpg',
        caption: 'Cantilevered glass volume floating over the natural bio-pond.'
      },
      {
        title: 'Travertine & Teak Living Suite',
        stage: 'Interior',
        image: '/images/detail-interior.jpg',
        caption: 'Curated minimalist spatial palette with wabi-sabi lime plaster and low seating.'
      },
      {
        title: 'Board-Formed Concrete Joinery',
        stage: 'Details',
        image: '/images/detail-craft.jpg',
        caption: 'Meticulously supervised wood-concrete connection designed for Kerala monsoons.'
      }
    ]
  },
  {
    id: 'calicut-courtyard-residence',
    title: 'Nalukettu Continuum',
    location: 'Calicut',
    category: 'Residential',
    year: '2023',
    status: 'Completed',
    area: '5,800 sq.ft',
    heroImage: '/images/calicut-courtyard.jpg',
    overview: 'A modern spatial reinterpretation of traditional Malabar courtyard homes in Calicut. Off-form concrete slabs shelter open living courts cooled naturally by a central waterbody and frangipani canopy.',
    scope: ['Design & Planning', 'Interior Design', 'Site Supervision'],
    gallery: [
      {
        title: 'Courtyard Reflection Pool',
        stage: 'Completed Work',
        image: '/images/calicut-courtyard.jpg',
        caption: 'Courtyard axis naturally ventilating the entire private residential quarters.'
      },
      {
        title: 'Spatial Materiality',
        stage: 'Interior',
        image: '/images/detail-interior.jpg',
        caption: 'Custom joinery and subtle lime plaster finishing by Scale Interiors.'
      },
      {
        title: 'Louvered Shading Envelope',
        stage: 'Exterior',
        image: '/images/detail-craft.jpg',
        caption: 'Operable teak timber louvers tuned for tropical thermal comfort.'
      }
    ]
  },
  {
    id: 'kannur-cliff-villa',
    title: 'Arabian Horizon Villa',
    location: 'Kannur',
    category: 'Residential',
    year: '2024',
    status: 'Completed',
    area: '7,200 sq.ft',
    heroImage: '/images/kannur-cliff.jpg',
    overview: 'Engineered into the sheer sea cliffs of Kannur, this multi-tier sanctuary commands panoramic views of the Arabian Sea with floating terraces and an infinity pool mirroring the horizon.',
    scope: ['Design & Planning', 'Site Supervision'],
    gallery: [
      {
        title: 'Oceanfront Cantilever',
        stage: 'Exterior',
        image: '/images/kannur-cliff.jpg',
        caption: 'Cantilevered infinity pool suspended directly above coastal rock formations.'
      },
      {
        title: 'Minimalist Marine Joinery',
        stage: 'Details',
        image: '/images/detail-craft.jpg',
        caption: 'High-salinity resistant materials executed under rigorous site supervision.'
      }
    ]
  },
  {
    id: 'kochi-backwater-penthouse',
    title: 'The Waterfront Penthouse',
    location: 'Kochi',
    category: 'Interior Design',
    year: '2023',
    status: 'Completed',
    area: '4,500 sq.ft',
    heroImage: '/images/kochi-penthouse.jpg',
    overview: 'A tranquil urban sky home hovering above Kochi backwaters. Features an open pergola terrace, sunken lounge, and bespoke spatial curation blending contemporary luxury with tropical breezes.',
    scope: ['Interior Design', 'Design & Planning'],
    gallery: [
      {
        title: 'Twilight Pergola Terrace',
        stage: 'Landscape',
        image: '/images/kochi-penthouse.jpg',
        caption: 'Linear outdoor pergola framing panoramic lagoon vistas.'
      },
      {
        title: 'Curated Living Texture',
        stage: 'Interior',
        image: '/images/detail-interior.jpg',
        caption: 'Custom monolithic stone plinth and curated furniture ensemble.'
      }
    ]
  },
  {
    id: 'malappuram-laterite-estate',
    title: 'Laterite Grove Pavilion',
    location: 'Malappuram',
    category: 'Hospitality',
    year: '2024',
    status: 'Completed',
    area: '8,900 sq.ft',
    heroImage: '/images/malappuram-estate.jpg',
    overview: 'Rooted in the indigenous soil of Malappuram, this estate celebrates handcrafted laterite masonry, raw steel portal frames, and courtyard rain-chains that sing with the monsoon.',
    scope: ['Design & Planning', 'Site Supervision', 'Interior Design'],
    gallery: [
      {
        title: 'Laterite Courtyard Axis',
        stage: 'Exterior',
        image: '/images/malappuram-estate.jpg',
        caption: 'Hand-chiseled red laterite stone integrated with dark architectural steel.'
      },
      {
        title: 'Monsoon Rain Feature',
        stage: 'Landscape',
        image: '/images/detail-craft.jpg',
        caption: 'Sculptural stone basins and brass water cascades celebrating local climate.'
      }
    ]
  },
  {
    id: 'calicut-commercial-headquarters',
    title: 'Atelier Central',
    location: 'Calicut',
    category: 'Commercial',
    year: '2023',
    status: 'Completed',
    area: '11,200 sq.ft',
    heroImage: '/images/calicut-courtyard.jpg',
    overview: 'A serene corporate headquarters designed with generous internal gardens, natural light wells, and acoustic wood paneling to foster creative collaboration.',
    scope: ['Design & Planning', 'Interior Design', 'Site Supervision'],
    gallery: [
      {
        title: 'Central Garden Atrium',
        stage: 'Interior',
        image: '/images/detail-interior.jpg',
        caption: 'Internal courtyard providing biophilic balance to corporate operations.'
      }
    ]
  },
  {
    id: 'kannur-boutique-retreat',
    title: 'The Dune Sanctuary',
    location: 'Kannur',
    category: 'Hospitality',
    year: '2024',
    status: 'In Progress',
    area: '14,000 sq.ft',
    heroImage: '/images/kannur-cliff.jpg',
    overview: 'A low-density coastal eco-resort planned across dunes, emphasizing passive microclimate cooling, thatched shade roofs, and sustainable local craftsmanship.',
    scope: ['Design & Planning', 'Site Supervision'],
    gallery: [
      {
        title: 'Coastal Masterplan',
        stage: 'Exterior',
        image: '/images/kannur-cliff.jpg',
        caption: 'Low impact footprint preserving sensitive coastal sand dunes.'
      }
    ]
  },
  {
    id: 'wayanad-hillside-residence',
    title: 'Cloudline Villa',
    location: 'Wayanad',
    category: 'Residential',
    year: '2023',
    status: 'Completed',
    area: '5,100 sq.ft',
    heroImage: '/images/wayanad-pavilion.jpg',
    overview: 'Stepped along natural terrain gradients, this private retreat commands unbroken 360-degree perspectives of tea plantations and mist valleys.',
    scope: ['Design & Planning', 'Interior Design'],
    gallery: [
      {
        title: 'Stepped Terrace Outlook',
        stage: 'Landscape',
        image: '/images/wayanad-pavilion.jpg',
        caption: 'Continuous timber decking floating over natural slope vegetation.'
      }
    ]
  }
];

export const LOCATION_LIST: Array<Project['location']> = [
  'Calicut',
  'Kannur',
  'Wayanad',
  'Malappuram',
  'Kochi',
  'Other active project locations'
];

export const CATEGORIES: Array<Project['category'] | 'All'> = [
  'All',
  'Residential',
  'Commercial',
  'Hospitality',
  'Interior Design'
];
