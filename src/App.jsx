import { Route, Routes } from 'react-router-dom'

import Customer from './components/Customer/Customer'
import HomePage from './components/Pages/HomePage'
import NavBar from './components/Misc/NavBar'
import NotFound from './components/Pages/NotFound'
import Product from './components/Product/Product'
import Order from './components/Order/Order'
import Signup from './components/Pages/Signup'
import './App.css'

function App() {

  return (
    <div id="appContainer">
      <NavBar />
      <Routes>
        <Route path='/' element={ <HomePage />} />
        <Route path='*' element={ <NotFound />} />
        <Route path='/customer' element={ <Customer />} />
        <Route path='/product' element={ <Product />} />
        <Route path='/order' element={ <Order />} />
        <Route path='/signup' element={ <Signup />} />
      </Routes>
    </div>
  )
}

export default App
