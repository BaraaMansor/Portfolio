import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
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
    <motion.section
      id="contact"
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-accent opacity-5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-accent opacity-8 rounded-full blur-3xl animate-float delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Ready to start a project together? Let's connect and bring your
              ideas to life!
            </p>
            <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full mt-6"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info Card */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                {/* Availability Status */}
                <div className="mb-8 p-4 bg-surface/30 rounded-lg border border-glass-border">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${availability.dot} animate-pulse`}
                    ></div>
                    <span className={`font-medium ${availability.color}`}>
                      {availability.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted">{availability.message}</p>
                </div>

                {/* Local Time */}
                <div className="mb-8 p-4 bg-surface/30 rounded-lg border border-glass-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="clock" className="text-primary" size={20} />
                    <span className="font-medium">Local Time</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {currentTime}
                  </p>
                  <p className="text-sm text-muted">GMT+3</p>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={info.label}
                      className="flex items-center gap-4 p-4 bg-surface/20 rounded-lg border border-glass-border hover:border-primary/50 transition-all group"
                    >
                      <div className="text-primary group-hover:text-primary/80 transition-colors">
                        <Icon
                          name={info.icon}
                          className="group-hover:scale-110 transition-transform"
                          size={20}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium text-foreground">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Contact Button */}
                <div className="mt-8">
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full group"
                    asChild
                  >
                    <a href="mailto:your.email@example.com">
                      Start a Conversation
                      <Icon
                        name="arrow-right"
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                        size={20}
                      />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-muted mb-8 leading-relaxed">
                  I'm always open to discussing new opportunities, interesting
                  projects, or just having a chat about technology and
                  development. Choose your preferred way to reach out!
                </p>

                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-surface/30 border border-glass-border rounded-lg hover:border-primary/50 hover:bg-surface/50 transition-all group"
                    >
                      <div className="text-muted group-hover:text-primary transition-colors">
                        <Icon
                          name={link.icon}
                          className="group-hover:scale-110 transition-transform"
                          size={24}
                        />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium block">{link.name}</span>
                        <span className="text-sm text-muted">
                          {link.description}
                        </span>
                      </div>
                      <Icon
                        name="external-link"
                        className="ml-auto group-hover:translate-x-1 transition-transform text-muted group-hover:text-primary"
                        size={16}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
