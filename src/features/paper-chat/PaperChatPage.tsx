import { useState, useCallback } from 'react'
import FileUpload from '@/components/shared/FileUpload'
import ChatWindow, { type ChatMessage } from '@/components/shared/ChatWindow'
import { extractTextFromPDF, extractTextFromFile } from '@/lib/pdf'
import { chunkText, findRelevantChunks, type Chunk } from '@/lib/chunker'
import { streamChatCompletion, type Message } from '@/lib/llm'
import { PAPER_CHAT_SYSTEM_PROMPT } from '@/lib/prompts'

export default function PaperChatPage() {
  const [chunks, setChunks] = useState<Chunk[]>([])
  const [fullText, setFullText] = useState('')
  const [fileName, setFileName] = useState('')
  const [pageCount, setPageCount] = useState(0)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFile = async (file: File) => {
    setIsProcessing(true)
    try {
      let text: string
      let pages = 0

      if (file.name.endsWith('.pdf')) {
        const result = await extractTextFromPDF(file)
        text = result.text
        pages = result.pageCount
      } else {
        text = await extractTextFromFile(file)
        pages = Math.ceil(text.split('\n').length / 40)
      }

      setFullText(text)
      setChunks(chunkText(text))
      setFileName(file.name)
      setPageCount(pages)
      setMessages([{
        role: 'assistant',
        content: `I've loaded **${file.name}** (${pages} pages, ~${text.split(/\s+/).length} words). Feel free to ask me anything about the document!\n\nSome things you can try:\n- "What is the main argument?"\n- "Summarize section 2"\n- "Explain this concept in simple terms"`,
      }])
    } catch (err) {
      setMessages([{
        role: 'assistant',
        content: `Error loading file: ${err instanceof Error ? err.message : 'Unknown error'}`,
      }])
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSend = useCallback(async (userMsg: string) => {
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userMsg }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      // Find relevant chunks or use all if text is short
      let contextText: string
      if (fullText.length < 6000) {
        contextText = fullText
      } else {
        const relevant = findRelevantChunks(chunks, userMsg, 5)
        contextText = relevant.map(c => c.text).join('\n\n---\n\n')
      }

      const systemPrompt = PAPER_CHAT_SYSTEM_PROMPT.replace('{context}', contextText)

      const llmMessages: Message[] = [
        { role: 'system', content: systemPrompt },
        ...newMessages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      ]

      await streamChatCompletion(llmMessages, (text) => {
        setMessages([...newMessages, { role: 'assistant', content: text }])
      })
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: `Error: ${err instanceof Error ? err.message : 'Something went wrong'}` }])
    } finally {
      setIsLoading(false)
    }
  }, [messages, fullText, chunks])

  const handleTryExample = async () => {
    const exampleText = `Abstract: This paper presents a comprehensive analysis of transformer architectures in natural language processing. We demonstrate that attention mechanisms, when properly scaled, can achieve state-of-the-art performance on a wide range of language understanding tasks.

Introduction: The field of natural language processing has been revolutionized by the introduction of transformer-based models. Unlike recurrent neural networks (RNNs), transformers process all tokens in parallel, leading to significant improvements in training efficiency. The self-attention mechanism allows the model to weigh the importance of different parts of the input when producing each output element.

Key Findings: Our experiments show that: (1) Multi-head attention captures different types of linguistic relationships across heads, with some heads specializing in syntactic dependencies and others in semantic relationships. (2) Layer normalization placement significantly impacts training stability — pre-norm configurations converge faster but may sacrifice some final performance. (3) Scaling laws suggest predictable performance improvements with increased model size, following a power-law relationship.

Methodology: We trained models ranging from 125M to 6.7B parameters on a diverse corpus of internet text. Training used the Adam optimizer with learning rate warmup and cosine decay schedule. We evaluated on standard benchmarks including GLUE, SuperGLUE, and SQuAD.

Discussion: The results confirm that scale is a reliable driver of performance in language modeling. However, we observe diminishing returns beyond certain thresholds, suggesting that architectural innovations may be needed to continue progress. We also note concerns about the environmental cost of training large models.

Conclusion: Transformer architectures continue to demonstrate remarkable capabilities in NLP. Future work should focus on improving efficiency, reducing computational costs, and developing more interpretable attention patterns.`

    setFullText(exampleText)
    setChunks(chunkText(exampleText))
    setFileName('transformer_analysis.pdf')
    setPageCount(6)
    setMessages([{
      role: 'assistant',
      content: `I've loaded **transformer_analysis.pdf** (6 pages, ~${exampleText.split(/\s+/).length} words). This paper discusses transformer architectures in NLP.\n\nFeel free to ask me anything about the paper!`,
    }])
  }

  if (!fileName && !isProcessing) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8">
            <span className="text-5xl mb-4 block">📄</span>
            <h1 className="text-3xl font-bold text-cyan-400 mb-2">Paper Chat</h1>
            <p className="text-slate-400">Upload a paper or document and chat with it</p>
          </div>
          <div className="space-y-4">
            <FileUpload
              onFileSelect={handleFile}
              label="Drop your paper or document here"
              description="PDF, TXT, or MD files"
              accentColor="cyan"
            />
            <button
              onClick={handleTryExample}
              className="w-full py-2.5 rounded-xl border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors text-sm"
            >
              ✨ Try with Example (Transformer Analysis Paper)
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isProcessing) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400 mb-4" />
        <p className="text-slate-400">Processing document...</p>
      </div>
    )
  }

  return (
    <div className="h-full flex">
      {/* Document info sidebar */}
      <div className="w-64 border-r border-slate-800 p-4 shrink-0">
        <h3 className="text-sm font-medium text-slate-400 mb-3">Document</h3>
        <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
          <p className="text-cyan-400 text-sm font-medium truncate">{fileName}</p>
          <p className="text-slate-500 text-xs mt-1">{pageCount} pages • {chunks.length} chunks</p>
        </div>
        <button
          onClick={() => { setFileName(''); setChunks([]); setMessages([]); setFullText('') }}
          className="w-full py-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 transition-colors text-sm"
        >
          Upload New Document
        </button>
      </div>

      {/* Chat */}
      <div className="flex-1">
        <ChatWindow
          messages={messages}
          onSend={handleSend}
          isLoading={isLoading}
          placeholder="Ask about the document..."
          accentColor="cyan"
        />
      </div>
    </div>
  )
}
