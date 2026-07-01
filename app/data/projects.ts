import projectsData from './projects.json'

export type Project = {
  title: string
  description: string
  tech: string[]
  liveUrl: string
  repoUrl: string
  image: string
  color: string
  glowColor: string
  category: 'Web Apps' | 'Games' | 'UI/UX' | 'Designs' | 'Company Websites'
}

export const projects = projectsData as Project[]
