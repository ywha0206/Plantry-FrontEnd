import { Route, Routes, useLocation } from 'react-router-dom'
import '@/App.scss'
import Index from '@/pages'
import Main from '@/layout/main/Main.jsx'
import Login from '@/pages/user/Login.jsx'
import Board from '@/pages/community/board'
import AdminIndex from './pages/admin/Index'
import MainIndex from './pages'
import AdminUser from './pages/admin/User'

function App() {
  const pathName = useLocation("");
  return (
    <div id='app-container m-0 xl2:mx-auto'>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='' element={<MainIndex />} />
          <Route path='/user'>
            <Route path='login' element={<Login />}/>
          </Route>
          <Route path='/admin'>
            <Route index element={<AdminIndex />} />
            <Route path='user' element={<AdminUser />}/>
          </Route>
          <Route path='/board'>
            <Route index element={<Board />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
