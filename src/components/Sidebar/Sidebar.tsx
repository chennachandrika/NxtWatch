import { observer } from 'mobx-react-lite'
import { useNavigate, useLocation } from 'react-router-dom'

interface SidebarItem {
  id: string
  label: string
  icon: string
  path: string
}

const sidebarItems: SidebarItem[] = [
  { id: 'home', label: 'Home', icon: '🏠', path: '/' },
  { id: 'trending', label: 'Trending', icon: '🔥', path: '/trending' },
  { id: 'gaming', label: 'Gaming', icon: '🎮', path: '/gaming' },
  { id: 'saved', label: 'Saved videos', icon: '💾', path: '/saved' },
]

const Sidebar = observer(() => {
  const navigate = useNavigate()
  const location = useLocation()
  const activeItem = sidebarItems.find(item => item.path === location.pathname)?.id || 'home'

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <aside className="hidden lg:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto">
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeItem === item.id
                ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
})

export default Sidebar
