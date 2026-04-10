import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

// In-memory storage for production environments
let inMemoryData: any = null;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Check if we're in production (Vercel/Netlify) where filesystem is read-only
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
      // Store in memory for production
      inMemoryData = data;
      console.log('Data stored in memory for production:', data);
    } else {
      // Write to file for local development
      const filePath = join(process.cwd(), 'public', 'site-data.json');
      writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log('Data written to file for local development:', filePath);
    }
    
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
    let data: any;
    
    // Check if we're in production (Vercel/Netlify) where filesystem is read-only
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
      // Return in-memory data for production
      if (inMemoryData) {
        data = inMemoryData;
        console.log('Returning in-memory data for production');
      } else {
        // Fallback to reading the default file
        const filePath = join(process.cwd(), 'public', 'site-data.json');
        const fs = require('fs');
        const fileData = fs.readFileSync(filePath, 'utf8');
        data = JSON.parse(fileData);
        inMemoryData = data; // Cache it
        console.log('Loaded default data for production');
      }
    } else {
      // Read from file for local development
      const filePath = join(process.cwd(), 'public', 'site-data.json');
      const fs = require('fs');
      const fileData = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(fileData);
      console.log('Data read from file for local development:', filePath);
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading site data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read site data' },
      { status: 500 }
    );
  }
}
