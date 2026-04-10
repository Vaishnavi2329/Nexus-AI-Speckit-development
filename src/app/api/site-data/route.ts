import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Write to the actual site-data.json file
    const filePath = join(process.cwd(), 'public', 'site-data.json');
    writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true, message: 'Site data saved successfully' });
  } catch (error) {
    console.error('Error saving site data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save site data' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public', 'site-data.json');
    const fs = require('fs');
    const data = fs.readFileSync(filePath, 'utf8');
    
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading site data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read site data' },
      { status: 500 }
    );
  }
}
