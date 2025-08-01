import React from 'react'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import router from './router'
import store from './store'

function App() {
  return (
    <div className="min-h-screen">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  )
}

export default App
