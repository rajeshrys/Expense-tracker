import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Loginpage from '../pages/Loginpage'
import Registerpage from '../pages/Registerpage'
import UserDashboard from '../pages/UserDashboard'
import Expense from '../pages/Expense'
import ProtectedRoute from '../routes/ProtectedRoute'
import Income from '../pages/Income'
import  Profile  from '../pages/Profile'

const Approutes = () => {
  return (
    <div>
        <Routes>
            <Route  path = '/' element ={<Homepage />} />
            <Route path = '/login' element= {<Loginpage />} />
            <Route path='register' element={<Registerpage />} />
            <Route path='/userdashboard' element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute> 
              } />
              <Route path='/income' element={
                <ProtectedRoute>
                  <Income />
                </ProtectedRoute>
              }
              />
              <Route path='/expense' element={
                <ProtectedRoute>
                  <Expense />
                </ProtectedRoute>
              }
              />
              <Route path='/profile' element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
              />
        </Routes>
    </div>
  )
}

export default Approutes
