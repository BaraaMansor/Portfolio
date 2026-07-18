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
      'An online gamified platform for task management and productivity, designed to help users stay organized and motivated while completing  with their friends in the guild, and aganist other guilds',
    technologies: ['Next.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
    image: '/projects/echelon-front.png',
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
      'LanCul is a platform where you can find your local guide who can speaks your language on demand in anywhere anytime',
    technologies: ['.NET', 'SqlServer', 'Docker'],
    image: '/projects/Lancul.png',
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
      "ECampus is a comprehensive e-learning platform that I've enjoyed working with the ECampus team on building!",
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'ShadCN', 'Asp.net'],
    image: '/projects/ECampus.png',
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
      "unified gamer identity layer that connects your fragmented gaming life across platforms. It's not a new social network, but a meta-network that brings together what you play, who you play with, and where you belong — all in one place.",
    technologies: ['Next.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
    image: '/prj-placeholder.png',
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
    image: '/projects/ui-landing.png',
    github: '#',
    live: 'unlimited-innovation.pages.dev',
    category: 'backend',
    featured: false,
    status: 'completed',
    private: true,
  },
  {
    id: 6,
    title: 'Tajer',
    description:
      'A full-stack typing speed test application with real-time WPM calculation, accuracy tracking, and user statistics.',
    technologies: ['Hono.js', 'D1 Database', 'Cloudflare', 'Restful API'],
    image: '/projects/Tajer.png',
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
      'TrackTide is a beautifully designed, habit tracker that helps you build better habits—no login required. Effortlessly add, track, and complete your daily goals.  making it easier to stay motivated and consistent.',
    technologies: ['React', 'Tailwind', 'TypeScript', 'Vite'],
    image: '/projects/TrackTide.png',
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
