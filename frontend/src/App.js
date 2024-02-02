import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CategoryProviderProvider } from './Contexts/CategoryContext';
import { UserContextProvider } from './Contexts/UserContext';
import Routings from './Routes/Routes';
import ReactGA from "react-ga4";


function App() {

  const trackingId = process.env.REACT_APP_GA_TRACKING_ID;
  ReactGA.initialize(trackingId);
  ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Traffic hit" });

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
