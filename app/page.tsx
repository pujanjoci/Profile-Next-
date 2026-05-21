import Header from './components/Header'
import Hero from './components/Hero'
import LazyHomeSections from './components/LazyHomeSections'
import ScrollToTop from './components/ScrollToTop'

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Hero />
        <LazyHomeSections />
      </main>
    </>
  )
}
