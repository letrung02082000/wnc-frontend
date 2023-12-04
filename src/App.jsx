import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from './routes';
import LoadingScreen from './components/LoadingScreen';

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
      <ToastContainer/>
    </RecoilRoot>
  );
}

export default App;
