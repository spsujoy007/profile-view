import { RouterProvider } from 'react-router-dom';
import './App.css';
import EditProfile from './Pages/EditProfile';
import Home from './Pages/Home';
import { Toaster } from 'react-hot-toast';
import { routes } from './Routes';

function App() {
  if(!localStorage.getItem('userinfo')) localStorage.setItem('userinfo', JSON.stringify([{}]))
  return (
    <div className="App">
      <RouterProvider router={routes}></RouterProvider>
       <Toaster
       position="top-center"
       reverseOrder={false}
     />
    </div>
  );
}

export default App;
