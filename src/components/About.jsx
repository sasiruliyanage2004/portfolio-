import { motion } from 'framer-motion';
import { User, Calendar, MapPin, Mail, Phone } from 'lucide-react';

const About = () => {
  return (
    <section className="py-24 relative" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About <span className="text-primary">Me</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-violet-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Profile Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-primary/30 border-t-primary animate-[spin_8s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full overflow-hidden glass-panel border border-white/10 p-2">
                <img 
                  src="/profile.png" 
                  alt="Sasiru Liyanage" 
                  className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Details Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full transition-transform duration-500 group-hover:scale-110" />
              
              <h3 className="text-2xl font-bold text-white mb-4">Sasiru Nethvidu Liyanage</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Analytical IT enthusiast focused on solving complex technical problems through innovation. 
                Passionate about continuous growth and contributing to high-impact, tech-driven teams. 
                I specialize in building intelligent software solutions with modern web technologies and Artificial Intelligence.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Birthday</p>
                    <p className="font-medium text-white">29.08.2004</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="font-medium text-white">96/2 Makola South, Makola</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="font-medium text-white">+94 71 57 00 953</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="font-medium text-white">liyanagesasiru@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
