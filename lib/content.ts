import { db } from './db';
import type { Project, HeroSlide, TeamMember, Service, Testimonial, SiteSetting, AboutSection } from '@prisma/client';

// ─── Hero Slides ─────────────────────────────────────────────────────────────

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return db.heroSlide.findMany({ orderBy: { order: 'asc' } });
}

export async function upsertHeroSlide(data: Omit<HeroSlide, 'createdAt' | 'updatedAt'>) {
  return db.heroSlide.upsert({
    where: { id: data.id },
    update: data,
    create: data,
  });
}

export async function deleteHeroSlide(id: string) {
  return db.heroSlide.delete({ where: { id } });
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  return db.project.findMany({ orderBy: { order: 'asc' } });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return db.project.findUnique({ where: { slug } });
}

export async function upsertProject(data: Omit<Project, 'createdAt' | 'updatedAt'>) {
  return db.project.upsert({
    where: { id: data.id },
    update: data,
    create: data,
  });
}

export async function deleteProject(id: string) {
  return db.project.delete({ where: { id } });
}

// ─── Team Members ─────────────────────────────────────────────────────────────

export async function getTeamMembers(): Promise<TeamMember[]> {
  return db.teamMember.findMany({ orderBy: { order: 'asc' } });
}

export async function upsertTeamMember(data: Omit<TeamMember, 'createdAt' | 'updatedAt'>) {
  return db.teamMember.upsert({
    where: { id: data.id },
    update: data,
    create: data,
  });
}

export async function deleteTeamMember(id: string) {
  return db.teamMember.delete({ where: { id } });
}

// ─── Services ─────────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  return db.service.findMany({ orderBy: { order: 'asc' } });
}

export async function upsertService(data: Omit<Service, 'createdAt' | 'updatedAt'>) {
  return db.service.upsert({
    where: { id: data.id },
    update: data,
    create: data,
  });
}

export async function deleteService(id: string) {
  return db.service.delete({ where: { id } });
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  return db.testimonial.findMany({ orderBy: { order: 'asc' } });
}

export async function upsertTestimonial(data: Omit<Testimonial, 'createdAt' | 'updatedAt'>) {
  return db.testimonial.upsert({
    where: { id: data.id },
    update: data,
    create: data,
  });
}

export async function deleteTestimonial(id: string) {
  return db.testimonial.delete({ where: { id } });
}

// ─── About Section ────────────────────────────────────────────────────────────

export async function getAboutSection(): Promise<AboutSection | null> {
  return db.aboutSection.findFirst();
}

export async function upsertAboutSection(data: Omit<AboutSection, 'updatedAt'>) {
  return db.aboutSection.upsert({
    where: { id: data.id },
    update: data,
    create: data,
  });
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<Record<string, string>> {
  const settings = await db.siteSetting.findMany();
  return Object.fromEntries(settings.map((s: SiteSetting) => [s.key, s.value]));
}

export async function setSiteSetting(key: string, value: string): Promise<SiteSetting> {
  return db.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

// ─── Admin Auth ───────────────────────────────────────────────────────────────

export async function getAdminUser(username: string) {
  return db.adminUser.findUnique({ where: { username } });
}

export async function createAdminSession(userId: string, token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  return db.adminSession.create({ data: { token, userId, expiresAt } });
}

export async function getAdminSession(token: string) {
  return db.adminSession.findUnique({
    where: { token },
    include: { user: true },
  });
}

export async function deleteAdminSession(token: string) {
  return db.adminSession.delete({ where: { token } }).catch(() => null);
}
