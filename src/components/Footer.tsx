
import { ChevronRight, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-dark py-16">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <a href="#" className="text-2xl font-bold text-white inline-block mb-6">
              <span className="text-gradient-purple">Nehemiah</span>
            </a>
            <p className="text-white/70 mb-6">
              AI Developer and Educational Technology Innovator passionate about creating intelligent solutions.
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About", "Services", "Projects", "Experience", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-white/70 hover:text-bright-purple transition-colors flex items-center gap-2"
                    >
                      <ChevronRight size={16} />
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                "AI Development",
                "Web Development",
                "EdTech Solutions",
                "Data Management",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="text-white/70 hover:text-bright-purple transition-colors flex items-center gap-2"
                  >
                    <ChevronRight size={16} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <address className="not-italic">
              <div className="text-white/70 mb-3">India</div>
              <div className="text-white/70 mb-3">
                <a
                  href="mailto:nehemiahnesanathan@gmail.com"
                  className="hover:text-bright-purple transition-colors"
                >
                  nehemiahnesanathan@gmail.com
                </a>
              </div>
              <div className="text-white/70 mb-3">
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="hover:text-bright-purple transition-colors"
                >
                  +91 XXXX XXXXXX
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Nehemiah Nesanathan. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-bright-purple/10 flex items-center justify-center text-white hover:bg-bright-purple transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
