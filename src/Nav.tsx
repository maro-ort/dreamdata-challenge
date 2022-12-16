import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav id="nav">
      <NavLink className="nav__link" to="/severity/severe">
        Severe
      </NavLink>
      <NavLink className="nav__link" to="/severity/major">
        Major
      </NavLink>
      <NavLink className="nav__link" to="/severity/moderate">
        Moderate
      </NavLink>
      <NavLink className="nav__link" to="/severity/minor">
        Minor
      </NavLink>
      <NavLink className="nav__link" to="/severity/unknown">
        Unknown
      </NavLink>
      <NavLink className="nav__link" to="/search">
        Search
      </NavLink>
    </nav>
  )
}

export default Nav
