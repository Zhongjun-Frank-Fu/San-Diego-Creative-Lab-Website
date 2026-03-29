import OpenAI from 'openai'

let clientInstance: OpenAI | null = null

function getApiKey(): string {
  return localStorage.getItem('api_key') || import.meta.env.VITE_API_KEY || ''
}

function getBaseUrl(): string {
  return localStorage.getItem('api_base_url') || import.meta.env.VITE_API_BASE_URL || 'https://api.z.ai/v1'
}

function getModel(): string {
  return localStorage.getItem('model_name') || import.meta.env.VITE_MODEL_NAME || 'gpt-4o-mini'
}

export function createClient(): OpenAI {
  clientInstance = new OpenAI({
    apiKey: getApiKey(),
    baseURL: getBaseUrl(),
    dangerouslyAllowBrowser: true,
  })
  return clientInstance
}

function getClient(): OpenAI {
  if (!clientInstance) return createClient()
  return clientInstance
}

export function isApiKeySet(): boolean {
  return !!getApiKey()
}

export function setApiConfig(key: string, baseUrl?: string, model?: string) {
  localStorage.setItem('api_key', key)
  if (baseUrl) localStorage.setItem('api_base_url', baseUrl)
  if (model) localStorage.setItem('model_name', model)
  clientInstance = null // Reset so next call creates fresh client
}

export type Message = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function chatCompletion(
  messages: Message[],
  options?: { jsonMode?: boolean; maxTokens?: number }
): Promise<string> {
  const client = getClient()
  const response = await client.chat.completions.create({
    model: getModel(),
    messages,
    max_tokens: options?.maxTokens ?? 2000,
    ...(options?.jsonMode ? { response_format: { type: 'json_object' } } : {}),
  })
  return response.choices[0]?.message?.content ?? ''
}

export async function streamChatCompletion(
  messages: Message[],
  onChunk: (text: string) => void,
  options?: { maxTokens?: number }
): Promise<string> {
  const client = getClient()
  const stream = await client.chat.completions.create({
    model: getModel(),
    messages,
    max_tokens: options?.maxTokens ?? 2000,
    stream: true,
  })

  let full = ''
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content ?? ''
    if (delta) {
      full += delta
      onChunk(full)
    }
  }
  return full
}
