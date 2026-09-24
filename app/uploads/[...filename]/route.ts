import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest, context: any) {
  try {
    // Await params to be safe across different Next.js App Router versions
    const params = await context.params;
    const filenameArray = params.filename || [];
    const filename = Array.isArray(filenameArray) ? filenameArray.join('/') : filenameArray;
    
    if (!filename) {
      return new NextResponse('Not found', { status: 404 });
    }
    
    // Prevent directory traversal attacks
    if (filename.includes('..')) {
      return new NextResponse('Forbidden', { status: 403 });
    }
    
    const filePath = join(process.cwd(), 'public', 'uploads', filename);
    const file = await readFile(filePath);
    
    let contentType = 'image/jpeg';
    if (filename.endsWith('.png')) contentType = 'image/png';
    else if (filename.endsWith('.webp')) contentType = 'image/webp';
    else if (filename.endsWith('.gif')) contentType = 'image/gif';
    else if (filename.endsWith('.avif')) contentType = 'image/avif';
    else if (filename.endsWith('.svg')) contentType = 'image/svg+xml';
    
    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        // Cache dynamically served files so the browser doesn't keep hitting the API
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new NextResponse('Not found', { status: 404 });
  }
}
