# Creative Lab — Project Schema

> AI-Powered Education Toolkit 官网（Hub/Landing Page + 4-in-1 Monolith）
> Built for 3h Hackathon · React 19 + Vite 8 + Tailwind 4 + TypeScript 5.9

---

## 1. Identity

| Field | Value |
|-------|-------|
| Name | `creative-lab` |
| Role | 官网入口 + 4 个 AI 教育工具的集成 Monolith |
| Port | `5175` (default Vite) |
| Relationship | 是 SmartFlashcard / PaperChat / SyllabusRoadmap / CodeTutor 的**原型合集** |

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.2.4 |
| Build | Vite | 8.0.1 |
| Language | TypeScript (Strict) | 5.9.3 |
| Styling | Tailwind CSS | 4.2.2 |
| State | Zustand | 5.0.12 |
| Routing | React Router | 7.13.2 |
| Animation | Framer Motion | 12.38.0 |
| Graph | @xyflow/react + @dagrejs/dagre | 12.10.1 / 3.0.0 |
| AI Client | openai (browser) | 6.33.0 |
| PDF | pdfjs-dist (CDN worker) | 5.5.207 |
| Markdown | react-markdown + remark-gfm | 10.1.0 / 4.0.1 |
| Code Highlight | react-syntax-highlighter (Prism) | 16.1.1 |
| CSV | papaparse | 5.5.3 |

---

## 3. Architecture

```
┌─────────────────────────────────────────────────────┐
│                    BrowserRouter                     │
│  ┌───────────────────────────────────────────────┐  │
│  │              Layout (flex h-screen)            │  │
│  │  ┌─────────┐ ┌─────────────────────────────┐  │  │
│  │  │ Sidebar │ │         <Outlet />           │  │  │
│  │  │ (nav)   │ │  ┌───────────────────────┐   │  │  │
│  │  │         │ │  │    PageTransition      │   │  │  │
│  │  │  Home   │ │  │  ┌─────────────────┐   │   │  │  │
│  │  │  🃏     │ │  │  │  Feature Page    │   │   │  │  │
│  │  │  📄     │ │  │  │  (lazy loaded)   │   │   │  │  │
│  │  │  🗺️     │ │  │  └─────────────────┘   │   │  │  │
│  │  │  💻     │ │  └───────────────────────┘   │  │  │
│  │  │         │ │                               │  │  │
│  │  │  ⚙️     │ │                               │  │  │
│  │  └─────────┘ └─────────────────────────────┘  │  │
│  │                  ApiKeyModal (z-50)            │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Key Patterns:**
- Client-only SPA (no backend)
- OpenAI API called directly from browser (`dangerouslyAllowBrowser: true`)
- Lazy loading per feature route (code splitting)
- Shared component library (ChatWindow, FileUpload, ApiKeyModal)
- Zustand for minimal global UI state only
- Page-level state via `useState` (no lift-up needed, each page is self-contained)

---

## 4. File Structure

```
Creative Lab/
├── index.html                          # Entry HTML
├── package.json                        # Dependencies
├── vite.config.ts                      # Vite + Tailwind + @ alias
├── tsconfig.json / tsconfig.app.json   # TypeScript config
├── eslint.config.js                    # ESLint
├── .env                                # VITE_API_KEY, VITE_API_BASE_URL, VITE_MODEL_NAME
│
└── src/
    ├── main.tsx                        # ReactDOM.createRoot
    ├── App.tsx                         # BrowserRouter + Routes
    ├── index.css                       # Tailwind + custom CSS (flip, typing dots)
    ├── vite-env.d.ts                   # ImportMetaEnv types
    │
    ├── pages/
    │   └── HomePage.tsx                # Landing: 2×2 tool card grid
    │
    ├── features/                       # Feature modules (lazy loaded)
    │   ├── flashcards/
    │   │   └── FlashcardPage.tsx       # Upload → AI generate → flip cards
    │   ├── paper-chat/
    │   │   └── PaperChatPage.tsx       # Upload → chunk → RAG chat
    │   ├── syllabus-roadmap/
    │   │   └── RoadmapPage.tsx         # Paste syllabus → DAG roadmap
    │   └── code-tutor/
    │       └── CodeTutorPage.tsx       # Problem → Socratic chat tutor
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Layout.tsx              # Sidebar + Outlet + ApiKeyModal
    │   │   └── Sidebar.tsx             # Collapsible nav (Zustand)
    │   └── shared/
    │       ├── ChatWindow.tsx          # Reusable chat UI (markdown, accent colors)
    │       ├── FileUpload.tsx          # Drag-drop file upload
    │       ├── ApiKeyModal.tsx         # API key/baseUrl/model config modal
    │       └── PageTransition.tsx      # Framer Motion fade+slide
    │
    ├── lib/
    │   ├── llm.ts                      # OpenAI client: chatCompletion + streamChatCompletion
    │   ├── pdf.ts                      # extractTextFromPDF + extractTextFromFile
    │   ├── chunker.ts                  # chunkText + findRelevantChunks (keyword-based)
    │   └── prompts.ts                  # System prompts for all 4 tools
    │
    └── store/
        └── appStore.ts                 # Zustand: sidebarCollapsed, apiKeyModalOpen
```

---

## 5. Routing Schema

| Path | Component | Loading | Description |
|------|-----------|---------|-------------|
| `/` | `HomePage` | Eager | Landing page: 2×2 gradient tool cards |
| `/flashcards` | `FlashcardPage` | Lazy | Smart Flashcard Generator |
| `/paper-chat` | `PaperChatPage` | Lazy | Document Q&A Chat |
| `/roadmap` | `RoadmapPage` | Lazy | Syllabus → DAG Roadmap |
| `/code-tutor` | `CodeTutorPage` | Lazy | Socratic Code Tutor |

**Wrapper Chain:** `BrowserRouter > Layout > Suspense > PageTransition > Page`

---

## 6. Type Definitions

### 6.1 Global State (Zustand)

```typescript
type AppStore = {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  apiKeyModalOpen: boolean
  setApiKeyModalOpen: (open: boolean) => void
}
```

### 6.2 LLM Types (`lib/llm.ts`)

```typescript
type Message = {
  role: 'system' | 'user' | 'assistant'
  content: string
}
```

### 6.3 Chat Types (`components/shared/ChatWindow.tsx`)

```typescript
type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}
```

### 6.4 Chunker Types (`lib/chunker.ts`)

```typescript
type Chunk = {
  id: number
  text: string
}
```

### 6.5 Feature-Specific Types (inline in pages)

#### Flashcard (`features/flashcards/FlashcardPage.tsx`)

```typescript
type Flashcard = {
  front: string
  back: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
}
```

#### Roadmap (`features/syllabus-roadmap/RoadmapPage.tsx`)

```typescript
type RoadmapNodeData = {
  label: string
  description: string
  estimatedHours: number
  resources: string[]
  relatedConcepts: string[]
}

type RoadmapData = {
  nodes: Array<{
    id: string
    label: string
    description: string
    estimatedHours: number
    resources: string[]
    relatedConcepts: string[]
  }>
  edges: Array<{ source: string; target: string }>
}
```

---

## 7. AI Integration Schema

### 7.1 API Configuration

| Storage | Key | Fallback |
|---------|-----|----------|
| `localStorage` | `api_key` | `VITE_API_KEY` |
| `localStorage` | `api_base_url` | `VITE_API_BASE_URL` → `https://api.z.ai/v1` |
| `localStorage` | `model_name` | `VITE_MODEL_NAME` → `gpt-4o-mini` |

**Note:** No prefix on localStorage keys (unlike standalone prototypes which use `flashcard_`, `paperchat_`, etc.)

### 7.2 LLM Functions

```typescript
// Non-streaming (flashcards, roadmap)
chatCompletion(messages: Message[], options?: {
  jsonMode?: boolean   // response_format: json_object
  maxTokens?: number   // default 2000
}): Promise<string>

// Streaming (paper-chat, code-tutor)
streamChatCompletion(messages: Message[],
  onChunk: (fullText: string) => void,  // accumulated text, not delta
  options?: { maxTokens?: number }
): Promise<string>
```

### 7.3 System Prompts

| Tool | Prompt Constant | Mode | Output Format |
|------|----------------|------|---------------|
| Flashcards | `FLASHCARD_SYSTEM_PROMPT` | `jsonMode: true` | `Flashcard[]` (8-15 cards) |
| Paper Chat | `PAPER_CHAT_SYSTEM_PROMPT` | Streaming | Markdown text |
| Roadmap | `ROADMAP_SYSTEM_PROMPT` | `jsonMode: true` | `RoadmapData` (6-12 nodes) |
| Code Tutor | `CODE_TUTOR_SYSTEM_PROMPT` | Streaming | Markdown (Socratic Q&A) |
| Code Solution | `CODE_TUTOR_SOLUTION_PROMPT` | Streaming | Markdown + code |

**Template Variables:**
- `{context}` — in PAPER_CHAT_SYSTEM_PROMPT (injected RAG chunks)
- `{language}` — in CODE_TUTOR_*_PROMPT
- `{problem}` — in CODE_TUTOR_*_PROMPT

---

## 8. Feature Schemas

### 8.1 Smart Flashcards (`/flashcards`)

```
┌──────────────────────────────────────────────┐
│              Flow: 3 States                   │
│                                               │
│  State 1: UPLOAD                              │
│  ┌─────────────────────────┐                 │
│  │  FileUpload (PDF/TXT/MD)│                 │
│  │  [Try Example] button   │                 │
│  └────────────┬────────────┘                 │
│               ▼                               │
│  State 2: LOADING                             │
│  ┌─────────────────────────┐                 │
│  │  Spinner + "Analyzing..." │               │
│  └────────────┬────────────┘                 │
│               ▼                               │
│  State 3: RESULTS                             │
│  ┌─────────────────────────┐                 │
│  │  Header: fileName + count│                │
│  │  [Export CSV] [New Upload]│                │
│  │  Grid 1×2×3 FlashcardCard│                │
│  │  (click to flip 3D)      │                │
│  └──────────────────────────┘                │
└──────────────────────────────────────────────┘
```

**AI Input/Output:**
- Input: File text (truncated to 8000 chars) → `FLASHCARD_SYSTEM_PROMPT`
- Output: JSON `Flashcard[]`, parsed via `JSON.parse` with fallback regex `\[...\]`
- Export: PapaParse → CSV blob download

### 8.2 Paper Chat (`/paper-chat`)

```
┌──────────────────────────────────────────────┐
│              Flow: 3 States                   │
│                                               │
│  State 1: UPLOAD                              │
│  ┌─────────────────────────┐                 │
│  │  FileUpload + [Try Example]│              │
│  └────────────┬────────────┘                 │
│               ▼                               │
│  State 2: PROCESSING                          │
│  ┌─────────────────────────┐                 │
│  │  Spinner + "Processing..." │              │
│  └────────────┬────────────┘                 │
│               ▼                               │
│  State 3: CHAT                                │
│  ┌──────┬──────────────────┐                 │
│  │ Info │   ChatWindow     │                 │
│  │ Bar  │   (streaming)    │                 │
│  │ w=64 │                  │                 │
│  └──────┴──────────────────┘                 │
└──────────────────────────────────────────────┘
```

**RAG Pipeline:**
1. File → `extractTextFromPDF()` or `extractTextFromFile()`
2. Text → `chunkText(text, 800)` → `Chunk[]`
3. Query → `findRelevantChunks(chunks, query, 5)` (keyword match)
4. Context injection → `PAPER_CHAT_SYSTEM_PROMPT.replace('{context}', ...)`
5. Short text (<6000 chars) → use full text, skip chunking

### 8.3 Syllabus Roadmap (`/roadmap`)

```
┌──────────────────────────────────────────────┐
│              Flow: 3 States                   │
│                                               │
│  State 1: INPUT                               │
│  ┌─────────────────────────┐                 │
│  │  Textarea (syllabus)    │                 │
│  │  [Generate] [Try Example]│                │
│  └────────────┬────────────┘                 │
│               ▼                               │
│  State 2: LOADING                             │
│  ┌─────────────────────────┐                 │
│  │  Spinner                │                 │
│  └────────────┬────────────┘                 │
│               ▼                               │
│  State 3: VISUALIZATION                       │
│  ┌─────────────────────────┐                 │
│  │  Header: 🗺️ + count     │                │
│  │  ReactFlow canvas       │                 │
│  │  (dagre auto-layout TB) │                 │
│  │  Nodes: expandable cards│                 │
│  │  Edges: animated green  │                 │
│  └──────────────────────────┘                │
└──────────────────────────────────────────────┘
```

**AI Input/Output:**
- Input: Syllabus text → `ROADMAP_SYSTEM_PROMPT`
- Output: JSON `{ nodes: [...], edges: [...] }`
- Layout: dagre `TB` direction, `nodesep=60`, `ranksep=80`, node size `240×120`
- 6 rotating color themes per node

### 8.4 Code Tutor (`/code-tutor`)

```
┌──────────────────────────────────────────────┐
│              Flow: 2 States                   │
│                                               │
│  State 1: SETUP                               │
│  ┌─────────────────────────┐                 │
│  │  Language selector (6)  │                 │
│  │  Problem textarea       │                 │
│  │  Example problems (3)   │                 │
│  │  [Start Tutoring]       │                 │
│  └────────────┬────────────┘                 │
│               ▼                               │
│  State 2: TUTORING                            │
│  ┌──────┬──────────────────┐                 │
│  │ Prob │   ChatWindow     │                 │
│  │ Bar  │   (streaming)    │                 │
│  │ w=80 │                  │                 │
│  │      │                  │                 │
│  │ [💡] │                  │                 │
│  │ [New]│                  │                 │
│  └──────┴──────────────────┘                 │
└──────────────────────────────────────────────┘
```

**Languages:** Python, JavaScript, Java, C++, TypeScript, Go
**Example Problems:** Two Sum, Reverse Linked List, Valid Parentheses
**AI Modes:**
- Normal: Socratic guidance (never gives code)
- Solution: `CODE_TUTOR_SOLUTION_PROMPT` (full code + explanation + complexity)

---

## 9. Shared Component Schema

### 9.1 ChatWindow

```typescript
Props = {
  messages: ChatMessage[]              // Chat history
  onSend: (message: string) => void    // Send handler
  isLoading?: boolean                  // Show typing indicator
  placeholder?: string                 // Input placeholder
  accentColor?: 'amber' | 'cyan' | 'emerald' | 'violet'  // Theme color
  extraActions?: ReactNode             // Extra UI above input
}
```

**Features:** Markdown rendering (ReactMarkdown + remarkGfm), auto-scroll, typing dots animation, themed send button

### 9.2 FileUpload

```typescript
Props = {
  accept?: string                      // Default: '.pdf,.txt,.md'
  onFileSelect: (file: File) => void   // File callback
  label?: string                       // Drop zone text
  description?: string                 // Sub text
  accentColor?: 'amber' | 'cyan' | 'emerald' | 'violet'
}
```

**Features:** Drag-drop + click, visual drag feedback with accent colors

### 9.3 ApiKeyModal

```typescript
// No props — reads from Zustand store
// Auto-opens if no API key is set
// Saves to localStorage: api_key, api_base_url, model_name
```

### 9.4 PageTransition

```typescript
// Framer Motion wrapper
// initial: { opacity: 0, y: 12 }
// animate: { opacity: 1, y: 0 }
// duration: 250ms, easeOut
```

---

## 10. Design Token Schema

### 10.1 Tool Color Map

| Tool | Primary | Gradient | Border | Icon |
|------|---------|----------|--------|------|
| Flashcards | `amber-400` | `amber-500/20 → orange-500/20` | `amber-500/30` | 🃏 |
| Paper Chat | `cyan-400` | `cyan-500/20 → blue-500/20` | `cyan-500/30` | 📄 |
| Roadmap | `emerald-400` | `emerald-500/20 → green-500/20` | `emerald-500/30` | 🗺️ |
| Code Tutor | `violet-400` | `violet-500/20 → purple-500/20` | `violet-500/30` | 💻 |

### 10.2 Base Theme

| Token | Value |
|-------|-------|
| Background | `slate-950` (#020617) |
| Surface | `slate-900` (#0f172a) |
| Card | `slate-800` (#1e293b) |
| Border | `slate-700` (#334155) → `slate-800` |
| Text Primary | `slate-100` (#f1f5f9) |
| Text Secondary | `slate-400` (#94a3b8) |
| Text Muted | `slate-500` (#64748b) |
| Font Sans | Inter, system-ui |
| Font Mono | JetBrains Mono, Fira Code |
| Branding | `violet-400 → cyan-400 → emerald-400` gradient |

### 10.3 Custom CSS

| Class | Purpose |
|-------|---------|
| `.perspective-1000` | 3D flip parent |
| `.preserve-3d` | 3D transform child |
| `.backface-hidden` | Hide flipped face |
| `.rotate-y-180` | Y-axis 180° rotation |
| `.typing-dot` | Bouncing chat indicator (3 dots, staggered 160ms) |

---

## 11. Data Flow Schema

### 11.1 API Config Resolution

```
localStorage.getItem('api_key')
  └→ fallback: import.meta.env.VITE_API_KEY
      └→ fallback: '' (triggers ApiKeyModal auto-open)

localStorage.getItem('api_base_url')
  └→ fallback: import.meta.env.VITE_API_BASE_URL
      └→ fallback: 'https://api.z.ai/v1'

localStorage.getItem('model_name')
  └→ fallback: import.meta.env.VITE_MODEL_NAME
      └→ fallback: 'gpt-4o-mini'
```

### 11.2 Feature Data Flows

```
[Flashcards]
  File → extractText → truncate(8000) → chatCompletion(jsonMode) → JSON.parse → Flashcard[] → grid

[Paper Chat]
  File → extractText → chunkText(800) → [on query] findRelevantChunks(5) → inject context → streamChatCompletion → markdown

[Roadmap]
  Syllabus text → chatCompletion(jsonMode) → JSON.parse → RoadmapData → dagre layout → ReactFlow nodes/edges

[Code Tutor]
  Problem + Language → template substitution → streamChatCompletion → markdown (multi-turn, accumulates history)
```

---

## 12. Relationship to Standalone Prototypes

| Feature | Creative Lab (Monolith) | Standalone Prototype |
|---------|------------------------|---------------------|
| Flashcards | Single page, in-memory | SmartFlashcard: multi-page, IndexedDB, SM-2 spaced repetition, deck management |
| Paper Chat | Single page, keyword RAG | PaperChat: document library, heading extraction, conversation history |
| Roadmap | Single page, view-only DAG | SyllabusRoadmap: library, status tracking, color themes, export PNG |
| Code Tutor | Single page, basic chat | CodeTutor: problem library, hint system, session persistence |
| Architecture | Shared components, monolith | Each has own types, stores, database layer |
| Storage | localStorage only | IndexedDB (idb) for persistent data |
| API Config | `api_key` (no prefix) | `flashcard_apiKey`, `paperchat_api_key`, etc. |

---

## 13. Build & Dev

```bash
# Development
npm run dev          # vite (default port 5173)

# Type Check + Build
npm run build        # tsc -b && vite build

# Lint
npm run lint         # eslint .

# Preview production build
npm run preview      # vite preview
```

### Environment Variables

```env
VITE_API_KEY=sk-...           # OpenAI API key
VITE_API_BASE_URL=/openai-proxy/v1   # Or https://api.openai.com/v1
VITE_MODEL_NAME=gpt-4o-mini          # Model selection
```

---

## 14. Diagram: Complete System

```
                        ┌─────────────────────┐
                        │    Creative Lab      │
                        │    (Monolith Hub)    │
                        │    Port: 5175       │
                        └──────┬──────────────┘
                               │
               ┌───────────────┼───────────────┐
               │               │               │
        ┌──────▼─────┐  ┌─────▼──────┐  ┌─────▼──────┐
        │ Standalone  │  │ Standalone  │  │ Standalone  │
        │ Prototypes  │  │ Prototypes  │  │ Prototypes  │
        │             │  │             │  │             │
   ┌────▼────┐  ┌─────▼───┐  ┌───▼──────┐  ┌──▼───────┐
   │Smart    │  │Paper    │  │Syllabus  │  │Code     │
   │Flashcard│  │Chat     │  │Roadmap   │  │Tutor    │
   │:5176    │  │:5177    │  │:5178     │  │:5179    │
   └─────────┘  └─────────┘  └──────────┘  └──────────┘
                        │
                 ┌──────▼──────┐
                 │  Global .env │
                 │  (shared)    │
                 └──────────────┘
```
