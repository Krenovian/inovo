export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  details: string[];
  deliverables: string[];
}

export const PRIMARY_SERVICES: ServiceItem[] = [
  {
    id: 'design-planning',
    number: '01',
    title: 'DESIGN & PLANNING',
    shortDesc: 'Concept development, space planning and design direction for residential, commercial and other built environments.',
    details: [
      'Comprehensive spatial planning focused on natural climate adaptation and solar orientation.',
      'Conceptual massing, volumetric hierarchy, and contextual site integration.',
      'Regulatory compliance coordination, zoning analysis, and structural coordination.'
    ],
    deliverables: [
      'Master Spatial Frameworks',
      'Contextual Concept Directives',
      'Detailed Working Sets',
      'Material Specifications'
    ]
  },
  {
    id: 'interior-design',
    number: '02',
    title: 'INTERIOR DESIGN',
    shortDesc: 'Interior planning, materials, finishes, lighting, furniture coordination and complete spatial design.',
    details: [
      'Tactile materiality selection blending indigenous wood, lime plasters, natural stone, and brass.',
      'Sculptural architectural lighting design calibrated for circadian rhythm and mood transition.',
      'Bespoke furniture curation, custom cabinetry details, and complete sensory styling.'
    ],
    deliverables: [
      'Spatial Material Boards',
      'Custom Millwork Packages',
      'Lighting & Electrical Layouts',
      'Procurement & Finish Schedule'
    ]
  },
  {
    id: 'site-supervision',
    number: '03',
    title: 'SITE SUPERVISION',
    shortDesc: 'Site coordination and supervision to ensure the approved design intent is properly translated during execution.',
    details: [
      'Rigorous on-site design coordination bridging consultants, craftspeople, and execution teams.',
      'Continuous quality control checks on cast-in-place concrete, joinery tolerances, and waterproofing.',
      'Design fidelity verification preventing deviations from approved spatial aesthetics.'
    ],
    deliverables: [
      'Regular Site Inspection Logs',
      'Tolerance & Material Approvals',
      'Coordination Milestones',
      'Handover Quality Audit'
    ]
  }
];
