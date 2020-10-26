import React from "react"
import {BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css'
import { useRoutes } from "./routes"

function App() {
  // useRoutes gets isAuthenticated token in future
  const routes = useRoutes(false)
  return (
    <Router>
      <div className='container'>
        {routes}
      </div>
    </Router>
  )
}

export default App
