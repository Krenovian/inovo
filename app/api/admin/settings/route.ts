import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession, setSiteSetting } from '@/lib/content';
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
    const { settings } = await request.json();

    // Save each setting key-value pair
    const saves = Object.entries(settings).map(([key, value]) =>
      setSiteSetting(key, String(value ?? ''))
    );
    await Promise.all(saves);

    revalidatePath('/');
    revalidatePath('/our-projects');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Settings save error:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
