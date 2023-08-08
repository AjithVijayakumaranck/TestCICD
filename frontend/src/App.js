import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CategoryProviderProvider } from './Contexts/CategoryContext';
import { UserContextProvider } from './Contexts/UserContext';
import Routings from './Routes/Routes';


function App() {

  return (

    <CategoryProviderProvider>
      <UserContextProvider>
        
        <div>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnHover={false} theme="colored" />
          <Routings />
        </div>
      </UserContextProvider>
    </CategoryProviderProvider>
  );
}

export default App;
