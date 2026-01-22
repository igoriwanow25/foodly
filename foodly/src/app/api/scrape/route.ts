import { NextResponse } from 'next/server';
import { ScraperEngine } from '@/lib/scraping/ScraperEngine';

// Prevent caching for this API route
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    try {
        new URL(url);
    } catch {
        return NextResponse.json(
            { error: 'Invalid URL format' },
            { status: 400 }
        );
    }

    const engine = new ScraperEngine();
    const recipe = await engine.scrape(url);

    if (!recipe) {
      return NextResponse.json(
        { error: 'Failed to extract recipe from the provided URL' },
        { status: 422 } // Unprocessable Entity
      );
    }

    return NextResponse.json(recipe, { status: 200 });

  } catch (error: unknown) {
    console.error('API Error:', error);
    
    // Check if it's an Axios error (e.g., 403, 404)
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      error.response
    ) {
      const response = error.response as { status: number };
      return NextResponse.json(
        { error: `External server returned error: ${response.status}` },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
