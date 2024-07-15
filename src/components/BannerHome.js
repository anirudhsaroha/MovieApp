import React from 'react'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom'

const BannerHome = ({bannerData , imageUrl }) => {

  return (
    <section className='w-full h-full' >
        <div className='flex min-h-full max-h-[95vh]'  >
        {
            bannerData.map( (data , index ) => {
                return (
                <div key={index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative' >
                    <div  className='w-full h-full' >
                        <img className='w-full h-full object-cover' src={imageUrl+data.backdrop_path} />
                    </div>
                    <div className='absolute top-0 w-full h-full hidden items-center  justify-between px-4 lg:flex'>
                                    <button className='p-1 rounded-full z-10 text-white font-bold text-5xl'>
                                        <FaAngleLeft/>
                                    </button>
                                    <button className=' p-1 rounded-full  text-5xl z-10 text-white font-black '>
                                        <FaAngleRight/>
                                    </button>
                                </div>
                    <div  className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'>
                                </div>
                                <div className='container mx-auto'>
                                    <div className=' w-full absolute bottom-0 max-w-md px-3'>
                                        <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl '>{data?.title || data?.name}</h2>
                                        <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>
                                        <div className='flex items-center gap-4'>
                                            <p>Rating : { Number(data.vote_average).toFixed(1) }+</p>
                                            <span>|</span>
                                            <p>View : { Number(data.popularity).toFixed(0) }</p>
                                        </div>
                                        <Link to={"/"+data?.media_type+"/"+data.id}>
                                            <button  className=' bg-white px-4 py-2 text-black font-bold rounded mt-4  hover:bg-gradient-to-r from-orange-700 to-yellow-500 shadow-md transition-all hover:scale-105'>
                                                Play Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                </div>
                
                    

                )
            })
        }
        </div>

    </section>
  )
}

export default BannerHome
