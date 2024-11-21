import { Route, Routes, useLocation } from 'react-router-dom'
import '@/App.scss'
import Index from '@/pages'
import Main from '@/layout/layout/Main.jsx'
import Login from '@/pages/user/Login.jsx'
import Board from '@/pages/community/board'
import AdminIndex from './pages/admin/Index'
import MainIndex from './pages'
import AdminUser from './pages/admin/User'
import AdminProject from './pages/admin/Project'
import AdminOutSourcing from './pages/admin/OutSourcing'
import AdminCommunity from './pages/admin/Community'
import AdminSchedule from './pages/admin/Schedule'
import AdminVacation from './pages/admin/Vacation'
import AdminAttendance from './pages/admin/Attendance'
import AdminOutSide from './pages/admin/OutSide'

function App() {
  const pathName = useLocation("");
  return (
    <div id='app-container m-0 xl2:mx-auto'>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='' element={<MainIndex />}>
            
          </Route>
          <Route path='/user'>
            <Route path='login' element={<Login />}/>
          </Route>
          <Route path='/admin'>
            <Route index element={<AdminIndex />} />
            <Route path='user' element={<AdminUser />}/>
            <Route path='project' element={<AdminProject />} />
            <Route path='outsourcing' element={<AdminOutSourcing />} />
            <Route path='community' element={<AdminCommunity />} />
            <Route path='schedule' element={<AdminSchedule />} />
            <Route path='vacation' element={<AdminVacation />} />
            <Route path='attendance' element={<AdminAttendance />} />
            <Route path='outside' element={<AdminOutSide />} />
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
