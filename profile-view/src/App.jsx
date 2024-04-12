import './App.css';
import EditProfile from './Pages/EditProfile';
import Home from './Pages/Home';
import { Toaster } from 'react-hot-toast';

function App() {
  if(!localStorage.getItem('userinfo')) localStorage.setItem('userinfo', JSON.stringify([{}]))
  return (
    <div className="App">
       {/* <Home></Home> */}
       <EditProfile></EditProfile>
       <Toaster
       position="top-center"
       reverseOrder={false}
     />
    </div>
  );
}

export default App;
