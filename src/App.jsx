import './App.css';
import Home from './Pages/Home';
import { Toaster } from 'react-hot-toast';

function App() {
  if(!localStorage.getItem('userinfo')) localStorage.setItem('userinfo', JSON.stringify([{}]))
  return (
    <div className="App">
       <Home></Home>
       <Toaster
       position="top-center"
       reverseOrder={false}
     />
    </div>
  );
}

export default App;
