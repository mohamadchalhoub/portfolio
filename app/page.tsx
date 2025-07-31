"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Database,
  Globe,
  Terminal,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    
    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:chalhoubmohd@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCV = async () => {
    // Get the base URL for production
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? window.location.origin 
      : '';
    
    const cvUrl = `${baseUrl}/mohamad-chalhoub-cv.pdf`;
    
    try {
      // First check if the file exists
      const response = await fetch(cvUrl, { method: 'HEAD' });
      
      if (!response.ok) {
        throw new Error('CV file not found');
      }
      
      // Method 1: Try direct download
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = 'Mohamad_Chalhoub_CV.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Add to DOM, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed, trying fallback:', error);
      
      // Method 2: Fallback - open in new tab
      try {
        window.open(cvUrl, '_blank');
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        
        // Method 3: Final fallback - redirect
        window.location.href = cvUrl;
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-cyan-400">
              {"<Portfolio />"}
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronUp className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-500"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500">
              <div className="w-32 h-32 rounded-full bg-black overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Mohamad Chalhoub"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
            Mohamad Chalhoub
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Full Stack Web Developer & Cybersecurity Specialist focused on
            building secure, scalable applications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white px-8 py-3"
            >
              View My Work
            </Button>
            <Button
              onClick={handleDownloadCV}
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-3 bg-transparent"
            >
              Download CV
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyan-400">
            {"<About />"}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-purple-400">
                Full Stack Developer & Security Expert
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm a passionate full-stack web developer and cybersecurity
                specialist with extensive experience in building modern, secure
                web applications. I specialize in React, Next.js, Node.js, and
                web application security, creating seamless user experiences
                with robust security measures and backend solutions.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                My unique combination of development and security expertise
                allows me to build applications that are not only functional and
                user-friendly but also secure from the ground up. I understand
                both how to build applications and how to protect them from
                modern cyber threats.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Frontend</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Backend</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Full Stack</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Terminal className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">Security</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-xl"></div>
              <Card className="bg-gray-900/50 border-cyan-500/30 relative">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Tech Stack</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-purple-400 font-semibold mb-2">
                      Frontend
                    </h4>
                    <p className="text-gray-300 text-sm">
                      React, Next.js, JavaScript, HTML5, CSS3
                    </p>
                  </div>
                  <div>
                    <h4 className="text-purple-400 font-semibold mb-2">
                      Backend
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Node.js, Express.js, RESTful APIs
                    </p>
                  </div>
                  <div>
                    <h4 className="text-purple-400 font-semibold mb-2">
                      Databases
                    </h4>
                    <p className="text-gray-300 text-sm">
                      MySQL, MongoDB, Database Design
                    </p>
                  </div>
                  <div>
                    <h4 className="text-purple-400 font-semibold mb-2">
                      Security
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Web App Security, Penetration Testing
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Technologies Section */}
      <section id="projects" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyan-400">
            {"<Skills & Technologies />"}
          </h2>

          {/* Main Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Frontend Development */}
            <Card className="bg-gray-900/50 border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-cyan-400">
                  Frontend Development
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Building responsive and interactive user interfaces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">React</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full w-5/6"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Next.js</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">JavaScript</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full w-5/6"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">HTML/CSS</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backend Development */}
            <Card className="bg-gray-900/50 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Terminal className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-purple-400">
                  Backend Development
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Creating robust server-side applications and APIs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Node.js</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Express.js</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">REST APIs</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Authentication</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full w-3/5"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Database Management */}
            <Card className="bg-gray-900/50 border-green-500/30 hover:border-green-500/60 transition-all duration-300 group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-green-400">
                  Database Management
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Designing and managing efficient data storage solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">MySQL</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">MongoDB</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Database Design</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full w-3/5"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Data Modeling</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full w-2/3"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Web Application Security */}
            <Card className="bg-gray-900/50 border-red-500/30 hover:border-red-500/60 transition-all duration-300 group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-red-400">Web App Security</CardTitle>
                <CardDescription className="text-gray-400">
                  Securing applications against modern cyber threats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Penetration Testing</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-red-400 to-orange-400 h-2 rounded-full w-5/6"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">OWASP Top 10</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-red-400 to-orange-400 h-2 rounded-full w-5/6"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Secure Coding</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-red-400 to-orange-400 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">
                      Vulnerability Assessment
                    </span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-red-400 to-orange-400 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Learning Journey */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12 text-purple-400">
              Current Learning Journey
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center">
                    <Terminal className="w-5 h-5 mr-2" />
                    Currently Mastering
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">
                      Advanced React Patterns
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                    <span className="text-gray-300">Next.js App Router</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-400"></div>
                    <span className="text-gray-300">
                      Advanced Web App Security
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-600"></div>
                    <span className="text-gray-300">
                      Security Automation Tools
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Next Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300">
                      Cloud Security (AWS/Azure)
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">
                      Security Certifications (CEH/CISSP)
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300">DevSecOps Integration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">
                      AI/ML Security Applications
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">
              Ready to Build Secure Applications?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              I combine full-stack development expertise with cybersecurity
              knowledge to create applications that are both powerful and
              secure. Let's build something that users can trust!
            </p>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white px-8 py-3"
            >
              Let's Work Together
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyan-400">
            {"<Contact />"}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-purple-400">
                Let's Connect
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Ready to bring your next web project to life? I'm always
                interested in discussing new opportunities, innovative projects,
                and creative collaborations. Let's build something amazing
                together!
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-cyan-400">chalhoubmohd@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-green-500 rounded-lg flex items-center justify-center">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">GitHub</p>
                    <p className="text-purple-400">
                      github.com/mohamadchalhoub
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">LinkedIn</p>
                    <p className="text-green-400">
                      linkedin.com/in/mohamadchalhoub
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="bg-gray-900/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400">Send Message</CardTitle>
                <CardDescription className="text-gray-400">
                  Drop me a line and I'll get back to you soon
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      required
                      className="bg-black/50 border-gray-700 text-gray-100 focus:border-cyan-400"
                    />
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      required
                      className="bg-black/50 border-gray-700 text-gray-100 focus:border-cyan-400"
                    />
                  </div>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    type="email"
                    required
                    className="bg-black/50 border-gray-700 text-gray-100 focus:border-cyan-400"
                  />
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    required
                    className="bg-black/50 border-gray-700 text-gray-100 focus:border-cyan-400"
                  />
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message..."
                    rows={4}
                    required
                    className="bg-black/50 border-gray-700 text-gray-100 focus:border-cyan-400"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white disabled:opacity-50"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {isSubmitting ? 'Sending...' : 'Send Email'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-cyan-500/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2024 Mohamad Chalhoub. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:chalhoubmohd@gmail.com"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
