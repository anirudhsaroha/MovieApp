import React, { useState } from 'react';
import BannerHome from '../components/BannerHome';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import { useEffect } from 'react';
import axios from 'axios';

const Home = ({ bannerData, imageUrl }) => {

  const [ nowPlayingData , setNowPlayingData ] = useState( [] );
  const [ topRated , setTopRated ] = useState( [] );
  const [ topTv , setTopTv ] = useState([]) ;
  const [ upcomingData , setUpcomingData ] = useState([]);

  const fetchNowPlayingMovie = async()=>{
    try {
        const response = await axios.get('/movie/now_playing')
        setNowPlayingData(response.data.results);
    } catch (error) {
        console.log("error",error)
    }
  }

  const fetchUpcomingMovie = async()=>{
    try {
        const response = await axios.get('/tv/on_the_air')
        setUpcomingData(response.data.results);
    } catch (error) {
        console.log("error",error)
    }
  }

  const fetchTopRated = async()=>{
    try {
        const response = await axios.get('/movie/top_rated')
        setTopRated(response.data.results);
    } catch (error) {
        console.log("error",error)
    }
  }

  const fetchTopTv = async()=>{
    try {
        const response = await axios.get('/tv/top_rated')
        setTopTv(response.data.results);
    } catch (error) {
        console.log("error",error)
    }
  }

  useEffect( () => {
    fetchNowPlayingMovie() ;
    fetchTopRated();
    fetchTopTv();
    fetchUpcomingMovie();

  }, [] )

  return (
    <div>
      <BannerHome bannerData={bannerData} imageUrl={imageUrl} />
      <HorizontalScrollCard data={bannerData} imageUrl={imageUrl} heading="Trending" trending={true} />
      <HorizontalScrollCard data={topTv} imageUrl={imageUrl} heading="Top Rated TV Shows" trending={false} />
      <HorizontalScrollCard data={topRated} imageUrl={imageUrl} heading="Top Rated Movies" trending={false} />
      <HorizontalScrollCard data={upcomingData} imageUrl={imageUrl} heading="On Air" trending={false} />
      <HorizontalScrollCard data={nowPlayingData} imageUrl={imageUrl} heading="In Cinemas" trending={false} />
    </div>
  );
};

export default Home;
