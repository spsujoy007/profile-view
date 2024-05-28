import { RouterProvider } from 'react-router-dom';
import './App.css';
import EditProfile from './Pages/EditProfile';
import Home from './Pages/Home';
import { Toaster } from 'react-hot-toast';
import { routes } from './Routes';
import Navbar from './Pages/Navbar';

function App() {
  if(!localStorage.getItem('userinfo')) localStorage.setItem('userinfo', JSON.stringify([{}]))
  return (
    <div className="App">
      <Navbar></Navbar>
      <RouterProvider router={routes}></RouterProvider>
       <Toaster
       position="top-center"
       reverseOrder={false}
     />

     {/* <div className='h-screen flex items-center justify-center flex-col w-[80%] mx-auto overflow-hidden'>
        <h1 className='md:text-[3rem] text-[4rem] text-center text-slate-200 '><span  className='text-[#e4bf39] font-bold uppercase'>Hey dev!</span> <br />"This page is getting a makeover. Check back soon. Stay tuned! "</h1>
        
        <div className='mt-5 text-center border-t-[1px]'>
          <p className='text-lg text-white mt-1'>The owner of this website is updating profileView to change something</p>
          <p className='uppercase'>Updates are in process.</p>
        </div>
     </div> */}

    </div>
  );
}

export default App;
