export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image: string;
  github: string;
  live: string;
  category: 'fullstack' | 'frontend' | 'backend' | 'mobile';
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planning';
  private?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Tajer',
    description:
      'A full-stack typing speed test application with real-time WPM calculation, accuracy tracking, and user statistics.',
    technologies: ['Hono.js', 'D1 Database', 'Cloudflare', 'Restful API'],
    image: '/projects/Tajer.png',
    github: '#',
    live: 'https://tajer-jo.com/en',
    category: 'backend',
    featured: true,
    status: 'completed',
    private: true,
  },
  {
    id: 2,
    title: 'TrackTide',
    description:
      'TrackTide is a beautifully designed, habit tracker that helps you build better habits—no login required. Effortlessly add, track, and complete your daily goals.  making it easier to stay motivated and consistent.',
    technologies: ['React', 'Tailwind', 'TypeScript', 'Vite'],
    image: '/projects/TrackTide.png',
    github: 'https://github.com/BaraaMansor/TrackTide',
    live: 'https://tracktide.pages.dev/',
    category: 'frontend',
    featured: true,
    status: 'completed',
  },
  {
    id: 3,
    title: 'ECampus',
    description:
      "ECampus is a comprehensive e-learning platform that I've enjoyed working with the ECampus team on building!",
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'ShadCN', 'Asp.net'],
    image: '/projects/ECampus.png',
    github: '#',
    live: 'https://ecampusjo.com/en',
    category: 'fullstack',
    featured: true,
    status: 'in-progress',
    private: true,
  },
  {
    id: 4,
    title: 'TypingHub',
    description:
      'A full-stack typing speed test application with real-time WPM calculation, accuracy tracking, and user statistics.',
    technologies: ['React', 'Astro', 'PostgreSQL', 'Hono.js', 'Socket.io'],
    image: '/prj-placeholder.png',
    github: '#',
    live: '#',
    category: 'fullstack',
    featured: false,
    status: 'in-progress',
    private: true,
  },
];

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

export const getProjectById = (id: number): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const categories = ['all', 'fullstack', 'frontend', 'backend'];
