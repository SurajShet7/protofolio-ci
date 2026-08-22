import React, { useState, useEffect, useRef } from 'react';

interface TerminalWidgetProps {
  onClose?: () => void;
}

export const TerminalWidget: React.FC<TerminalWidgetProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'SURAJ_C_SHET CLOUD SYSTEMS [Version 1.0.0]',
    '(c) 2026 Suraj C Shet. All transmissions encrypted.',
    '',
    'Welcome back, administrator.',
    'Type "help" to list available terminal dispatches.',
    ''
  ]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal logs to bottom on history change
  useEffect(() => {
    consoleBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep input focused when clicking inside terminal
  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const cleanCmd = trimmed.toLowerCase();
    
    let response: string[] = [];
    
    switch (cleanCmd) {
      case 'help':
        response = [
          'AVAILABLE DISPATCH COMMANDS:',
          '  about       - Get overview of MCA / Cloud & DevOps Engineer profile',
          '  skills      - Print the system architecture tech stack matrix',
          '  projects    - List engineered projects & selected works',
          '  contact     - Print direct communication coordinates',
          '  clear       - Wipe console buffer',
          '  exit        - Terminate terminal session',
          ''
        ];
        break;
      case 'about':
        response = [
          'SENDER INFO:',
          '  Name:       Suraj C Shet',
          '  Status:     Master of Computer Applications (MCA) Student',
          '  Focus:      Cloud Architecture, Continuous Integration, Continuous',
          '              Deployment (CI/CD), Containerization, Virtualization',
          '              and Systems Optimization.',
          '  Coords:     Vijayanagar, Karnataka, India',
          ''
        ];
        break;
      case 'skills':
        response = [
          'TECH MATRIX:',
          '  [INFRASTRUCTURE]      AWS, Azure, Virtualization, Containerization',
          '  [AUTOMATION]          CI/CD Pipelines, Docker, Bash Scripting, Linux',
          '  [LOGIC/LANGS]         Python, C++, Java, JavaScript/TS',
          '  [DATA LAYER]          MySQL, PostgreSQL, ACID Persistence',
          ''
        ];
        break;
      case 'projects':
        response = [
          'SELECTED WORKS:',
          '  01 / GREENOPS SCHEDULER',
          '       Carbon-Aware Cloud work scheduling strategy built using AWS,',
          '       Docker, and carbon intensity calculation APIs.',
          '  02 / ONLINE HEALTHCARE SYSTEM',
          '       Full-stack telemedicine and electronic health records scheduling',
          '       platform powered by Node.js, PHP, and MySQL.',
          ''
        ];
        break;
      case 'contact':
        response = [
          'COORDINATES:',
          '  Email:      surajcshet5@gmail.com',
          '  Phone:      +91 9611129085',
          '  LinkedIn:   linkedin.com/in/suraj-c',
          '  GitHub:     github.com/SurajShet7',
          ''
        ];
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        if (onClose) {
          onClose();
        }
        return;
      default:
        response = [
          `Command not found: "${trimmed}"`,
          'Type "help" to display standard commands.',
          ''
        ];
    }
    
    setHistory((prev) => [...prev, `guest@suraj-systems:~$ ${trimmed}`, ...response]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div 
      onClick={focusInput}
      className="relative w-full h-full flex flex-col bg-[#0A0806]/95 text-[#EAD8C7] p-6 font-mono text-xs sm:text-sm overflow-hidden select-none border border-[#8C6D4F]/40 shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
    >
      {/* CRT Scanline & Screen Flickers */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .crt-blink {
          animation: blink 1s step-start infinite;
        }
        .crt-scanline {
          animation: scanline 8s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(140, 109, 79, 0.4);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.6);
        }
      `}</style>

      {/* Screen Glare Cover */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#E8DFD8]/[0.015] to-transparent z-10" />
      <div className="absolute inset-0 pointer-events-none crt-scanline bg-[#D4AF37]/[0.01] h-[50%] w-full z-10" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-[#8C6D4F]/25 pb-3 mb-4 select-none">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]/80 shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
          <span className="text-[10px] tracking-[0.25em] font-semibold text-[#D4AF37]">
            SURAJ_C_SHET // SYS_CONSOLE
          </span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          className="text-xs text-[#8C6D4F] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 px-2 py-0.5 border border-[#8C6D4F]/30 hover:border-[#D4AF37] transition-all cursor-pointer"
        >
          [ESC] CLOSE
        </button>
      </div>

      {/* Terminal Output Log */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-1">
        {history.map((line, i) => (
          <div 
            key={i} 
            className={`whitespace-pre-wrap leading-relaxed ${
              line.startsWith('guest@suraj-systems') ? 'text-[#D4AF37] font-semibold' : 'text-[#E8DFD8]/90'
            }`}
          >
            {line}
          </div>
        ))}
        <div ref={consoleBottomRef} />
      </div>

      {/* Active Command Input Row */}
      <div className="flex items-center space-x-2 pt-4 border-t border-[#8C6D4F]/20 mt-4">
        <span className="text-[#D4AF37] font-bold select-none">guest@suraj-systems:~$</span>
        <div className="flex-1 flex items-center relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none text-[#EAD8C7] font-mono caret-transparent relative z-10 select-text"
            autoFocus
          />
          {/* Custom blinking terminal cursor */}
          <div 
            className="absolute top-0 pointer-events-none flex items-center"
            style={{ 
              left: `${input.length * 7.7}px`, // Adjusted scaling for monospaced letters
              maxWidth: '100%' 
            }}
          >
            <span className="inline-block w-2.5 h-4 bg-[#D4AF37] crt-blink shadow-[0_0_8px_rgba(212,175,55,0.7)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalWidget;
