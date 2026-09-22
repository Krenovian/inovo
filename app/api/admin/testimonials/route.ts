import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/content';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value;
  if (!token) return null;
  const session = await getAdminSession(token);
  if (!session || session.expiresAt < new Date()) return null;
  return session;
}

export async function GET(request: NextRequest) {
  const session = await verifyAuth(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const [testimonials, total] = await Promise.all([
      db.testimonial.findMany({
        orderBy: { order: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.testimonial.count(),
    ]);

    return NextResponse.json({ testimonials, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Testimonials GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await verifyAuth(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { testimonial } = await request.json();
    if (!testimonial || !testimonial.id) {
       return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const saved = await db.testimonial.upsert({
      where: { id: testimonial.id },
      update: { ...testimonial },
      create: { ...testimonial },
    });

    revalidatePath('/');
    return NextResponse.json({ success: true, testimonial: saved });
  } catch (error) {
    console.error('Testimonial save error:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await verifyAuth(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await db.testimonial.delete({ where: { id } });
    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Testimonial delete error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
