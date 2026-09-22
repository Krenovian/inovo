import { NextResponse } from 'next/server';
import {
  getHeroSlides,
  getProjects,
  getTeamMembers,
  getServices,
  getTestimonials,
  getAboutSection,
  getSiteSettings,
} from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [heroSlides, projects, teamMembers, services, testimonials, about, settings] =
      await Promise.all([
        getHeroSlides(),
        getProjects(),
        getTeamMembers(),
        getServices(),
        getTestimonials(),
        getAboutSection(),
        getSiteSettings(),
      ]);

    return NextResponse.json({
      heroSlides,
      projects,
      teamMembers,
      services,
      testimonials,
      about,
      settings,
    });
  } catch (error) {
    console.error('Content API error:', error);
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}
