import { observer } from 'mobx-react-lite'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface SidebarItem {
  id: string
  labelKey: string
  icon: string
  path: string
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const sidebarItems: SidebarItem[] = [
  { id: 'home', labelKey: 'sidebar.home', icon: '🏠', path: '/' },
  { id: 'trending', labelKey: 'sidebar.trending', icon: '🔥', path: '/trending' },
  { id: 'gaming', labelKey: 'sidebar.gaming', icon: '🎮', path: '/gaming' },
  { id: 'saved', labelKey: 'sidebar.savedVideos', icon: '💾', path: '/saved' },
]

const Sidebar = observer(({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const activeItem = sidebarItems.find(item => item.path === location.pathname)?.id || 'home'

  const handleNavigation = (path: string) => {
    navigate(path)
    // Close sidebar on mobile after navigation
    onClose()
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Close Button - Mobile Only */}
        <div className="lg:hidden flex justify-end p-4 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex outline-none items-center gap-3 px-4 py-3 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeItem === item.id
                  ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              aria-label={t(item.labelKey)}
              aria-current={activeItem === item.id ? 'page' : undefined}
            >
              <span className="text-xl" aria-hidden="true">{item.icon}</span>
              <span className="font-medium">{t(item.labelKey)}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
})

export default Sidebar

