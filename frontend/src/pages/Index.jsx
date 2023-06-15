import React from 'react'
import Header from '../components/navbar/Header'
import Hero from '../components/hero/Hero'
import About from '../components/indexAbout/About'
import Explore from '../components/exploreIndex/Explore'

function Index() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      {/* <Explore /> */}
    </div>
  )
}

export default Index
