import { Outlet } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';

function App() {

  return (
    <main className='lg:pb-0 pb-14' > 
      <div >
      <Header/>
      <div className='min-h-[70vh]' >
        <Outlet/>
      </div>
      <Footer/>
      <MobileNavigation/>
      </div>
    </main>
  );
}

export default App;
