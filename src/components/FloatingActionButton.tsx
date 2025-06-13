import { useState } from 'react';
import { MessageCircle, Mail, Phone, X, Github, Linkedin } from 'lucide-react';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      href: 'mailto:nehemiahnesanathan@gmail.com',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <Phone size={20} />,
      label: 'Call',
      href: 'tel:+91XXXXXXXXX',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <Github size={20} />,
      label: 'GitHub',
      href: 'https://github.com/nehemiah-nesanathan',
      color: 'bg-gray-700 hover:bg-gray-800'
    },
    {
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/nehemiah-nesanathan',
      color: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      <div className={`flex flex-col gap-3 mb-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action, index) => (
          <a
            key={action.label}
            href={action.href}
            target={action.href.startsWith('http') ? '_blank' : undefined}
            rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`w-12 h-12 rounded-full ${action.color} text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 group relative`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {action.icon}
            <span className="absolute right-14 bg-royal-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {action.label}
            </span>
          </a>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-golden text-royal-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl hover:shadow-golden/20"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default FloatingActionButton;
