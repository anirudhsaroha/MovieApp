import React, { useEffect, useState } from 'react'
import '../index.css'
import Logo from '../assets/logo.png'
import userIcon from '../assets/user.png'
import { NavLink , useNavigate , Link } from 'react-router-dom'
import { IoSearchOutline } from 'react-icons/io5'
import { navigation } from '../contents/Navigation'

const Header = () => {

    const [ searchInput , setSearchInput ] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // if (searchInput.trim()) {
        //     navigate(`/search?q=${searchInput}`);
        // }
        // setSearchInput("");
    }

    useEffect(() => {
       if( searchInput ){
        navigate(`/search?q=${searchInput}`);
       }
    } , [searchInput, navigate] )

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-75 z-40" >
        <div className='container mx-auto px-2 flex items-center h-full' >
            <Link to="/" >
                <img src={Logo} alt='logo'width={120} ></img>
            </Link>
            <nav className='hidden lg:flex lg:items-center gap-1 ml-5' >
            {
                navigation.map((nav , index ) => {
                   return  <NavLink to={nav.href} key={nav.label} className={ ({isActive}) => `px-3 hover:text-white ${isActive && "text-white"}`}  >
                        {nav.label}
                    </NavLink>
                } )
            }
        </nav>
        <div className='ml-auto flex items-center gap-4' >
            <form className='flex items-center gap-2' onSubmit={handleSubmit} >
                <input type='text' placeholder='Search...' className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                <button className='text-2xl text-white' > <IoSearchOutline/> </button>
            </form>
            <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all' >
                <img src={userIcon} alt='user-icon' className='w-full h-full' ></img>
            </div>
        </div>
        </div>

    </header>
  )
}

export default Header