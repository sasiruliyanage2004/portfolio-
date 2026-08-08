import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const Education = () => {
  const timeline = [
    {
      year: "Current",
      title: "BSc (Hons) in Information Technology",
      institution: "Sri Lanka Institute of Information Technology (SLIIT)",
      description: "2nd Year Undergraduate specializing in Information Technology. Focusing on modern software engineering, web development, and AI/ML applications.",
      icon: GraduationCap,
      color: "text-primary",
      bg: "bg-primary/20",
      border: "border-primary/50"
    },
    {
      year: "2023 - 2024",
      title: "GCE A/L Examination",
      institution: "Gurukula College, Kelaniya",
      description: "Results: Accounting - A, Business Studies - B, Economics - B. Built a strong analytical foundation through commerce subjects.",
      icon: Award,
      color: "text-violet-400",
      bg: "bg-violet-500/20",
      border: "border-violet-500/50"
    },
    {
      year: "2020 - 2021",
      title: "GCE O/L Examination",
      institution: "Gurukula College, Kelaniya",
      description: "Achieved outstanding results including 'A' passes for Mathematics and Health, showcasing early academic excellence.",
      icon: Award,
      color: "text-slate-400",
      bg: "bg-slate-500/20",
      border: "border-slate-500/50"
    }
  ];

  return (
    <section className="py-24 relative" id="education">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full mix-blend-screen filter blur-[150px]" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Education & <span className="text-primary">Journey</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-violet-500 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-violet-500/50 to-transparent" />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center justify-between mb-16 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              } flex-row-reverse`}
            >
              <div className="hidden md:block w-5/12" />
              
              <div className={`absolute left-0 md:left-1/2 transform -translate-x-[18px] md:-translate-x-1/2 w-10 h-10 rounded-full ${item.bg} border-2 ${item.border} flex items-center justify-center z-10 glass-panel`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>

              <div className="w-full md:w-5/12 pl-12 md:pl-0">
                <div className="glass-card p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${item.bg} ${item.color}`}>
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <h4 className="text-primary font-medium mb-3">{item.institution}</h4>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
