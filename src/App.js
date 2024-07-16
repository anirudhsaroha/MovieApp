import { Outlet } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Route , Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {

  const [ bannerData , setBannerData ] = useState([]);
  const [ imageUrl , setImageUrl ] = useState("");

  const fetchTrendingData = async()=>{
    try {
        const response = await axios.get('/trending/all/week')

        setBannerData(response.data.results);
    } catch (error) {
        console.log("error",error)
    }
  }

  const fetchConfiguration = async()=>{
    try {
        const response = await axios.get("/configuration")

        setImageUrl(response.data.images.secure_base_url+"original");
    } catch (error) {
      
    }
  }

  useEffect( () => {
    fetchTrendingData();
    fetchConfiguration();
  }, [] )

  return (
    <main className='lg:pb-0 pb-14' > 
      <div >
      <Header/>
      <div className='' >
        <Outlet/>

        <div>
        <Routes>
          <Route path="" element={<Home bannerData={bannerData} imageUrl={imageUrl} />} />
        </Routes>
        </div>

      </div>
      <Footer/>
      <MobileNavigation/>
      </div>
    </main>
  );
}

export default App;
