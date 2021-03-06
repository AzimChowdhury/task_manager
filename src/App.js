import Home from './Components/Home';


import Header from './Components/Header';
import { Routes, Route} from "react-router-dom";
import Calender from './Components/Calander';
import ToDo from './Components/ToDo';
import RequireAuth from './RequireAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Completed from './Components/Completed';
import Footer from './Components/Footer';



function App() {
  
  return (
    <div>
      <Header></Header>   
      
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/calender' element={<RequireAuth><Calender></Calender></RequireAuth>}></Route>
        <Route path='/todo' element={<RequireAuth><ToDo></ToDo></RequireAuth>}></Route>
        <Route path='/completed' element={<RequireAuth><Completed></Completed></RequireAuth>}></Route>
      </Routes>
       <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
