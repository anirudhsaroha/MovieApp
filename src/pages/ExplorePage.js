import React from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import { useConfig } from '../context/ConfigContext';
import axios from 'axios';
import { useState , useEffect } from 'react';

const ExplorePage = () => {
  const { imageUrl } = useConfig();
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);

  console.log("params", params.explore);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo
        }
      });
      setData((prev) => {
        return [
          ...prev,
          ...response.data.results
        ];
      });
      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='py-16'>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Popular {params.explore} show</h3>
        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
          {
            data.map((exploreData, index) => {
              return (
                <Card data={exploreData} key={exploreData.id + "exploreSEction" + index} media_type={params.explore} imageUrl={imageUrl} />
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
