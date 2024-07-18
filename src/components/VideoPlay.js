import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import axios from 'axios';

const VideoPlay = ({ data, close, media_type }) => {
    const [videoData, setVideoData] = useState([]);

    const fetchVideo = async () => {
        try {
            const response = await axios.get(`/${media_type}/${data?.id}/videos`);
            setVideoData(response.data.results);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        fetchVideo();
    }, []);

    return (
        <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'>
            <div className='bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative'>
                <button onClick={close} className='absolute -right-1 -top-6 text-3xl z-50'>
                    <IoClose />
                </button>

                {videoData.length > 0 ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${videoData[0]?.key}`}
                        className='w-full h-full'
                        title='Video Player'
                    />
                ) : (
                    <p className='text-white text-center'>No video available</p>
                )}
            </div>
        </section>
    )
}

export default VideoPlay
