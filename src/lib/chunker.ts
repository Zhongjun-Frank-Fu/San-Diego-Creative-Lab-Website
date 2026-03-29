export type Chunk = {
  id: number
  text: string
}

export function chunkText(text: string, maxChunkSize = 800): Chunk[] {
  const paragraphs = text.split(/\n\s*\n/)
  const chunks: Chunk[] = []
  let current = ''
  let id = 0

  for (const para of paragraphs) {
    const trimmed = para.trim()
    if (!trimmed) continue

    if (current.length + trimmed.length > maxChunkSize && current.length > 0) {
      chunks.push({ id: id++, text: current.trim() })
      current = ''
    }
    current += trimmed + '\n\n'
  }

  if (current.trim()) {
    chunks.push({ id: id++, text: current.trim() })
  }

  return chunks
}

export function findRelevantChunks(chunks: Chunk[], query: string, topK = 5): Chunk[] {
  const keywords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2)

  const scored = chunks.map(chunk => {
    const lower = chunk.text.toLowerCase()
    const score = keywords.reduce((acc, kw) => {
      const matches = lower.split(kw).length - 1
      return acc + matches
    }, 0)
    return { chunk, score }
  })

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, topK).map(s => s.chunk)
}
