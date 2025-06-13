import { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  date: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Mock testimonials data
    const mockTestimonials: Testimonial[] = [
      {
        id: "1",
        name: "Dr. Sarah Johnson",
        role: "Research Director",
        company: "MIT Square",
        content: "Nehemiah's work on AI research has been exceptional. His ability to translate complex machine learning concepts into practical applications is remarkable. The sentiment analysis system he developed exceeded our expectations and has become a cornerstone of our research initiatives.",
        rating: 5,
        image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
        date: "2024-01-15"
      },
      {
        id: "2",
        name: "Michael Chen",
        role: "CTO",
        company: "TechVision Solutions",
        content: "Working with Nehemiah on our EdTech platform was a game-changer. His expertise in AI and deep understanding of educational needs resulted in a product that truly makes learning more accessible and engaging. Highly recommended!",
        rating: 5,
        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
        date: "2023-12-20"
      },
      {
        id: "3",
        name: "Prof. Emily Rodriguez",
        role: "Head of Computer Science",
        company: "University of Technology",
        content: "Nehemiah was one of our most dedicated students. His passion for AI and machine learning was evident from day one. He consistently delivered outstanding projects and showed exceptional leadership skills. It's no surprise he's making such an impact in the field.",
        rating: 5,
        image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
        date: "2023-11-10"
      },
      {
        id: "4",
        name: "David Kumar",
        role: "Senior Developer",
        company: "InnovateLabs",
        content: "Nehemiah's technical skills are impressive, but what sets him apart is his ability to explain complex concepts in simple terms. The workshops he conducted for our team were incredibly valuable and helped us implement AI solutions more effectively.",
        rating: 5,
        image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
        date: "2023-10-05"
      },
      {
        id: "5",
        name: "Lisa Thompson",
        role: "Product Manager",
        company: "EduTech Innovations",
        content: "The AI-powered learning management system Nehemiah developed for us has transformed how our students learn. The personalized learning paths and intelligent recommendations have significantly improved engagement and learning outcomes.",
        rating: 5,
        image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
        date: "2023-09-15"
      },
      {
        id: "6",
        name: "Rajesh Patel",
        role: "Startup Founder",
        company: "AI Ventures",
        content: "Nehemiah's mentorship and guidance were instrumental in helping us understand the AI landscape. His practical approach and deep knowledge helped us make informed decisions about our product development strategy.",
        rating: 5,
        image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400",
        date: "2023-08-20"
      }
    ];

    setTestimonials(mockTestimonials);
  }, []);

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

    return () => observer.disconnect();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "text-golden fill-current" : "text-silver/30"}
      />
    ));
  };

  return (
    <div className="bg-royal-black min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-golden/5 blur-3xl -z-10"></div>
        
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Client <span className="text-gradient-gold">Testimonials</span>
          </h1>
          <p className="text-xl text-silver/80 max-w-2xl mx-auto mb-12">
            What clients, colleagues, and mentors say about working with me.
          </p>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section ref={sectionRef} className="py-20">
        <div className="container mx-auto max-w-4xl">
          {testimonials.length > 0 && (
            <div className={`glass-card p-8 md:p-12 rounded-xl text-center transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <Quote className="text-golden mx-auto mb-6" size={48} />
              
              <blockquote className="text-xl md:text-2xl text-silver/90 mb-8 leading-relaxed">
                "{testimonials[currentIndex]?.content}"
              </blockquote>

              <div className="flex justify-center mb-4">
                {renderStars(testimonials[currentIndex]?.rating || 5)}
              </div>

              <div className="flex items-center justify-center gap-4 mb-8">
                <img
                  src={testimonials[currentIndex]?.image}
                  alt={testimonials[currentIndex]?.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-golden/30"
                />
                <div className="text-left">
                  <h4 className="text-lg font-semibold">{testimonials[currentIndex]?.name}</h4>
                  <p className="text-golden">{testimonials[currentIndex]?.role}</p>
                  <p className="text-silver/60 text-sm">{testimonials[currentIndex]?.company}</p>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full bg-royal-black border border-golden/20 flex items-center justify-center text-golden hover:bg-golden/10 transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full bg-royal-black border border-golden/20 flex items-center justify-center text-golden hover:bg-golden/10 transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-golden" : "bg-silver/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            All <span className="text-gradient-gold">Reviews</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`glass-card p-6 rounded-xl transition-all duration-700 hover:transform hover:scale-105 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="text-xs text-silver/60">
                    {new Date(testimonial.date).toLocaleDateString()}
                  </span>
                </div>

                <blockquote className="text-silver/80 mb-6 line-clamp-4">
                  "{testimonial.content}"
                </blockquote>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-golden/30"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-golden text-sm">{testimonial.role}</p>
                    <p className="text-silver/60 text-xs">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <div className="glass-card p-8 md:p-12 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Work Together?
            </h3>
            <p className="text-silver/70 mb-8">
              Join the growing list of satisfied clients and let's create something amazing together.
            </p>
            <a href="#contact" className="button-primary">
              Start Your Project
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
