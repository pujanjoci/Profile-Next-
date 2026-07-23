export interface Testimonial {
  id: string
  name: string
  location: string
  portfolioUrl: string
  image: string
  text: string
  role?: string
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
  },
  {
    id: 'prerak',
    name: 'Prerak Ghimire',
    location: 'Kathmandu',
    portfolioUrl: 'https://prerakghimire.com.np',
    image: '/testimonials/prerak.jpg',
    text: 'Working with Pujan was a great experience. He not only created a stunning personal portfolio for me but also helped secure a custom domain, enhancing my online presence. His attention to detail and dedication truly impressed me.',
    role: 'Client / Portfolio',
  },
  {
    id: 'anish',
    name: 'Anish Koju',
    location: 'Katunje, Bhaktapur',
    portfolioUrl: 'https://anishkojushrestha.com.np',
    image: '/testimonials/anish.jpg',
    text: 'Pujan did an amazing job building my website and adding account authentication for added security. His professionalism and attention was exceptional. Highly recommend his services!',
    role: 'Client / Web App',
  },
  {
    id: 'robb',
    name: 'Robert Shrestha',
    location: 'Bhaktapur',
    portfolioUrl: 'https://pujanjoci.github.io/robb/',
    image: '/testimonials/robb.jpg',
    text: "Pujan's expertly crafted my personal portfolio and helped me secure a custom domain. The process was smooth, and I’m really pleased with the final result.",
    role: 'Client / Portfolio',
  },
]
