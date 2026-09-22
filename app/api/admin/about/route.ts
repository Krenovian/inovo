import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession, upsertAboutSection } from '@/lib/content';
import { revalidatePath } from 'next/cache';

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
    const { about } = await request.json();
    await upsertAboutSection(about);
    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('About save error:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
