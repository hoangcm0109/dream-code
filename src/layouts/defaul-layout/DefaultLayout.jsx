import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './style.scss'
const DefaultLayout = () => {
  return (
    <div className='main'>
        <Header />
        <div className="main__content">
            <Outlet />
        </div>
    </div>
  )
}

export default DefaultLayout