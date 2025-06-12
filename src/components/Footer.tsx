
import { useState } from "react";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    {
      icon: <Github size={20} />,
      url: "https://github.com/nehemiah-nesanathan",
      label: "GitHub"
    },
    {
      icon: <Linkedin size={20} />,
      url: "https://linkedin.com/in/nehemiah-nesanathan",
      label: "LinkedIn"
    },
    {
      icon: <Mail size={20} />,
      url: "mailto:nehemiahnesanathan@gmail.com",
      label: "Email"
    }
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  // Show scroll to top button when user scrolls down
  useState(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <>
      {/* Scroll to top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-golden text-royal-black rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-golden/20 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <footer className="relative bg-gradient-dark border-t border-golden/20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-golden/5 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-[200px] h-[200px] rounded-full bg-silver/5 blur-3xl -z-10"></div>

        <div className="container mx-auto py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-gradient-gold">Nehemiah</span> Nesanathan
              </h3>
              <p className="text-silver/70 mb-6 max-w-md leading-relaxed">
                AI enthusiast and EdTech innovator passionate about creating intelligent solutions 
                that transform how we learn and interact with technology.
              </p>
              
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-golden/10 border border-golden/20 flex items-center justify-center text-golden hover:bg-golden hover:text-royal-black transition-all duration-300 hover:scale-110"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-silver/70 hover:text-golden transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-golden opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-6">Get In Touch</h4>
              <div className="space-y-3">
                <p className="text-silver/70 text-sm">
                  <span className="text-golden font-medium">Email:</span>
                  <br />
                  nehemiahnesanathan@gmail.com
                </p>
                <p className="text-silver/70 text-sm">
                  <span className="text-golden font-medium">Location:</span>
                  <br />
                  Chennai, Tamil Nadu, India
                </p>
                <p className="text-silver/70 text-sm">
                  <span className="text-golden font-medium">Available for:</span>
                  <br />
                  Freelance Projects & Collaborations
                </p>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-golden/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-silver/60 text-sm flex items-center gap-2">
                © 2024 Nehemiah Nesanathan. Made with 
                <Heart size={16} className="text-golden" fill="currentColor" />
                and lots of coffee.
              </p>
              
              <div className="flex items-center gap-6 text-sm text-silver/60">
                <span>Built with React & Tailwind CSS</span>
                <span>•</span>
                <span>Deployed on Lovable</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
