import './App.css'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Movies from './pages/Movies/movies'
import Series from './pages/Series/series'
import Bookmark from './pages/Bookmark/bookmark'
import Loader from './pages/loader/loader'
import loading from '../src/assets/giphy.gif'

function App() {

  return (
    <>
    <div className="loader">
        <img src={loading} alt="" />
        <Loader></Loader>
      </div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/movies' element={<Movies></Movies>}></Route>
        <Route path='/series' element={<Series></Series>}></Route>
        <Route path='/bookmark' element={<Bookmark></Bookmark>}></Route>
      </Routes>
    </>
  )
}

export default App
