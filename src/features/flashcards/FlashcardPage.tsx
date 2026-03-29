import { useState } from 'react'
import FileUpload from '@/components/shared/FileUpload'
import { extractTextFromPDF, extractTextFromFile } from '@/lib/pdf'
import { chatCompletion, type Message } from '@/lib/llm'
import { FLASHCARD_SYSTEM_PROMPT } from '@/lib/prompts'
import Papa from 'papaparse'

type Flashcard = {
  front: string
  back: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
}

const difficultyColors = {
  easy: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', label: 'Review in 7 days' },
  medium: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', label: 'Review in 3 days' },
  hard: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', label: 'Review in 1 day' },
}

function FlashcardCard({ card }: { card: Flashcard }) {
  const [flipped, setFlipped] = useState(false)
  const colors = difficultyColors[card.difficulty]

  return (
    <div
      className="perspective-1000 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-52 preserve-3d transition-transform duration-500 ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className={`absolute inset-0 backface-hidden rounded-xl p-5 border ${colors.border} ${colors.bg} flex flex-col`}>
          <div className="flex justify-between items-start mb-3">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
              {card.difficulty}
            </span>
            <span className="text-xs text-slate-500">Click to flip</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-slate-200 text-center font-medium">{card.front}</p>
          </div>
          <div className="flex gap-1 mt-2">
            {card.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">{tag}</span>
            ))}
          </div>
        </div>

        {/* Back */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl p-5 border border-slate-700 bg-slate-800 flex flex-col`}>
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs text-slate-500">Answer</span>
            <span className={`text-xs ${colors.text}`}>{colors.label}</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-slate-300 text-center text-sm leading-relaxed">{card.back}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FlashcardPage() {
  const [cards, setCards] = useState<Flashcard[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')

  const handleFile = async (file: File) => {
    setIsLoading(true)
    setError('')
    setFileName(file.name)

    try {
      let text: string
      if (file.name.endsWith('.pdf')) {
        const result = await extractTextFromPDF(file)
        text = result.text
      } else {
        text = await extractTextFromFile(file)
      }

      if (text.length < 50) {
        setError('The file seems too short to generate meaningful flashcards.')
        setIsLoading(false)
        return
      }

      // Truncate if too long
      const truncated = text.slice(0, 8000)

      const messages: Message[] = [
        { role: 'system', content: FLASHCARD_SYSTEM_PROMPT },
        { role: 'user', content: truncated },
      ]

      const response = await chatCompletion(messages, { jsonMode: true, maxTokens: 3000 })

      // Parse JSON from response
      let parsed: Flashcard[]
      try {
        const data = JSON.parse(response)
        parsed = Array.isArray(data) ? data : data.flashcards || data.cards || []
      } catch {
        // Try to extract JSON array from response
        const match = response.match(/\[[\s\S]*\]/)
        if (match) {
          parsed = JSON.parse(match[0])
        } else {
          throw new Error('Failed to parse flashcards from AI response')
        }
      }

      setCards(parsed)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportCSV = () => {
    const csv = Papa.unparse(cards.map(c => ({
      Front: c.front,
      Back: c.back,
      Tags: c.tags.join('; '),
    })))
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'flashcards.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleTryExample = async () => {
    const exampleText = `Machine Learning Fundamentals

Supervised Learning: A type of machine learning where the model is trained on labeled data. The algorithm learns to map inputs to outputs based on example input-output pairs. Common algorithms include linear regression, decision trees, and neural networks.

Unsupervised Learning: The model works with unlabeled data, discovering hidden patterns and structures. Key techniques include clustering (K-means, hierarchical), dimensionality reduction (PCA, t-SNE), and association rules.

Overfitting: When a model learns the training data too well, including its noise and outliers, leading to poor performance on new, unseen data. Solutions include regularization, cross-validation, and early stopping.

Bias-Variance Tradeoff: Bias is the error from overly simplistic assumptions. Variance is the error from sensitivity to small fluctuations. The goal is to find the sweet spot that minimizes total error.

Gradient Descent: An optimization algorithm used to minimize the loss function by iteratively adjusting model parameters in the direction of steepest descent. Variants include SGD, Mini-batch GD, and Adam optimizer.

Cross-Validation: A technique to evaluate model performance by splitting data into multiple train-test sets. K-fold cross-validation divides data into K subsets, using each as a test set once.

Feature Engineering: The process of creating new features from existing data to improve model performance. Includes normalization, encoding categorical variables, and creating interaction features.`

    setIsLoading(true)
    setFileName('ML_Fundamentals.txt')
    setError('')

    try {
      const messages: Message[] = [
        { role: 'system', content: FLASHCARD_SYSTEM_PROMPT },
        { role: 'user', content: exampleText },
      ]

      const response = await chatCompletion(messages, { jsonMode: true, maxTokens: 3000 })
      let parsed: Flashcard[]
      try {
        const data = JSON.parse(response)
        parsed = Array.isArray(data) ? data : data.flashcards || data.cards || []
      } catch {
        const match = response.match(/\[[\s\S]*\]/)
        parsed = match ? JSON.parse(match[0]) : []
      }
      setCards(parsed)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">🃏</span>
          <h1 className="text-3xl font-bold text-amber-400 mb-2">Smart Flashcard Generator</h1>
          <p className="text-slate-400">Upload your notes and AI will create study flashcards</p>
        </div>

        {cards.length === 0 && !isLoading ? (
          <div className="max-w-lg mx-auto space-y-4">
            <FileUpload
              onFileSelect={handleFile}
              label="Drop your study notes here"
              description="PDF, TXT, or MD files"
              accentColor="amber"
            />
            <button
              onClick={handleTryExample}
              className="w-full py-2.5 rounded-xl border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-colors text-sm"
            >
              ✨ Try with Example (ML Fundamentals)
            </button>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400 mb-4" />
            <p className="text-slate-400">Analyzing {fileName} and generating flashcards...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-slate-400 text-sm">{fileName}</span>
                <span className="text-slate-600 text-sm ml-2">•</span>
                <span className="text-slate-400 text-sm ml-2">{cards.length} cards</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium transition-colors"
                >
                  📥 Export CSV
                </button>
                <button
                  onClick={() => { setCards([]); setFileName('') }}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 text-sm transition-colors"
                >
                  New Upload
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map((card, i) => (
                <FlashcardCard key={i} card={card} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
