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

    const [teamMembers, total] = await Promise.all([
      db.teamMember.findMany({
        orderBy: { order: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.teamMember.count(),
    ]);

    return NextResponse.json({ teamMembers, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Team GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await verifyAuth(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { teamMember } = await request.json();
    if (!teamMember || !teamMember.id) {
       return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const saved = await db.teamMember.upsert({
      where: { id: teamMember.id },
      update: { ...teamMember },
      create: { ...teamMember },
    });

    revalidatePath('/');
    return NextResponse.json({ success: true, teamMember: saved });
  } catch (error) {
    console.error('Team save error:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await verifyAuth(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await db.teamMember.delete({ where: { id } });
    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Team delete error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
