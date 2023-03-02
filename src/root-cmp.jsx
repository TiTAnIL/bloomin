import React, { useCallback } from 'react'
import { Route, Routes } from 'react-router-dom';
import routes from './routes'

import { AppFooter } from './cmps/app-footer';
import { AppHeader } from './cmps/app-header';

function App() {
  return (
    <div className="main-app">
      <AppHeader />
      <main className='container'>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />
          ))}
        </Routes>
        <AppFooter />
      </main>
    </div>
  )
}

export default App;
