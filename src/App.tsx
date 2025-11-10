import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import ErrorBoundary from './components/error/ErrorBoundary'
import { appRoutes, renderRoute } from './routes/routes'

const App = observer(() => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {appRoutes.map((route) => (
            <Route 
              key={route.path} 
              path={route.path} 
              element={renderRoute(route)} 
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
})

export default App
