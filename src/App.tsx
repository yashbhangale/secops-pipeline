import { useEffect, useState } from 'react';
import { ChevronRight, Sparkles, Zap, Shield, Cpu, ArrowUpRight, Menu, X } from 'lucide-react';

interface MousePosition {
  x: number;
  y: number;
}

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section
      const sections = ['hero', 'features', 'showcase', 'performance', 'innovation'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxOffset = scrollY * 0.5;
  const heroOpacity = Math.max(1 - scrollY / 500, 0);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden noise">
      {/* Cursor Glow Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 80%)`,
        }}
      />

      {/* Navigation */}
      <header className="fixed top-0 inset-x-0 z-40 animate-fade-in">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`glass-effect rounded-2xl mt-6 transition-all duration-500 ${
            scrollY > 50 ? 'py-3' : 'py-4'
          }`}>
            <div className="flex items-center justify-between px-4 sm:px-6">
              <a href="#hero" className="flex items-center gap-2 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition animate-glow" />
                  <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AutoCraft
                </span>
              </a>
              
              <div className="hidden lg:flex items-center gap-8">
                {['Features', 'Showcase', 'Performance', 'Innovation'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`text-sm font-medium transition-all hover:text-blue-400 relative group ${
                      activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-gray-300'
                    }`}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>

              <div className="hidden lg:flex items-center gap-4">
                <button className="text-sm font-medium text-gray-300 hover:text-white transition px-4 py-2">
                  Sign In
                </button>
                <button className="group relative px-6 py-2 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transition-transform group-hover:scale-105" />
                  <span className="relative text-sm font-medium flex items-center gap-2">
                    Pre-order <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </span>
                </button>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-24 z-30 animate-fade-in">
            <div className="mx-4 glass-effect rounded-2xl p-6 space-y-4">
              {['Features', 'Showcase', 'Performance', 'Innovation'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-medium text-gray-300 hover:text-blue-400 transition py-2"
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <button className="w-full text-center text-gray-300 hover:text-white transition py-2">
                  Sign In
                </button>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg py-3 font-medium">
                  Pre-order
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-black to-purple-950/50" />
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              transform: `translateY(${parallaxOffset}px)`,
              backgroundImage: 'url("https://images.unsplash.com/photo-1617886322207-f59d4b96684b?q=80&w=2000&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Floating Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-float animation-delay-2" />
        </div>

        <div 
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16"
          style={{ opacity: heroOpacity }}
        >
          <div className="text-center space-y-8">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 glass-effect rounded-full px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-blue-400 animate-glow" />
                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Introducing AutoCraft 2025
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
                <span className="block">The Future of</span>
                <span className="block gradient-text mt-2">
                  Performance
                </span>
              </h1>
            </div>

            <p className="animate-fade-in-up animation-delay-2 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 text-balance">
              Experience unprecedented precision engineering and cutting-edge technology 
              in every detail. Where innovation meets elegance.
            </p>

            <div className="animate-fade-in-up animation-delay-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group relative px-8 py-4 rounded-xl overflow-hidden w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition" />
                <span className="relative font-semibold flex items-center justify-center gap-2">
                  Configure Yours
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition" />
                </span>
              </button>
              
              <button className="group px-8 py-4 rounded-xl glass-effect font-semibold hover:bg-white/10 transition w-full sm:w-auto flex items-center justify-center gap-2">
                Watch Demo
                <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-16 max-w-4xl mx-auto">
              {[
                { value: '0-60', label: 'in 2.1s', icon: Zap },
                { value: '500+', label: 'Horsepower', icon: Cpu },
                { value: '300mi', label: 'Range', icon: Shield },
                { value: '98%', label: 'Efficiency', icon: Sparkles },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-400" />
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Engineered for <span className="gradient-text">Excellence</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Every component designed to perfection, every detail carefully crafted
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Performance',
                description: 'Instant acceleration with our advanced electric powertrain technology',
                gradient: 'from-yellow-400 to-orange-500',
              },
              {
                icon: Shield,
                title: 'Maximum Safety',
                description: 'AI-powered safety systems that protect you at every moment',
                gradient: 'from-blue-400 to-cyan-500',
              },
              {
                icon: Cpu,
                title: 'Smart Technology',
                description: 'Cutting-edge AI integration for an intuitive driving experience',
                gradient: 'from-purple-400 to-pink-500',
              },
              {
                icon: Sparkles,
                title: 'Premium Design',
                description: 'Minimalist aesthetics meets luxurious comfort in every detail',
                gradient: 'from-green-400 to-emerald-500',
              },
              {
                icon: Zap,
                title: 'Sustainable Energy',
                description: 'Eco-friendly engineering without compromising on performance',
                gradient: 'from-teal-400 to-blue-500',
              },
              {
                icon: Cpu,
                title: 'Connected Ecosystem',
                description: 'Seamlessly integrated with your digital life',
                gradient: 'from-red-400 to-rose-500',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative glass-effect rounded-3xl p-8 hover:scale-105 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition rounded-3xl from-blue-500 to-purple-600" />
                
                <div className={`relative inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                
                <div className="mt-6 flex items-center text-blue-400 font-medium group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="relative py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                Experience the <span className="gradient-text">Revolution</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Every journey becomes an adventure with our state-of-the-art engineering 
                and thoughtful design philosophy.
              </p>
              <button className="group flex items-center gap-2 text-blue-400 font-semibold">
                Explore Gallery
                <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
              </button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-30" />
              <div className="relative glass-effect rounded-3xl p-2 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop"
                  alt="Luxury Car Interior"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop',
            ].map((src, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl glass-effect p-2 hover:scale-105 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-purple-600/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                <img
                  src={src}
                  alt={`Showcase ${index + 1}`}
                  className="relative w-full h-64 sm:h-72 object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section id="performance" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                  <span className="gradient-text">Peak</span> Performance
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Our advanced electric powertrain delivers instant torque and 
                  exhilarating acceleration that redefines what's possible.
                </p>
                
                <div className="space-y-6">
                  {[
                    { label: 'Top Speed', value: '200 mph' },
                    { label: '0-60 mph', value: '2.1 sec' },
                    { label: 'Power Output', value: '500+ hp' },
                    { label: 'Battery Range', value: '300 miles' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-4 border-b border-white/10">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-2xl font-bold gradient-text">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative h-96 lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1603386329225-868f9b1ee6b9?q=80&w=1200&auto=format&fit=crop"
                  alt="Performance"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation CTA */}
      <section id="innovation" className="relative py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative glass-effect rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20" />
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-float animation-delay-2" />
            </div>
            
            <div className="relative text-center py-20 px-6 space-y-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                Ready to Experience <span className="gradient-text">Innovation?</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Reserve your AutoCraft today and be among the first to experience 
                the future of automotive excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="group relative px-8 py-4 rounded-xl overflow-hidden w-full sm:w-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600" />
                  <span className="relative font-semibold flex items-center justify-center gap-2">
                    Pre-order Now
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition" />
                  </span>
                </button>
                
                <button className="px-8 py-4 rounded-xl glass-effect font-semibold hover:bg-white/10 transition w-full sm:w-auto">
                  Schedule Test Drive
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { title: 'Product', links: ['Models', 'Features', 'Pricing', 'Pre-order'] },
              { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
              { title: 'Resources', links: ['Blog', 'Help Center', 'Community', 'Docs'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'Licenses'] },
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <span>© {new Date().getFullYear()} AutoCraft. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-6">
              {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="hover:text-white transition"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
