import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login/Login';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import Home from './Pages/Home';
import Registration_login from './Pages/Registration_login/Registration_login';

function App() {
  return (
   <div>
       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnHover={false} theme="colored"/>
    <Router>
      <Routes>
        <Route exact index element={<Home/>}/>
        <Route path='/registration_login' element={<Registration_login/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/resetpassword' element={<ResetPassword/>}/>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
