import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { TerminalWidget } from './components/TerminalWidget';

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Close terminal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsTerminalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-[#E8DFD8] selection:bg-[#cbb59d] selection:text-black relative">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />

      {/* Floating CLI Terminal Launch Button */}
      <button
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#8C6D4F]/50 bg-[#120F0C] text-[#EAD8C7] hover:text-[#FFF5EB] hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
        title="Open CLI Terminal"
      >
        <span className="font-mono text-base sm:text-lg tracking-tighter group-hover:scale-110 transition-transform">
          &gt;_
        </span>
      </button>

      {/* Terminal Overlay Drawer Modal */}
      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-4xl h-[80vh] max-h-[600px]"
            >
              <TerminalWidget onClose={() => setIsTerminalOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;