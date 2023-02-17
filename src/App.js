import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Character from './view/Character'
import Search_Comics from './view/Search_Comics'
import Events from './view/Events'
import Test from './view/Test'

export default function () {
  return (
    <div>
      <BrowserRouter>
        <Nav />
      <Routes>
        <Route path='/' element={<Test />}/>
        <Route path='/character' element={<Character />} />
        <Route path='/comics' element={<Search_Comics />} />
        <Route path='/events' element={<Events />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

