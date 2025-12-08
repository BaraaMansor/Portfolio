import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/Icon';

const Contact = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleString('en-US', {
        timeZone: 'Asia/Amman',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const getAvailabilityStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();

    // Available 8 AM to 9 PM
    if (currentHour >= 8 && currentHour < 21) {
      return {
        status: 'Available',
        color: 'text-green-400',
        dot: 'bg-green-400',
        message: 'Usually responds within an hour',
      };
    } else {
      return {
        status: 'Away',
        color: 'text-yellow-400',
        dot: 'bg-yellow-400',
        message: 'Will respond within 24 hours',
      };
    }
  };

  const availability = getAvailabilityStatus();

  const contactInfo = [
    {
      label: 'Email',
      value: 'baraadev0@gmail.com',
      href: 'mailto:baraadev0@gmail.com',
      icon: 'email',
    },
    {
      label: 'Phone',
      value: '+962 79 511 4124',
      href: 'tel:+962795114124',
      icon: 'phone',
    },
    {
      label: 'Location',
      value: 'Amman, Jordan',
      href: null,
      icon: 'location',
    },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/baraadev0_',
      description: 'Connect with me on Instagram',
      icon: 'instagram',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/baraamansor',
      description: 'Connect professionally',
      icon: 'linkedin',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/962795114124',
      description: 'Quick chat',
      icon: 'whatsapp',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/BaraaMansor',
      description: 'Check out my latest activities',
      icon: 'github',
    },
  ];

  return (
    <section
      id="contact"
      className="py-8 sm:py-12 lg:py-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-accent opacity-5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-accent opacity-8 rounded-full blur-3xl animate-float delay-1000"></div>
      </div>

      <div className="w-full px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-none sm:max-w-6xl sm:mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-slide-up">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 px-2">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-muted max-w-2xl mx-auto px-2">
              Ready to start a project together? Let's connect and bring your
              ideas to life!
            </p>
            <div className="w-16 sm:w-24 h-1 bg-gradient-accent mx-auto rounded-full mt-3 sm:mt-4 lg:mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Contact Info Card */}
            <div className="w-full animate-slide-left delay-200">
              <div className="glass-card p-3 sm:p-4 lg:p-6 xl:p-8 w-full">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6">
                  Contact Information
                </h3>

                {/* Availability Status */}
                <div className="mb-4 sm:mb-6 lg:mb-8 p-2 sm:p-3 lg:p-4 bg-surface/30 rounded-lg border border-glass-border">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <div
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${availability.dot} animate-pulse`}
                    ></div>
                    <span
                      className={`font-medium text-xs sm:text-sm lg:text-base ${availability.color}`}
                    >
                      {availability.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted">
                    {availability.message}
                  </p>
                </div>

                {/* Local Time */}
                <div className="mb-4 sm:mb-6 lg:mb-8 p-2 sm:p-3 lg:p-4 bg-surface/30 rounded-lg border border-glass-border">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <Icon name="clock" className="text-primary" size={16} />
                    <span className="font-medium text-xs sm:text-sm lg:text-base">
                      Local Time
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
                    {currentTime}
                  </p>
                  <p className="text-xs sm:text-sm text-muted">GMT+3</p>
                </div>

                {/* Contact Details */}
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={info.label}
                      className="flex items-center gap-2 sm:gap-3 lg:gap-4 p-2 sm:p-3 lg:p-4 bg-surface/20 rounded-lg border border-glass-border hover:border-primary/50 transition-all group"
                    >
                      <div className="text-primary group-hover:text-primary/80 transition-colors flex-shrink-0">
                        <Icon
                          name={info.icon}
                          className="group-hover:scale-110 transition-transform"
                          size={16}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-muted">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="font-medium text-xs sm:text-sm lg:text-base text-foreground hover:text-primary transition-colors block truncate"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium text-xs sm:text-sm lg:text-base text-foreground truncate">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Contact Button */}
                <div className="mt-4 sm:mt-6 lg:mt-8">
                  <Button
                    variant="hero"
                    size="sm"
                    className="w-full group text-xs sm:text-sm lg:text-base h-8 sm:h-10 lg:h-12"
                    asChild
                  >
                    <a href="mailto:baraadev0@gmail.com">
                      Start a Conversation
                      <Icon
                        name="arrow-right"
                        className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform"
                        size={14}
                      />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="w-full animate-slide-right delay-300">
              <div className="glass-card p-3 sm:p-4 lg:p-6 xl:p-8 w-full">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6">
                  Let's Connect
                </h3>
                <p className="text-muted mb-4 sm:mb-6 lg:mb-8 leading-relaxed text-xs sm:text-sm lg:text-base">
                  I'm always open to discussing new opportunities, interesting
                  projects, or just having a chat about technology and
                  development. Choose your preferred way to reach out!
                </p>

                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 sm:gap-3 lg:gap-4 p-2 sm:p-3 lg:p-4 bg-surface/30 border border-glass-border rounded-lg hover:border-primary/50 hover:bg-surface/50 transition-all group"
                    >
                      <div className="text-muted group-hover:text-primary transition-colors flex-shrink-0">
                        <Icon
                          name={link.icon}
                          className="group-hover:scale-110 transition-transform"
                          size={18}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium block text-xs sm:text-sm lg:text-base truncate">
                          {link.name}
                        </span>
                        <span className="text-xs sm:text-sm text-muted block truncate">
                          {link.description}
                        </span>
                      </div>
                      <Icon
                        name="external-link"
                        className="ml-auto group-hover:translate-x-1 transition-transform text-muted group-hover:text-primary flex-shrink-0"
                        size={12}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
