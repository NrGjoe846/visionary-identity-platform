import { useState, useEffect } from "react";
import { Download, Mail, Phone, MapPin, Calendar, Award, Briefcase, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const Resume = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDownloadResume = async () => {
    try {
      const resumeUrl = "https://docs.google.com/document/d/17GmTQ-Tprs2JqH4Lryh8eguUaqjvDVvnViAFtAD0ZFQ/export?format=pdf";
      
      const response = await fetch(resumeUrl);
      if (!response.ok) {
        throw new Error("Failed to download resume");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = "Nehemiah_Nesanathan_Resume.pdf";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      window.URL.revokeObjectURL(blobUrl);
      toast({
        title: "Resume downloaded!",
        description: "Thanks for your interest in my profile."
      });
    } catch (error) {
      console.error("Error downloading resume:", error);
      toast({
        title: "Download failed",
        description: "Please try again later or contact me directly.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-royal-black min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-golden/5 blur-3xl -z-10"></div>
        
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            My <span className="text-gradient-gold">Resume</span>
          </h1>
          <p className="text-xl text-silver/80 max-w-2xl mx-auto mb-8">
            Comprehensive overview of my professional experience, skills, and achievements.
          </p>
          <button
            onClick={handleDownloadResume}
            className="button-primary flex items-center gap-2 mx-auto"
          >
            <Download size={20} />
            Download PDF Resume
          </button>
        </div>
      </section>

      {/* Resume Content */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl">
          <div className={`glass-card p-8 md:p-12 rounded-xl transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nehemiah Nesanathan</h2>
              <p className="text-xl text-golden mb-6">AI Developer & ML Researcher | EdTech Innovator</p>
              
              <div className="flex flex-wrap justify-center gap-6 text-silver/70">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-golden" />
                  <span>nehemiahnesanathan@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-golden" />
                  <span>+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-golden" />
                  <span>Chennai, Tamil Nadu, India</span>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Award className="text-golden" size={24} />
                Professional Summary
              </h3>
              <div className="w-20 h-1 bg-gradient-royal mb-6 rounded-full"></div>
              <p className="text-silver/80 leading-relaxed">
                Passionate AI enthusiast and EdTech innovator with extensive experience in machine learning, 
                neural networks, and educational technology development. Proven track record of training over 
                600 students and conducting 10+ workshops. Founder of UNAI TECH, dedicated to making AI 
                education accessible to everyone. Strong background in research, development, and leadership 
                with 4 years of experience as School Pupil Leader.
              </p>
            </div>

            {/* Experience */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="text-golden" size={24} />
                Professional Experience
              </h3>
              <div className="w-20 h-1 bg-gradient-royal mb-6 rounded-full"></div>
              
              <div className="space-y-8">
                <div className="border-l-2 border-golden/30 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-golden"></div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-xl font-semibold">AI/ML Research Intern</h4>
                    <span className="text-golden text-sm">April 2024 - Present</span>
                  </div>
                  <p className="text-silver font-medium mb-2">MIT Square | Remote</p>
                  <ul className="text-silver/70 space-y-1">
                    <li>• Conducted advanced research in artificial intelligence and machine learning applications</li>
                    <li>• Developed social media engagement analysis systems using cutting-edge AI algorithms</li>
                    <li>• Implemented FinBERT-based financial news sentiment analysis for market prediction</li>
                    <li>• Collaborated with research teams to publish findings and improve model performance</li>
                  </ul>
                </div>

                <div className="border-l-2 border-golden/30 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-golden"></div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-xl font-semibold">Founder & CEO</h4>
                    <span className="text-golden text-sm">2023 - Present</span>
                  </div>
                  <p className="text-silver font-medium mb-2">UNAI TECH | Chennai, India</p>
                  <ul className="text-silver/70 space-y-1">
                    <li>• Founded and led a startup focused on AI education and technology solutions</li>
                    <li>• Successfully trained over 600 students in AI and machine learning concepts</li>
                    <li>• Conducted 10+ workshops and webinars to promote AI awareness and literacy</li>
                    <li>• Developed innovative EdTech solutions to make AI education accessible to all</li>
                  </ul>
                </div>

                <div className="border-l-2 border-golden/30 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-golden"></div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-xl font-semibold">Science Teacher</h4>
                    <span className="text-golden text-sm">2023 - 2024</span>
                  </div>
                  <p className="text-silver font-medium mb-2">Local Educational Institution | Chennai, India</p>
                  <ul className="text-silver/70 space-y-1">
                    <li>• Taught science subjects with innovative teaching methodologies</li>
                    <li>• Integrated technology and AI concepts into traditional curriculum</li>
                    <li>• Mentored students in science projects and competitions</li>
                    <li>• Developed interactive learning materials and assessment tools</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="text-golden" size={24} />
                Education
              </h3>
              <div className="w-20 h-1 bg-gradient-royal mb-6 rounded-full"></div>
              
              <div className="space-y-6">
                <div className="border-l-2 border-golden/30 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-golden"></div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-xl font-semibold">Computer Science Engineering</h4>
                    <span className="text-golden text-sm">2020 - 2024</span>
                  </div>
                  <p className="text-silver font-medium mb-2">University of Technology</p>
                  <p className="text-silver/70">
                    Focused on artificial intelligence, machine learning, and data science. 
                    Participated in multiple coding competitions and AI research projects.
                  </p>
                </div>

                <div className="border-l-2 border-golden/30 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-golden"></div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-xl font-semibold">Higher Secondary Education</h4>
                    <span className="text-golden text-sm">2018 - 2020</span>
                  </div>
                  <p className="text-silver font-medium mb-2">St. John's High School</p>
                  <p className="text-silver/70">
                    Specialized in Computer Science with excellent academic performance. 
                    Served as School Pupil Leader for 4 years.
                  </p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-4">Technical Skills</h3>
              <div className="w-20 h-1 bg-gradient-royal mb-6 rounded-full"></div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-golden">Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "JavaScript", "TypeScript", "C", "HTML/CSS", "SQL"].map((skill) => (
                      <span key={skill} className="px-3 py-1 text-sm rounded-full bg-royal-black border border-golden/20 text-golden">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-golden">AI & Machine Learning</h4>
                  <div className="flex flex-wrap gap-2">
                    {["TensorFlow", "Neural Networks", "NLP", "Computer Vision", "Deep Learning"].map((skill) => (
                      <span key={skill} className="px-3 py-1 text-sm rounded-full bg-royal-black border border-golden/20 text-golden">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-golden">Web Development</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "Express", "MongoDB", "REST APIs"].map((skill) => (
                      <span key={skill} className="px-3 py-1 text-sm rounded-full bg-royal-black border border-golden/20 text-golden">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-golden">Tools & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "Docker", "AWS", "Google Cloud", "Jupyter"].map((skill) => (
                      <span key={skill} className="px-3 py-1 text-sm rounded-full bg-royal-black border border-golden/20 text-golden">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-4">Certifications</h3>
              <div className="w-20 h-1 bg-gradient-royal mb-6 rounded-full"></div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "DCA Certification", issuer: "Nehru Yuva Kendra", year: "2023" },
                  { title: "Machine Learning Specialization", issuer: "Coursera", year: "2022" },
                  { title: "Neural Networks and Deep Learning", issuer: "DeepLearning.AI", year: "2022" },
                  { title: "Python for Data Science", issuer: "IBM", year: "2021" }
                ].map((cert, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-royal-black/50 border border-golden/10">
                    <Award className="text-golden mt-1" size={16} />
                    <div>
                      <h4 className="font-semibold">{cert.title}</h4>
                      <p className="text-sm text-silver/70">{cert.issuer} • {cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Button */}
            <div className="text-center">
              <button
                onClick={handleDownloadResume}
                className="button-primary flex items-center gap-2 mx-auto"
              >
                <Download size={20} />
                Download Full Resume
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resume;
