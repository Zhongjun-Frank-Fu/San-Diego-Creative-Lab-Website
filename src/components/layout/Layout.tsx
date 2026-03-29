import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
import ApiKeyModal from '../shared/ApiKeyModal'

export default function Layout() {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <ApiKeyModal />
    </div>
  )
}
