import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Inventory from './pages/Inventory'
import { RecoilRoot } from 'recoil'

function App() {


  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Inventory />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>


    </>
  )
}

export default App
