// TypeScript interface for Note type
// This matches the Prisma model structure

export interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

// Type for creating a new note (without id and timestamps)
export interface CreateNoteInput {
  title: string
  content: string
}

// Type for updating a note (all fields optional except id)
export interface UpdateNoteInput {
  title?: string
  content?: string
}

