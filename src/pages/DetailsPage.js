import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment'
import Divider from '../components/Divider';
import { useConfig } from '../context/ConfigContext';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import VideoPlay from '../components/VideoPlay';

const DetailsPage = () => {

  const { imageUrl } = useConfig();
  const params = useParams();
  const [data, setData] = useState({});
  const [starCastData, setStarCastData] = useState({});
  const [similarData, setSimilarData] = useState([]);
  const [recommendationData, setReccomendationData] = useState([]);
  const [playVideo,setPlayVideo] = useState(false)
  const [playVideoId,setPlayVideoId] = useState("")

  const writer = starCastData?.crew?.filter(el => el?.job === "Writer")?.map(el => el?.name)?.join(", ");

  const handlePlayVideo = (data)=>{
    setPlayVideoId(data)
    setPlayVideo(true)

  }

  const fetchSimilarDetails = async () => {
    try {
      const response = await axios.get(`/${params?.explore}/${params?.id}/similar`);
      setSimilarData(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  }

  const fetchRecommendedDetails = async () => {
    try {
      const response = await axios.get(`/${params?.explore}/${params?.id}/recommendations`);
      setReccomendationData(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  }

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`/${params?.explore}/${params?.id}`);
      setData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  const fetchStarCastData = async () => {
    try {
      const response = await axios.get(`/${params?.explore}/${params?.id}/credits`);
      setStarCastData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchDetails();
    fetchStarCastData();
    fetchRecommendedDetails();
    fetchSimilarDetails();
  }, [params]);

  const duration = (data?.runtime / 60)?.toFixed(1)?.split(".");

  return (
    <div>
      <div className='w-full h-[500px] relative hidden lg:block'>
        <div className='w-full h-full'>
          <img
            src={imageUrl + data.backdrop_path}
            className='h-full w-full object-cover'
            alt='Backdrop'
          />
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-black/65 to-transparent'></div>
      </div>

      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
          <img
            src={imageUrl + data?.poster_path}
            className='h-80 w-60 object-cover rounded'
            alt='Poster'
          />
          <button onClick={()=>handlePlayVideo(data)} className='mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'>Play Now</button>
        </div>

        <div>
          <h2 className='text-2xl lg:text-4xl font-bold text-white '>{data?.title || data?.name}</h2>
          <p className='text-neutral-400'>{data?.tagline}</p>

          <Divider />

          <div className='flex items-center gap-3'>
            <p>Rating: {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View: {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>Duration: {duration ? `${duration[0]}h ${duration[1]}m` : 'N/A'}</p>
          </div>

          <Divider />

          <div>
            <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
            <p>{data?.overview}</p>
            <Divider />
            <div className='flex items-center gap-3 my-3 text-center'>
              <p>Status: {data?.status}</p>
              <span>|</span>
              <p>Release Date: {moment(data?.release_date).format("MMMM Do YYYY")}</p>
              <span>|</span>
              <p>Revenue: {Number(data?.revenue)}</p>
            </div>
            <Divider />

            <div>
              <p><span className='text-white'>Director</span>: {starCastData?.crew?.find(el => el.job === 'Director')?.name}</p>
              <Divider />
              <p><span className='text-white'>Writer</span>: {writer}</p>
            </div>

            <Divider />

            <h2 className='font-bold text-lg'>Cast:</h2>
            <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4'>
              {
                starCastData?.cast?.filter(el => el?.profile_path).map((starCast, index) => (
                  <div key={index}>
                    <div>
                      <img
                        src={imageUrl + starCast?.profile_path}
                        className='w-24 h-24 object-cover rounded-full'
                        alt={starCast?.name}
                      />
                    </div>
                    <p className='font-bold text-center text-sm text-neutral-400'>{starCast?.name}</p>
                  </div>
                ))
              }
            </div>

          </div>

        </div>

      </div>
      <div>
          <HorizontalScrollCard data={similarData} heading={`Similar ${params?.explore}`} media_type={params?.explore} imageUrl={imageUrl} />
          <HorizontalScrollCard data={recommendationData} heading={`Recommended`} media_type={params?.explore} imageUrl={imageUrl} />
        </div>

        {
            playVideo && (
              <VideoPlay data={playVideoId} close={()=>setPlayVideo(false)} media_type={params?.explore}/>
            )
          }

    </div>
  )
}

export default DetailsPage
