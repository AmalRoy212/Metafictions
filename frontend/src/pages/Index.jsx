import React from 'react'
import Header from '../components/navbar/Header'
import Hero from '../components/hero/Hero'
import About from '../components/indexAbout/About'
import Explore from '../components/exploreIndex/Explore'
import World from '../components/world/World'
import Footer from '../components/footer/Footer'
import Discription from '../components/discription/Discription'

function Index() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Explore />
      <Discription />
      <World />
      <Footer />
    </div>
  )
}

export default Index
