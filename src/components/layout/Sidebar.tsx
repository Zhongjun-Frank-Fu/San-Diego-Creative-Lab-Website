import { NavLink } from 'react-router'
import { useAppStore } from '@/store/appStore'

const tools = [
  { path: '/', label: 'Home', icon: '🏠', color: '' },
  { path: '/flashcards', label: 'Flashcards', icon: '🃏', color: 'text-amber-400' },
  { path: '/paper-chat', label: 'Paper Chat', icon: '📄', color: 'text-cyan-400' },
  { path: '/roadmap', label: 'Roadmap', icon: '🗺️', color: 'text-emerald-400' },
  { path: '/code-tutor', label: 'Code Tutor', icon: '💻', color: 'text-violet-400' },
]

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useAppStore()

  return (
    <aside
      className={`${
        sidebarCollapsed ? 'w-16' : 'w-56'
      } bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 shrink-0`}
    >
      <div className="p-4 flex items-center justify-between border-b border-slate-800">
        {!sidebarCollapsed && (
          <span className="font-bold text-lg bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Creative Lab
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        >
          {sidebarCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {tools.map((tool) => (
          <NavLink
            key={tool.path}
            to={tool.path}
            end={tool.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`
            }
          >
            <span className="text-xl">{tool.icon}</span>
            {!sidebarCollapsed && (
              <span className={`text-sm font-medium ${tool.color}`}>{tool.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-800">
        <button
          onClick={() => useAppStore.getState().setApiKeyModalOpen(true)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-colors text-sm"
        >
          <span>⚙️</span>
          {!sidebarCollapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  )
}
