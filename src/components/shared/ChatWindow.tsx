import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type Props = {
  messages: ChatMessage[]
  onSend: (message: string) => void
  isLoading?: boolean
  placeholder?: string
  accentColor?: string
  extraActions?: React.ReactNode
}

export default function ChatWindow({
  messages,
  onSend,
  isLoading = false,
  placeholder = 'Type your message...',
  accentColor = 'violet',
  extraActions,
}: Props) {
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    onSend(input.trim())
    setInput('')
  }

  const buttonColors: Record<string, string> = {
    amber: 'bg-amber-600 hover:bg-amber-500',
    cyan: 'bg-cyan-600 hover:bg-cyan-500',
    emerald: 'bg-emerald-600 hover:bg-emerald-500',
    violet: 'bg-violet-600 hover:bg-violet-500',
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-slate-500 text-sm">
            Start a conversation...
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-800/50 text-slate-200 border border-slate-700/50'
              }`}
            >
              {msg.role === 'assistant' ? (
                <div className="prose prose-invert prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm">{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800/50 rounded-2xl px-4 py-3 border border-slate-700/50">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot" />
                <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot" />
                <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-800">
        {extraActions && <div className="mb-3">{extraActions}</div>}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`px-5 py-2.5 rounded-xl text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              buttonColors[accentColor] || buttonColors.violet
            }`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
