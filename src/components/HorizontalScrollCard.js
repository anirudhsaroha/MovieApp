import React, { useRef } from 'react'
import Card from './Card'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const HorizontalScrollCard = ({data = []  , heading , imageUrl , trending }) => {

    const containerRef = useRef();

    const handleNext = ()=>{
        containerRef.current.scrollLeft += 300
    }
    const handlePrevious = ()=>{
        containerRef.current.scrollLeft -= 300
    }


  return (
      <div className="container px-3 mx-auto my-10">
        <h2 className="text-xl lg:text-2xl font-bold mb-2">{heading}</h2>

        <div className='relative group overflow-hidden'>

          <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrolbar-none' >
            {
            data.map((data, index) => (
              <Card key={data.id + "heading" + index} data={data} imageUrl={imageUrl} trending={trending} index={index+1} />
            ))}
            </div>

            <div className='absolute top-0 w-full h-full hidden items-center  justify-between px-4 lg:group-hover:flex'>
                <button onClick={handlePrevious} className='rounded-full z-10 drop-shadow-xl backdrop-blur-3xl bg-black/25 text-white font-bold text-3xl hover:scale-125 transition-all'>
                    <FaAngleLeft/>
                </button>
                <button onClick={handleNext} className=' rounded-full  text-3xl z-10 backdrop-blur-3xl bg-black/25 text-white font-black hover:scale-125 transition-all '>
                    <FaAngleRight/>
                </button>
            </div>

        </div>
      </div>
  )
}

export default HorizontalScrollCard
