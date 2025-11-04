import { NextResponse } from 'next/server'

// Mock AI title generation - returns a random creative title
// In a real application, this would call an AI service like OpenAI

const creativeTitles = [
  'The Art of Reflection',
  'Moments of Clarity',
  'Digital Reminiscence',
  'Thoughts in Motion',
  'The Quiet Observer',
  'Chronicles of Wonder',
  'Mindful Musings',
  'Echoes of Yesterday',
  'The Daily Compass',
  'Scribbles of Serendipity',
  'Whispers of Wisdom',
  'The Thoughtful Wanderer',
  'Pages of Possibility',
  'Notes from Within',
  'The Mindful Journal',
]

// GET /api/ai/title - Generate a smart title (mocked)
export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Return random title
    const randomTitle =
      creativeTitles[Math.floor(Math.random() * creativeTitles.length)]

    return NextResponse.json(
      { title: randomTitle },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error generating title:', error)
    return NextResponse.json(
      { error: 'Failed to generate title' },
      { status: 500 }
    )
  }
}

