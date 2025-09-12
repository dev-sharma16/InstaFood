import React from 'react'
import { Route, Routes } from "react-router-dom"
import UserLogin from '../pages/UserLogin'
import UserRegister from '../pages/UserRegister'
import FoodPartnerLogin from '../pages/FoodPartnerLogin'
import FoodPartnerRegister from '../pages/FoodPartnerRegister'
import Home from '../pages/Home'
import AddFood from '../pages/AddFood'
import AllForms from '../pages/AllForms'
import FoodPartnerProfile from '../pages/FoodPartnerProfile'
import SavedVideo from '../pages/SavedVideo'
import SavedVideoDetail from '../pages/VideoDetail'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/user/register' element={<UserRegister/>}/>
      <Route path='/user/login' element={<UserLogin/>}/>
      <Route path='/food-partner/register' element={<FoodPartnerRegister/>}/>
      <Route path='/food-partner/login' element={<FoodPartnerLogin/>}/>
      <Route path='/food-partner/addFood' element={<AddFood/>}/>
      <Route path='/food-partner/:id' element={<FoodPartnerProfile/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/allForms' element={<AllForms/>}/>
      <Route path='/saved' element={<SavedVideo/>}/>
      <Route path='/saved/:id' element={<SavedVideoDetail/>}/>
    </Routes>
  )
}

export default AppRoutes;
