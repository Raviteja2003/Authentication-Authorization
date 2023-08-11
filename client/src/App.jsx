import Login from './Login'
import SignUp from './Signup'
import Home from './Home'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dashboard from './Dashboard'
function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/register' element={<SignUp />}></Route>
            <Route path='/' element={<Login />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App