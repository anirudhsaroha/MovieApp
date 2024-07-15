import React from 'react'
import BannerHome from '../components/BannerHome'

const Home = ({bannerData , imageUrl }) => {
  return (
    <div>
      <BannerHome bannerData={bannerData} imageUrl={imageUrl} />
    </div>
  )
}

export default Home
