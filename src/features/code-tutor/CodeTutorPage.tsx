import { useState, useCallback } from 'react'
import ChatWindow, { type ChatMessage } from '@/components/shared/ChatWindow'
import { streamChatCompletion, type Message } from '@/lib/llm'
import { CODE_TUTOR_SYSTEM_PROMPT, CODE_TUTOR_SOLUTION_PROMPT } from '@/lib/prompts'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const LANGUAGES = ['Python', 'JavaScript', 'Java', 'C++', 'TypeScript', 'Go']

const EXAMPLE_PROBLEMS = [
  { label: 'Two Sum', text: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.' },
  { label: 'Reverse Linked List', text: 'Given the head of a singly linked list, reverse the list, and return the reversed list.' },
  { label: 'Valid Parentheses', text: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. An input string is valid if open brackets are closed by the same type and in the correct order.' },
]

export default function CodeTutorPage() {
  const [problem, setProblem] = useState('')
  const [language, setLanguage] = useState('Python')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [started, setStarted] = useState(false)

  const buildSystemPrompt = useCallback(() => {
    return CODE_TUTOR_SYSTEM_PROMPT
      .replace('{language}', language)
      .replace('{problem}', problem)
  }, [language, problem])

  const handleStart = () => {
    if (!problem.trim()) return
    setStarted(true)
    setMessages([])
    // Send initial message
    handleSendWithProblem("I'd like help solving this problem. Can you guide me?")
  }

  const handleSendWithProblem = async (userMsg: string) => {
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userMsg }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      const llmMessages: Message[] = [
        { role: 'system', content: buildSystemPrompt() },
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
  }

  const handleSend = (text: string) => {
    handleSendWithProblem(text)
  }

  const handleShowSolution = async () => {
    const solutionPrompt = CODE_TUTOR_SOLUTION_PROMPT
      .replace('{language}', language)
      .replace('{problem}', problem)

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: 'Show me the solution' }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      const llmMessages: Message[] = [
        { role: 'system', content: solutionPrompt },
        ...newMessages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      ]

      await streamChatCompletion(llmMessages, (text) => {
        setMessages([...newMessages, { role: 'assistant', content: text }])
      }, { maxTokens: 3000 })
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: `Error: ${err instanceof Error ? err.message : 'Something went wrong'}` }])
    } finally {
      setIsLoading(false)
    }
  }

  if (!started) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <span className="text-5xl mb-4 block">💻</span>
            <h1 className="text-3xl font-bold text-violet-400 mb-2">Code Tutor</h1>
            <p className="text-slate-400">Socratic-method AI tutor — I'll guide you, not give you answers</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Programming Language</label>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      language === lang
                        ? 'bg-violet-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Problem Description</label>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Describe the coding problem you want to solve..."
                rows={5}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500 mb-2">Or try an example:</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROBLEMS.map(ex => (
                  <button
                    key={ex.label}
                    onClick={() => setProblem(ex.text)}
                    className="px-3 py-1.5 rounded-lg text-sm bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={!problem.trim()}
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              Start Tutoring Session
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex">
      {/* Problem sidebar */}
      <div className="w-80 border-r border-slate-800 p-4 overflow-y-auto shrink-0">
        <h3 className="text-sm font-medium text-slate-400 mb-2">Problem</h3>
        <div className="bg-slate-800/50 rounded-lg p-3 text-sm text-slate-300 mb-4">
          {problem}
        </div>
        <div className="text-xs text-slate-500 mb-4">Language: {language}</div>
        <button
          onClick={handleShowSolution}
          disabled={isLoading}
          className="w-full py-2 rounded-lg border border-violet-500/50 text-violet-400 hover:bg-violet-500/10 transition-colors text-sm disabled:opacity-50"
        >
          💡 Show Solution
        </button>
        <button
          onClick={() => { setStarted(false); setMessages([]) }}
          className="w-full py-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 transition-colors text-sm mt-2"
        >
          New Problem
        </button>
      </div>

      {/* Chat */}
      <div className="flex-1">
        <ChatWindow
          messages={messages}
          onSend={handleSend}
          isLoading={isLoading}
          placeholder="Describe your approach or ask for a hint..."
          accentColor="violet"
        />
      </div>
    </div>
  )
}

export { SyntaxHighlighter, oneDark }
