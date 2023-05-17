//import { useState } from 'react'
import './App.css'
import {Routes , Route} from "react-router-dom"
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/Welcome'
import NotesList from './features/notes/NotesList'
import UserList from './features/users/UserList'

function App() {

  return (
    <div className="App">
        <Routes>
            <Route path='/*' element={<Layout />} >
               <Route index element={<Public />} /> 
               <Route path='login' element={<Login />} />

               <Route path='dash' element={<DashLayout />}>
                    <Route index element={<Welcome />} />

                    <Route path='notes'>
                        <Route index element={<NotesList/>} />
                    </Route>

                    <Route path='users'>
                        <Route index element={<UserList/>} />
                    </Route>
               </Route>

            </Route>
        </Routes>
   </div>
  )
}

export default App
