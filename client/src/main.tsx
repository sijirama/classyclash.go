import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter , createRoutesFromElements , Route , RouterProvider} from "react-router-dom"
import App from './App'
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFound'
import Login from './pages/Login'
import RegisterPage from './pages/RegisterPage'
import {store} from "./app/store"
import { Provider } from 'react-redux'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'

const route = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path="/" element={<HomePage />} />
            <Route path='login' element={<Login />}/>
            <Route path='register' element={<RegisterPage />}/>

            <Route path='' element={<PrivateRoute />}>
                <Route path='profile' element={<Profile />}/>
            </Route>

            <Route path="*" element={<NotFoundPage />}/>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={route} />
    <ToastContainer />
  </React.StrictMode>,
</Provider>
)
