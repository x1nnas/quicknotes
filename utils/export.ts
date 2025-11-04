import { Note } from '@/types/note'

// Export single note as Markdown
export function exportNoteAsMarkdown(note: Note): string {
  return `# ${note.title}

Created: ${new Date(note.createdAt).toLocaleString()}
${note.updatedAt.getTime() !== note.createdAt.getTime() ? `Updated: ${new Date(note.updatedAt).toLocaleString()}` : ''}

---

${note.content}
`
}

// Export single note as text
export function exportNoteAsText(note: Note): string {
  return `${note.title}\n\nCreated: ${new Date(note.createdAt).toLocaleString()}\n${note.updatedAt.getTime() !== note.createdAt.getTime() ? `Updated: ${new Date(note.updatedAt).toLocaleString()}\n` : ''}\n${note.content}`
}

// Export all notes as Markdown
export function exportAllNotesAsMarkdown(notes: Note[]): string {
  const header = `# QuickNotes Export\n\nExported on: ${new Date().toLocaleString()}\nTotal Notes: ${notes.length}\n\n---\n\n`
  
  const notesContent = notes
    .map((note) => {
      return `## ${note.title}\n\nCreated: ${new Date(note.createdAt).toLocaleString()}\n${note.updatedAt.getTime() !== note.createdAt.getTime() ? `Updated: ${new Date(note.updatedAt).toLocaleString()}\n` : ''}\n\n${note.content}\n\n---\n\n`
    })
    .join('')

  return header + notesContent
}

// Download file utility
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Export single note
export function exportSingleNote(note: Note, format: 'markdown' | 'text' = 'markdown') {
  const content = format === 'markdown' 
    ? exportNoteAsMarkdown(note) 
    : exportNoteAsText(note)
  
  const extension = format === 'markdown' ? 'md' : 'txt'
  const mimeType = format === 'markdown' ? 'text/markdown' : 'text/plain'
  const filename = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${extension}`
  
  downloadFile(content, filename, mimeType)
}

// Export all notes
export function exportAllNotes(notes: Note[], format: 'markdown' | 'text' = 'markdown') {
  const content = format === 'markdown'
    ? exportAllNotesAsMarkdown(notes)
    : notes.map(exportNoteAsText).join('\n\n---\n\n')
  
  const extension = format === 'markdown' ? 'md' : 'txt'
  const mimeType = format === 'markdown' ? 'text/markdown' : 'text/plain'
  const filename = `quicknotes-export-${new Date().toISOString().split('T')[0]}.${extension}`
  
  downloadFile(content, filename, mimeType)
}

