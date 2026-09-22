import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession, upsertHeroSlide, deleteHeroSlide, getHeroSlides } from '@/lib/content';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value;
  if (!token) return null;
  const session = await getAdminSession(token);
  if (!session || session.expiresAt < new Date()) return null;
  return session;
}

export async function POST(request: NextRequest) {
  const session = await verifyAuth(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { slides } = await request.json();

    // Delete all existing and re-create in order
    await db.heroSlide.deleteMany();
    for (let i = 0; i < slides.length; i++) {
      await upsertHeroSlide({ ...slides[i], order: i });
    }

    revalidatePath('/');
    return NextResponse.json({ success: true, count: slides.length });
  } catch (error) {
    console.error('Hero slides save error:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const slides = await getHeroSlides();
    return NextResponse.json(slides);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
