import Header from './components/Header'
import Hero from './components/Hero'
import LazyHomeSections from './components/LazyHomeSections'
import ScrollToTop from './components/ScrollToTop'

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://pujan-joshi.com.np/#person",
        "name": "Pujan Joshi",
        "url": "https://pujan-joshi.com.np",
        "jobTitle": "Web Designer and Developer",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "Nepal"
        },
        "email": "contact@pujan-joshi.com.np",
        "sameAs": [
          "https://github.com/pujanjoci",
          "https://www.linkedin.com/in/pujan-joshi-np/",
          "https://x.com/pujanjoshi3"
        ],
        "knowsAbout": [
          "Web Design",
          "Web Development",
          "UI/UX Design",
          "React",
          "Next.js",
          "Tailwind CSS",
          "JavaScript",
          "HTML",
          "CSS",
          "E-commerce Websites",
          "Portfolio Websites"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://pujan-joshi.com.np/#website",
        "url": "https://pujan-joshi.com.np",
        "name": "Pujan Joshi Portfolio",
        "alternateName": "Pujan Joshi",
        "publisher": {
          "@id": "https://pujan-joshi.com.np/#person"
        },
        "author": {
          "@id": "https://pujan-joshi.com.np/#person"
        }
      },
      {
        "@type": "ProfilePage",
        "@id": "https://pujan-joshi.com.np/#profilepage",
        "url": "https://pujan-joshi.com.np",
        "name": "Pujan Joshi Portfolio | Official Profile Page",
        "mainEntity": {
          "@id": "https://pujan-joshi.com.np/#person"
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollToTop />
      <Header />
      <main>
        <Hero />
        <LazyHomeSections />
      </main>
    </>
  )
}
