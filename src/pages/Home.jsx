import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Avantages from '../components/Avantages'
import ChiffresCles from '../components/ChiffresCles'
import Concept from '../components/Concept'
import Processus from '../components/Processus'
import AvantApres from '../components/AvantApres'
import Testimonials from '../components/Testimonials'
import MapComponent from '../components/Map'
import CTA from '../components/CTA'
import { supabase } from '../config/supabase'

const Home = () => {
  const [pageData, setPageData] = useState(null)

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('content')
          .eq('page_name', 'home')
          .single()

        if (error) throw error
        setPageData(data?.content)
      } catch (err) {
        console.error('Erreur chargement page:', err)
      }
    }

    fetchPageData()
  }, [])

  return (
    <>
      <Hero pageData={pageData} />
      <ChiffresCles pageData={pageData} />
      <Concept />
      <Avantages pageData={pageData} />
      <AvantApres pageData={pageData} />
      <Processus pageData={pageData} />
      <Testimonials />
      <MapComponent />
      <CTA pageData={pageData} />
    </>
  )
}

export default Home
