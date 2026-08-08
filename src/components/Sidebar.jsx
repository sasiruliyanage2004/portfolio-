import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Cpu, User, Target, Briefcase, GraduationCap, Mail } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Target },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Education', href: '#education', icon: GraduationCap },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 w-full z-50 glass-panel py-3 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2 interactive">
          <Cpu className="w-6 h-6 text-primary" />
          <span className="text-lg font-display font-bold text-white">
            SASIRU<span className="text-primary">.AI</span>
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-slate-300 hover:text-white interactive"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar / Mobile Dropdown */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: 0 }}
        className={`fixed top-0 left-0 h-full w-[260px] glass-panel border-r border-glass-border z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0 mt-[60px] md:mt-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col px-6 py-8">
          
          {/* Logo (Desktop only) */}
          <div className="hidden md:flex items-center gap-2 interactive mb-12">
            <Cpu className="w-8 h-8 text-primary" />
            <span className="text-2xl font-display font-bold tracking-tighter text-white">
              SASIRU<span className="text-primary">.AI</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-primary-light transition-all interactive group"
              >
                <link.icon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                {link.name}
              </a>
            ))}
          </nav>

          {/* Bottom Action */}
          <div className="mt-8">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-lg bg-primary-light border border-primary/30 text-primary text-center hover:bg-primary hover:text-white transition-all duration-300 block interactive font-medium"
            >
              Hire Me
            </a>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
