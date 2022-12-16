import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { EventSeverity } from './511'

import Layout from './Layout'
import EventViewer from './pages/EventViewer'
import Search from './pages/Search'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/severity" element={<Layout />}>
          <Route path="severe" element={<EventViewer severity={EventSeverity.SEVERE} />} />
          <Route path="major" element={<EventViewer severity={EventSeverity.MAJOR} />} />
          <Route path="moderate" element={<EventViewer severity={EventSeverity.MODERATE} />} />
          <Route path="minor" element={<EventViewer severity={EventSeverity.MINOR} />} />
          <Route path="unknown" element={<EventViewer severity={EventSeverity.UNKNOWN} />} />
        </Route>
        <Route path="/search" element={<Layout />}>
          <Route index element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
