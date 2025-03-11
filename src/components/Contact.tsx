
import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thanks for contacting me! I'll get back to you soon.",
        variant: "default",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: "Email",
      value: "nehemiahnesanathan@gmail.com",
      link: "mailto:nehemiahnesanathan@gmail.com",
    },
    {
      icon: <Phone size={24} />,
      label: "Phone",
      value: "+91 XXXX XXXXXX",
      link: "tel:+91XXXXXXXXXX",
    },
    {
      icon: <MapPin size={24} />,
      label: "Location",
      value: "India",
      link: null,
    },
    {
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
      value: "linkedin.com/in/nehemiah-nesanathan",
      link: "https://linkedin.com/in/nehemiah-nesanathan",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-bright-purple/5 blur-3xl -z-10"></div>

      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-gradient-purple">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-purple mx-auto mb-8 rounded-full"></div>
          <p className="text-white/70">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div 
              className={`glass-card p-8 rounded-xl h-full transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-bright-purple/10 flex items-center justify-center text-bright-purple">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{info.label}</h4>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-bright-purple transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white/70">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <h4 className="font-medium mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-bright-purple/10 flex items-center justify-center text-white hover:bg-bright-purple hover:text-white transition-all"
                  >
                    <Github size={18} />
                  </a>
                  <a 
                    href="https://linkedin.com/in/nehemiah-nesanathan" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-bright-purple/10 flex items-center justify-center text-white hover:bg-bright-purple hover:text-white transition-all"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div 
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-8">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white/80 mb-2 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark/50 border border-bright-purple/20 rounded-lg px-4 py-3 focus:outline-none focus:border-bright-purple focus:ring-1 focus:ring-bright-purple transition-all text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/80 mb-2 font-medium">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark/50 border border-bright-purple/20 rounded-lg px-4 py-3 focus:outline-none focus:border-bright-purple focus:ring-1 focus:ring-bright-purple transition-all text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-white/80 mb-2 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark/50 border border-bright-purple/20 rounded-lg px-4 py-3 focus:outline-none focus:border-bright-purple focus:ring-1 focus:ring-bright-purple transition-all text-white"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white/80 mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-dark/50 border border-bright-purple/20 rounded-lg px-4 py-3 focus:outline-none focus:border-bright-purple focus:ring-1 focus:ring-bright-purple transition-all text-white resize-none"
                    placeholder="Hi there! I'd like to talk about..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-primary w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
