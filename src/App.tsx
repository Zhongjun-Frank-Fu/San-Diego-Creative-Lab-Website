import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import PageTransition from './components/shared/PageTransition'
import { lazy, Suspense } from 'react'

const CodeTutorPage = lazy(() => import('./features/code-tutor/CodeTutorPage'))
const FlashcardPage = lazy(() => import('./features/flashcards/FlashcardPage'))
const PaperChatPage = lazy(() => import('./features/paper-chat/PaperChatPage'))
const RoadmapPage = lazy(() => import('./features/syllabus-roadmap/RoadmapPage'))

function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-pulse text-on-surface-variant font-mono text-sm">Loading module...</div>
    </div>
  )
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <PageTransition>{children}</PageTransition>
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HomePage: full-page layout with its own top navbar */}
        <Route index element={<HomePage />} />

        {/* Feature pages: sidebar layout */}
        <Route element={<Layout />}>
          <Route path="flashcards" element={<Page><FlashcardPage /></Page>} />
          <Route path="paper-chat" element={<Page><PaperChatPage /></Page>} />
          <Route path="roadmap" element={<Page><RoadmapPage /></Page>} />
          <Route path="code-tutor" element={<Page><CodeTutorPage /></Page>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
