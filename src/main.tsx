import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import 'overlayscrollbars/overlayscrollbars.css'

// import './samples/node-api'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>,
  // </React.StrictMode>,
)
postMessage({ payload: 'removeLoading' }, '*')
