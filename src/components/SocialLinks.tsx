import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/Icon';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/BaraaMansor', icon: 'github' },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/baraamansor',
    icon: 'linkedin',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@AlBaraaMansor',
    icon: 'youtube',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/baraadev0_/',
    icon: 'instagram',
  },
  { name: 'Email', url: 'mailto:baraadev0@gmail.com', icon: 'email' },
];

const SocialLinks = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {socialLinks.map((social, index) => (
        <Button
          key={social.name}
          variant="outline"
          size="sm"
          className={`glow-hover animate-slide-up delay-${index * 100} group`}
          asChild
        >
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Icon
              name={social.icon}
              className="group-hover:scale-110 transition-transform"
              size={20}
            />
            <span className="ml-2">{social.name}</span>
          </a>
        </Button>
      ))}
    </div>
  );
};

export default SocialLinks;
