import React, { useState } from "react";
import {
  Briefcase, MapPin, Building2, Users, Star, Send,
  CheckCircle, ChevronRight, Zap, Heart, Coffee,
  Globe, Award, TrendingUp, Rocket, Shield, Sparkles
} from "lucide-react";

// RoleSense Internal Careers Page - For hiring at RoleSense company itself
const CareersPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  // Sample RoleSense internal job openings
  const roleSenseJobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Bangalore / Remote",
      type: "Full-time",
      experience: "5-8 years",
      description: "Build and scale our AI-powered recruitment platform. Work with React, Python, and cutting-edge ML technologies."
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Bangalore",
      type: "Full-time",
      experience: "4-6 years",
      description: "Drive product strategy and roadmap for our B2B SaaS recruitment platform."
    },
    {
      id: 3,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Mumbai / Bangalore",
      type: "Full-time",
      experience: "3-5 years",
      description: "Help our enterprise clients maximize value from the RoleSense platform."
    },
    {
      id: 4,
      title: "AI/ML Engineer",
      department: "Engineering",
      location: "Bangalore / Remote",
      type: "Full-time",
      experience: "3-6 years",
      description: "Build intelligent matching algorithms and predictive models for career trajectory analysis."
    }
  ];

  const benefits = [
    { icon: Heart, title: "Health & Wellness", description: "Comprehensive health insurance for you and family" },
    { icon: Coffee, title: "Flexible Work", description: "Remote-first culture with flexible hours" },
    { icon: TrendingUp, title: "Growth", description: "Learning budget and career development programs" },
    { icon: Award, title: "Recognition", description: "Performance bonuses and ESOP opportunities" },
    { icon: Globe, title: "Global Impact", description: "Work with clients across the globe" },
    { icon: Rocket, title: "Innovation", description: "Latest tech stack and AI/ML projects" }
  ];

  const values = [
    { title: "Innovation First", description: "We push boundaries with AI and automation" },
    { title: "Customer Obsessed", description: "Our clients' success is our success" },
    { title: "Transparency", description: "Open communication and honest feedback" },
    { title: "Continuous Learning", description: "We grow together as a team" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Role<span className="text-purple-600">Sense</span></span>
            </a>
            <nav className="flex items-center gap-6">
              <a href="/" className="text-sm text-gray-600 hover:text-gray-900">Platform</a>
              <a href="/jobs" className="text-sm text-gray-600 hover:text-gray-900">Browse Jobs</a>
              <a href="/careers" className="text-sm text-indigo-600 font-medium">Careers</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            We're Hiring!
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Join the Future of Recruitment
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Help us revolutionize how companies find and hire talent. We're building AI-powered tools that make recruitment smarter, faster, and fairer.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="#openings" className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              View Open Positions
            </a>
            <a href="#culture" className="px-8 py-3 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Our Culture
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600">50+</div>
              <div className="text-gray-500">Team Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600">100+</div>
              <div className="text-gray-500">Enterprise Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600">5M+</div>
              <div className="text-gray-500">Candidates Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600">4</div>
              <div className="text-gray-500">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section id="culture" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              What drives us every day to build the best recruitment platform
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join RoleSense?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We take care of our team so they can take care of our customers
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <benefit.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find your next role at RoleSense
            </p>
          </div>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            {roleSenseJobs.map(job => (
              <div 
                key={job.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedRole(selectedRole === job.id ? null : job.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${selectedRole === job.id ? 'rotate-90' : ''}`} />
                </div>
                
                {selectedRole === job.id && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <a 
                      href={`mailto:info@rolesense.in?subject=Application for ${job.title}`}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Apply Now
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Don't see your role */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Don't see a role that fits?</p>
            <a 
              href="mailto:info@rolesense.in?subject=General Application"
              className="inline-flex items-center gap-2 px-6 py-3 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Send us your resume
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">Role<span className="text-purple-400">Sense</span></span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="/" className="hover:text-white">Platform</a>
              <a href="/jobs" className="hover:text-white">Browse Jobs</a>
              <a href="/careers" className="hover:text-white">Careers</a>
              <a href="/admin" className="hover:text-white">Admin</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2025 RoleSense. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareersPage;
