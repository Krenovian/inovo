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

    const [projects, total] = await Promise.all([
      db.project.findMany({
        orderBy: { order: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.project.count(),
    ]);

    return NextResponse.json({ projects, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Projects GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await verifyAuth(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { project } = await request.json();

    if (!project || !project.id) {
       return NextResponse.json({ error: 'Invalid project data' }, { status: 400 });
    }

    const savedProject = await db.project.upsert({
      where: { id: project.id },
      update: { ...project, gallery: project.gallery || [] },
      create: { ...project, gallery: project.gallery || [] },
    });

    revalidatePath('/');
    revalidatePath('/our-projects');
    return NextResponse.json({ success: true, project: savedProject });
  } catch (error) {
    console.error('Project save error:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await verifyAuth(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await db.project.delete({ where: { id } });

    revalidatePath('/');
    revalidatePath('/our-projects');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Project delete error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
