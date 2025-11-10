import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import authStore from '../../stores/AuthModel'
import themeStore from '../../stores/ThemeModel'

const Home = observer(() => {
  const navigate = useNavigate()

  const handleLogout = () => {
    authStore.logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Home</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={themeStore.toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {themeStore.theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Welcome to NxtWatch!</h2>
          <p className="text-gray-600 dark:text-gray-400">
            You have successfully logged in.
          </p>
        </div>
      </div>
    </div>
  )
})

export default Home
