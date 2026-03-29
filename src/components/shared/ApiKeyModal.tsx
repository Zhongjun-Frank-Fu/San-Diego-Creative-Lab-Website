import { useState, useEffect } from 'react'
import { useAppStore } from '@/store/appStore'
import { setApiConfig, isApiKeySet } from '@/lib/llm'

export default function ApiKeyModal() {
  const { apiKeyModalOpen, setApiKeyModalOpen } = useAppStore()
  const [key, setKey] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [model, setModel] = useState('')

  useEffect(() => {
    if (!isApiKeySet()) {
      setApiKeyModalOpen(true)
    }
  }, [setApiKeyModalOpen])

  useEffect(() => {
    if (apiKeyModalOpen) {
      setKey(localStorage.getItem('api_key') || '')
      setBaseUrl(localStorage.getItem('api_base_url') || import.meta.env.VITE_API_BASE_URL || 'https://api.z.ai/v1')
      setModel(localStorage.getItem('model_name') || import.meta.env.VITE_MODEL_NAME || 'gpt-4o-mini')
    }
  }, [apiKeyModalOpen])

  if (!apiKeyModalOpen) return null

  const handleSave = () => {
    if (!key.trim()) return
    setApiConfig(key.trim(), baseUrl.trim(), model.trim())
    setApiKeyModalOpen(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <h2 className="text-xl font-bold mb-1 text-white">API Configuration</h2>
        <p className="text-slate-400 text-sm mb-5">Configure your LLM API to get started.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">API Key *</label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Base URL</label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.z.ai/v1"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="gpt-4o-mini"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          {isApiKeySet() && (
            <button
              onClick={() => setApiKeyModalOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!key.trim()}
            className="flex-1 px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
