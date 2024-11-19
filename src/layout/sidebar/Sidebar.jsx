import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div id="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/board">Board</Link>
        </li>
      </ul>
    </div>
  )
}
