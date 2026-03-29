import { create } from 'zustand'

type AppStore = {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  apiKeyModalOpen: boolean
  setApiKeyModalOpen: (open: boolean) => void
}

export const useAppStore = create<AppStore>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  apiKeyModalOpen: false,
  setApiKeyModalOpen: (open) => set({ apiKeyModalOpen: open }),
}))
