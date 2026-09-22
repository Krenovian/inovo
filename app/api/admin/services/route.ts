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

export async function POST(request: NextRequest) {
  const session = await verifyAuth(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { services } = await request.json();

    for (let i = 0; i < services.length; i++) {
      const s = services[i];
      await db.service.upsert({
        where: { id: s.id },
        update: { ...s, order: i },
        create: { ...s, order: i },
      });
    }

    const ids = services.map((s: { id: string }) => s.id);
    await db.service.deleteMany({ where: { id: { notIn: ids } } });

    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Services save error:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
