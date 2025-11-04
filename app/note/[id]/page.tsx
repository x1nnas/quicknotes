import { notFound } from 'next/navigation'
import NoteDetailClient from './NoteDetailClient'
import { prisma } from '@/lib/prisma'
import { Note } from '@/types/note'

async function getNote(id: string): Promise<Note | null> {
  try {
    const note = await prisma.note.findUnique({
      where: { id },
    })
    return note
  } catch (error) {
    console.error('Error fetching note:', error)
    return null
  }
}

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const note = await getNote(id)

  if (!note) {
    notFound()
  }

  return <NoteDetailClient note={note} />
}

