import {Routes, Route, useNavigate} from 'react-router-dom'
import CustomerAppContainer from './components/appContainers/customerAppContainer';
import Login from './components/profiling/login'
import Register from './components/profiling/register';
import './App.css'
import AddCar from './components/main/addCar';
import { useEffect } from 'react';
function CheckUser() {
  const navigate = useNavigate()
  useEffect(() => {
    const val = localStorage.getItem('user')
    console.log(val)
    if (!val) navigate('/login')
    else navigate('/customer')
  }, [])
  return (
    <></>
  )
}
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<CheckUser />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<AddCar />} />
        <Route path='/customer/*' element={<CustomerAppContainer />} />
      </Routes> 
    </div>
  );
}

export default App;
