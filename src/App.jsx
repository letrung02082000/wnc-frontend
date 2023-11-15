import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import LoadingScreen from './components/LoadingScreen'

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
    </RecoilRoot>
  );
}

export default App;
