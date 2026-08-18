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
    title: 'Echelon',
    description:
      'A gamified productivity platform where you complete tasks with your guild, climb the ranks, and compete against other guilds.',
    technologies: ['Next.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
    image: '/projects/echelon.webp',
    github: '#',
    live: 'https://echelon-sigma-five.vercel.app/invite/IGM214XE',
    category: 'fullstack',
    featured: true,
    status: 'in-progress',
    private: true,
  },
  {
    id: 2,
    title: 'Lancul',
    description:
      'A platform for finding a local guide who speaks your language, on demand, anywhere, anytime.',
    technologies: ['.NET', 'SQL Server', 'Docker'],
    image: '/projects/lancul.webp',
    github: '#',
    live: 'https://lancul.net/',
    category: 'backend',
    featured: true,
    status: 'completed',
    private: true,
  },
  {
    id: 3,
    title: 'ECampus',
    description:
      'A comprehensive e-learning platform, built together with the ECampus team.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'shadcn/ui', 'ASP.NET'],
    image: '/projects/ecampus.webp',
    github: '#',
    live: 'https://ecampusjo.com/',
    category: 'fullstack',
    featured: true,
    status: 'completed',
    private: true,
  },
  {
    id: 4,
    title: 'Dazen',
    description:
      "A unified gamer identity layer that connects your fragmented gaming life across platforms. It's not a new social network, but a meta-network that brings together what you play, who you play with, and where you belong, all in one place.",
    technologies: ['Next.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
    image: '/projects/dazen.webp',
    github: '#',
    live: '#',
    category: 'fullstack',
    featured: false,
    status: 'in-progress',
    private: true,
  },
  {
    id: 5,
    title: 'Unlimited Innovation Landing Page',
    description:
      'A landing page demo for Unlimited Innovation, showcasing their services and offerings in a visually appealing and user-friendly manner.',
    technologies: ['React', 'Tailwind', 'TypeScript', 'Vite'],
    image: '/projects/ui-landing.webp',
    github: '#',
    live: 'https://unlimited-innovation.pages.dev',
    category: 'frontend',
    featured: false,
    status: 'completed',
    private: true,
  },
  {
    id: 6,
    title: 'Tajer',
    description:
      'A B2B e-commerce platform, built API-first on the Cloudflare edge with Hono.js and D1.',
    technologies: ['Hono.js', 'D1 Database', 'Cloudflare', 'Restful API'],
    image: '/projects/tajer.webp',
    github: '#',
    live: '#',
    category: 'backend',
    featured: false,
    status: 'completed',
    private: true,
  },
  {
    id: 7,
    title: 'TrackTide',
    description:
      'A beautifully designed habit tracker with no login required. Add, track, and complete daily goals while staying motivated and consistent.',
    technologies: ['React', 'Tailwind', 'TypeScript', 'Vite'],
    image: '/projects/tracktide.webp',
    github: 'https://github.com/BaraaMansor/TrackTide',
    live: 'https://tracktide.pages.dev/',
    category: 'frontend',
    featured: false,
    status: 'completed',
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
