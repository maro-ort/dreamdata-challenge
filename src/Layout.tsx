import React from 'react'
import { Outlet } from 'react-router-dom'

import ErrorMsg from './common/ErrorMsg'
import Nav from './Nav'

const Layout = () => {
  return (
    <div id="layout">
      <Nav />
      <div id="outlet">
        <Outlet />
      </div>
      <ErrorMsg />
    </div>
  )
}

export default Layout
