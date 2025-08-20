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
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'TypingSpeed Test',
    description:
      'A full-stack typing speed test application with real-time WPM calculation, accuracy tracking, and user statistics.',
    technologies: ['React', 'Astro', 'PostgreSQL', 'Hono.js', 'Socket.io'],
    image: '/prj-placeholder.png',
    github: 'https://github.com/BaraaMansor/typing-speed-test',
    live: 'https://typing-speed-demo.example.com',
    category: 'fullstack',
    featured: true,
    status: 'in-progress',
  },
  {
    id: 2,
    title: 'Coming Soon',
    description: 'Coming Soon',
    technologies: [],
    image: '/prj-placeholder.png',
    github: 'https://github.com/BaraaMansor/ecommerce-platform',
    live: 'https://ecommerce-demo.example.com',
    category: 'fullstack',
    featured: true,
    status: 'planning',
  },
  {
    id: 3,
    title: 'Coming Soon',
    description: 'Coming Soon',
    longDescription: 'Coming Soon',
    technologies: [],
    image: '/prj-placeholder.png',
    github: 'https://github.com/BaraaMansor/task-management',
    live: 'https://taskapp-demo.example.com',
    category: 'frontend',
    featured: true,
    status: 'planning',
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

export const categories = ['all', 'fullstack', 'frontend', 'backend', 'mobile'];
