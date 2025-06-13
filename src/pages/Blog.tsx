import { useState, useEffect, useRef } from "react";
import { Calendar, Clock, User, ArrowRight, Search, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Mock blog posts data
    const mockPosts: BlogPost[] = [
      {
        id: "1",
        title: "The Future of AI in Education: Transforming Learning Experiences",
        excerpt: "Exploring how artificial intelligence is revolutionizing the educational landscape and creating personalized learning experiences for students worldwide.",
        content: "Full blog content here...",
        author: "Nehemiah Nesanathan",
        date: "2024-01-15",
        readTime: "8 min read",
        category: "AI & Education",
        tags: ["AI", "Education", "Machine Learning", "EdTech"],
        image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        id: "2",
        title: "Building Scalable Machine Learning Models: Best Practices",
        excerpt: "A comprehensive guide to developing and deploying machine learning models that can handle real-world scale and complexity.",
        content: "Full blog content here...",
        author: "Nehemiah Nesanathan",
        date: "2024-01-10",
        readTime: "12 min read",
        category: "Machine Learning",
        tags: ["ML", "Python", "Deployment", "Scalability"],
        image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        id: "3",
        title: "React Performance Optimization: Advanced Techniques",
        excerpt: "Deep dive into advanced React optimization techniques that can significantly improve your application's performance and user experience.",
        content: "Full blog content here...",
        author: "Nehemiah Nesanathan",
        date: "2024-01-05",
        readTime: "10 min read",
        category: "Web Development",
        tags: ["React", "Performance", "JavaScript", "Optimization"],
        image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        id: "4",
        title: "Neural Networks Explained: From Theory to Implementation",
        excerpt: "Understanding the fundamentals of neural networks and implementing them from scratch using Python and TensorFlow.",
        content: "Full blog content here...",
        author: "Nehemiah Nesanathan",
        date: "2023-12-28",
        readTime: "15 min read",
        category: "Deep Learning",
        tags: ["Neural Networks", "TensorFlow", "Python", "Deep Learning"],
        image: "https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ];

    setPosts(mockPosts);
    setFilteredPosts(mockPosts);
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

  useEffect(() => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, posts]);

  const categories = ["all", ...Array.from(new Set(posts.map(post => post.category)))];

  return (
    <div className="bg-royal-black min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-golden/5 blur-3xl -z-10"></div>
        
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            My <span className="text-gradient-gold">Blog</span>
          </h1>
          <p className="text-xl text-silver/80 max-w-2xl mx-auto mb-12">
            Insights, tutorials, and thoughts on AI, machine learning, web development, and technology trends.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-golden" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-royal-black/50 border border-golden/20 rounded-lg focus:ring-2 focus:ring-golden focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-golden text-royal-black"
                      : "bg-royal-black border border-golden/20 text-golden hover:bg-golden/10"
                  }`}
                >
                  {category === "all" ? "All Posts" : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section ref={sectionRef} className="py-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className={`glass-card rounded-xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-golden/20 border border-golden/30 text-golden">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-silver/60 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-golden transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-silver/70 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded bg-royal-black/50 border border-golden/10 text-golden"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-golden" />
                      <span className="text-sm text-silver/70">{post.author}</span>
                    </div>
                    <button className="flex items-center gap-2 text-golden hover:gap-3 transition-all duration-300">
                      Read More <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4">No posts found</h3>
              <p className="text-silver/70">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
