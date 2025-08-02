import { Button } from './ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/BaraaMansor',
      icon: 'github.svg',
    },
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
  return (
    <footer className="py-12 border-t border-glass-border relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-accent opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-accent opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="text-2xl font-bold flex items-center justify-center gap-2">
              <img
                className="inline-block"
                src="/myLogoGold.svg"
                alt="My logo"
                width={24}
                height={24}
              />
              <p className="text-muted">Al-Baraa</p>
            </div>
            <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full mt-6"></div>
          </div>

          {/* Quote */}
          <blockquote className="text-lg text-muted italic mb-6 max-w-2xl mx-auto">
            "I am passionate learner, and aspire to be one of the best web
            developers ever."
          </blockquote>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
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
          </div>

          <div className="border-t border-glass-border pt-6">
            <p className="text-muted text-sm">
              © {currentYear} Al-Baraa Mansour. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
