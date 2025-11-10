import { useState, FormEvent } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate, useLocation } from 'react-router-dom'
import authStore from '../../../stores/AuthModel'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import themeStore from '../../../stores/ThemeModel'

const Login = observer(() => {
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    authStore.clearError()

    const result = await authStore.login({ username, password })
    
    if (result.success) {
      // Redirect to the page user was trying to access, or home
      const state = location.state as { from?: { pathname: string } } | null
      const from = state?.from
      navigate(from?.pathname || '/', { replace: true })
    }
  }

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white  flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              NxtWatch
            </h1>
            <button
              onClick={themeStore.toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {themeStore.theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="USERNAME"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              autoComplete="username"
            />

            <div className="relative">
              <Input
                label="PASSWORD"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-7 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>

            {authStore.errorMessage && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {authStore.errorMessage}
                </p>
              </div>
            )}

            <Button
              type="submit"
              isLoading={authStore.isLoading}
              className="w-full"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
})

export default Login

