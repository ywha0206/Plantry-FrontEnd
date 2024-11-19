import { Route, Routes } from 'react-router-dom'
import '@/App.scss'
import Index from '@/pages'
import Main from '@/layout/main/Main.jsx'
import Login from '@/pages/user/Login.jsx'
import Board from '@/pages/community/board'

function App() {
  return (
    <div className='app-container'>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route index element={<Index />}/>
          <Route path='/user'>
            <Route path='/user/login' element={<Login />}/>
          </Route>
          <Route path='/admin'>

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
