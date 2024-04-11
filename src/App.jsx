import './App.css';
import Home from './Pages/Home';
import { Toaster } from 'react-hot-toast';

function App() {
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
