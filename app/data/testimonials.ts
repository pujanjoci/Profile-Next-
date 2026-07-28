export interface Testimonial {
  id: string
  name: string
  location: string
  portfolioUrl: string
  image: string
  text: string
  role?: string
  company?: string
  categoryColor?: 'pink' | 'emerald' | 'amber' | 'cyan' | 'purple' | 'rose' | 'slate'
}

export const testimonials: Testimonial[] = [
  {
    id: 'siddhant',
    name: 'Siddhant Shrestha',
    location: 'Nepalgunj',
    portfolioUrl: 'https://siddhant-shrestha.com.np',
    image: '/testimonials/siddhant.png',
    text: 'Pujan did an amazing job creating my personal portfolio and helped me secure my own domain name. His creativity and expertise made the process smooth and effortless. Highly recommend!',
    role: 'Client / Portfolio',
    categoryColor: 'amber',
  },
  {
    id: 'prerak',
    name: 'Prerak Ghimire',
    location: 'Kathmandu',
    portfolioUrl: 'https://prerakghimire.com.np',
    image: '/testimonials/prerak.jpg',
    text: 'Working with Pujan was a great experience. He not only created a stunning personal portfolio for me but also helped secure a custom domain, enhancing my online presence. His attention to detail and dedication truly impressed me.',
    role: 'Client / Portfolio',
    categoryColor: 'pink',
  },
  {
    id: 'anish',
    name: 'Anish Koju',
    location: 'Katunje, Bhaktapur',
    portfolioUrl: 'https://anishkojushrestha.com.np',
    image: '/testimonials/anish.jpg',
    text: 'Pujan did an amazing job building my website and adding account authentication for added security. His professionalism and attention was exceptional. Highly recommend his services!',
    role: 'Client / Web App',
    categoryColor: 'cyan',
  },
  {
    id: 'robb',
    name: 'Robert Shrestha',
    location: 'Bhaktapur',
    portfolioUrl: 'https://pujanjoci.github.io/robb/',
    image: '/testimonials/robb.jpg',
    text: "Pujan expertly crafted my personal portfolio and helped me secure a custom domain. The process was smooth, and I'm really pleased with the final result.",
    role: 'Client / Portfolio',
    categoryColor: 'purple',
  },
  {
    id: 'professionaledgeglobal',
    name: 'Professional Edge Global',
    location: 'Kathmandu, Nepal',
    portfolioUrl: 'https://professionaledgeglobal.com.np',
    image: '/projects/professionaledge.webp',
    text: 'Pujan delivered an exceptional corporate website for Professional Edge Global. His sleek UI/UX design, mobile responsiveness, and SEO optimization significantly boosted our digital presence and client reach.',
    role: 'Company Website / Corporate',
    company: 'Professional Edge Global',
    categoryColor: 'rose',
  },
  {
    id: 'ssureshandassociates',
    name: 'S. Suresh & Associates',
    location: 'Kathmandu, Nepal',
    portfolioUrl: 'https://ssureshandassociates.com.np',
    image: '/projects/ssuresh.webp',
    text: 'Pujan designed and developed a professional modern website for our consultancy firm. The smooth layout, pristine typography, and fast performance completely elevated our corporate branding.',
    role: 'Client / Financial Consulting',
    company: 'S. Suresh & Associates',
    categoryColor: 'slate',
  },
  {
    id: 'whitezebraconsultion',
    name: 'White Zebra Consulting',
    location: 'Global / Digital Client',
    portfolioUrl: 'https://whitezebraconsulting.com/',
    image: '/projects/whitezebraconsulting.webp',
    text: 'Working with Pujan on White Zebra Consulting was an amazing experience. He engineered a clean, scalable digital web app interface with incredible speed, elegant animations, and robust maintainability.',
    role: 'Client / Web App & Operations',
    company: 'White Zebra Consulting',
    categoryColor: 'emerald',
  },
]
