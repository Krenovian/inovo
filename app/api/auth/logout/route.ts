import { NextRequest, NextResponse } from 'next/server';
import { deleteAdminSession } from '@/lib/content';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value;
  if (token) {
    await deleteAdminSession(token);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}
