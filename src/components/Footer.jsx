import { Code, User, Globe, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/10 relative z-10 bg-slate-950/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-slate-400 text-sm flex items-center gap-2">
          &copy; {new Date().getFullYear()} Sasiru Liyanage. Built with 
          <Heart className="w-4 h-4 text-primary inline animate-pulse" /> 
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/sasiruliyanage2004" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all interactive">
            <Code className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/sasiru-liyanage2004" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all interactive">
            <User className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all interactive">
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
