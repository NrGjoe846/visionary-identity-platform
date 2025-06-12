
import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send, User, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      value: "nehemiahnesanathan@gmail.com",
      link: "mailto:nehemiahnesanathan@gmail.com"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      value: "+91 XXXXX XXXXX",
      link: "tel:+91XXXXXXXXX"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      value: "Chennai, Tamil Nadu, India",
      link: "#"
    }
  ];

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-golden/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-silver/5 blur-3xl -z-10"></div>

      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-gradient-gold">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-royal mx-auto mb-8 rounded-full"></div>
          <p className="text-silver/70">
            Let's discuss your next project or collaboration opportunity. I'm always excited to work on innovative solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Start a Conversation</h3>
              <p className="text-silver/80 text-lg leading-relaxed mb-8">
                I'm always open to discussing new opportunities, innovative projects, 
                and ways to make AI more accessible through education and technology.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-center gap-4 p-4 rounded-xl bg-golden/5 border border-golden/10 hover:bg-golden/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-golden/20 flex items-center justify-center text-golden group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{info.title}</h4>
                    <p className="text-silver/70">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-gradient-dark border border-golden/20">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <MessageSquare size={20} className="text-golden" />
                Quick Response
              </h4>
              <p className="text-silver/70 text-sm">
                I typically respond to messages within 24 hours. For urgent inquiries, 
                please mention it in your subject line.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8 rounded-xl border border-golden/20">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-golden" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-royal-black/50 border border-golden/20 rounded-lg focus:ring-2 focus:ring-golden focus:border-transparent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-golden" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-royal-black/50 border border-golden/20 rounded-lg focus:ring-2 focus:ring-golden focus:border-transparent transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-royal-black/50 border border-golden/20 rounded-lg focus:ring-2 focus:ring-golden focus:border-transparent transition-all duration-300"
                  placeholder="Project Collaboration"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-royal-black/50 border border-golden/20 rounded-lg focus:ring-2 focus:ring-golden focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-golden text-royal-black font-semibold py-4 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-royal-black/30 border-t-royal-black rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
