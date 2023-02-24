import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './Components/Login/Login';
import Home from './Pages/Home';
import Registration_login from './Pages/Registration_login/Registration_login';

function App() {
  return (
   <div>
    <Router>
      <Routes>
        <Route exact index element={<Home/>}/>
        <Route path='/registration_login' element={<Registration_login/>}/>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
