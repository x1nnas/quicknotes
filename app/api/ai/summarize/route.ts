import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// AI-powered note summarization
// In a real application, this would call an AI service like OpenAI

interface NoteSummary {
  totalNotes: number
  totalWords: number
  keyTopics: string[]
  summary: string
  recentNotes: string[]
  oldestNote: string | null
  newestNote: string | null
}

// Mock AI summarization - analyzes all notes and provides insights
async function generateSummary(): Promise<NoteSummary> {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (notes.length === 0) {
      return {
        totalNotes: 0,
        totalWords: 0,
        keyTopics: [],
        summary: 'No notes available to summarize. Start creating notes to see insights!',
        recentNotes: [],
        oldestNote: null,
        newestNote: null,
      }
    }

    // Calculate total words
    const totalWords = notes.reduce((acc, note) => {
      const words = note.content.split(/\s+/).filter(word => word.length > 0).length
      return acc + words
    }, 0)

    // Extract key topics (simple keyword extraction)
    const allText = notes.map(n => `${n.title} ${n.content}`).join(' ').toLowerCase()
    const words = allText.split(/\s+/).filter(word => word.length > 3)
    const wordFreq: Record<string, number> = {}
    
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1
    })

    // Get top 5 most frequent words (excluding common words)
    const commonWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'its', 'use', 'with', 'this', 'that', 'from', 'have', 'been', 'more', 'than', 'what', 'when', 'your', 'note', 'notes', 'content', 'title']
    const keyTopics = Object.entries(wordFreq)
      .filter(([word]) => !commonWords.includes(word))
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1))

    // Generate summary
    const recentNotes = notes.slice(0, 3).map(n => n.title)
    const oldestNote = notes[notes.length - 1]?.title || null
    const newestNote = notes[0]?.title || null

    const summary = `You have ${notes.length} ${notes.length === 1 ? 'note' : 'notes'} with a total of ${totalWords.toLocaleString()} words. 
    ${recentNotes.length > 0 ? `Your most recent notes include: ${recentNotes.join(', ')}.` : ''}
    ${keyTopics.length > 0 ? `Key topics you've been exploring: ${keyTopics.join(', ')}.` : ''}
    ${notes.length > 1 ? `Your note-taking journey spans from "${oldestNote}" to "${newestNote}".` : ''}`

    return {
      totalNotes: notes.length,
      totalWords,
      keyTopics,
      summary,
      recentNotes,
      oldestNote,
      newestNote,
    }
  } catch (error) {
    console.error('Error generating summary:', error)
    throw error
  }
}

// GET /api/ai/summarize - Get AI-powered summary of all notes
export async function GET() {
  try {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const summary = await generateSummary()

    return NextResponse.json(summary, { status: 200 })
  } catch (error) {
    console.error('Error generating summary:', error)
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    )
  }
}

