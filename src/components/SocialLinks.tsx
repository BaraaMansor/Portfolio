import { Button } from '@/components/ui/button';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/BaraaMansor', icon: 'github.svg' },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/baraamansor',
    icon: 'linkedin.svg',
  },
  {
    name: 'Youtube',
    url: 'https://www.youtube.com/@AlBaraaMansor',
    icon: 'youtube.svg',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/baraadev0_/',
    icon: 'instagram.svg',
  },
  { name: 'Email', url: 'mailto:baraadev0@gmail.com', icon: 'envelope.svg' },
];

const SocialLinks = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {socialLinks.map((social, index) => (
        <Button
          key={social.name}
          variant="outline"
          size="sm"
          className={`glow-hover animate-slide-up delay-${index * 100}`}
          asChild
        >
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <img
              src={`/${social.icon}`}
              alt={social.name}
              width={24}
              height={24}
              className="h-5 w-5"
            />
            <span className="ml-2">{social.name}</span>
          </a>
        </Button>
      ))}
    </div>
  );
};

export default SocialLinks;
