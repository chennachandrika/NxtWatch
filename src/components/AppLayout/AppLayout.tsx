import { ReactNode } from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'

interface AppLayoutProps {
  children: ReactNode
  headerContent?: ReactNode
  headerClassName?: string
}

const AppLayout = ({ children, headerContent, headerClassName = '' }: AppLayoutProps) => {
  return (
    <div className="h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {headerContent && (
            <div className={`sticky top-0 z-40 bg-white dark:bg-black px-4 lg:px-8 py-2 border-b border-gray-200 dark:border-gray-800 ${headerClassName}`}>
              {headerContent}
            </div>
          )}
          <div className="flex-1 overflow-y-auto px-4  lg:px-8 py-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AppLayout
