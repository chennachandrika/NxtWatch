import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { appRoutes, renderRoute } from './routes/routes'

const App = observer(() => {
  return (
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
  )
})

export default App
