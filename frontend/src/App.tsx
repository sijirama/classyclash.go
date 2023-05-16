//import { useState } from 'react'
import './App.css'
import {Routes , Route} from "react-router-dom"
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './components/Login'

function App() {

  return (
    <div className="App">
        <Routes>
            <Route path='/' element={<Layout />} >
               <Route index element={<Public />} /> 
               <Route path='login' element={<Login />} /> 
            </Route>
        </Routes>
   </div>
  )
}

export default App
