import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Customers from './Customers'



const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/'element={<Customers/>}/>

    </Routes>
  )
}

export default AllRoutes