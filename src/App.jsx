import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calculator, Atom, Zap, Settings, Building, Coffee, Github, Globe, User, FileText, Award, Menu, X, Youtube } from 'lucide-react';

const applications = [
  {
    id: 1,
    name: 'XRDlicious',
    title: 'Powder Diffraction and More',
    description: 'Online calculator of partial radial distribution function (PRDF), global RDF, and powder XRD/ND patterns for crystal structures. Experimental powder diffraction file format conversion. MP, AFLOW, and COD databases search interface.',
    icon: Calculator,
    color: 'from-blue-500 to-purple-600',
    features: ['PRDF Calculation', 'Global RDF Analysis', 'XRD/ND Patterns', 'Crystal Structure Tools']
  },
  {
    id: 2,
    name: 'ICET & ATAT SQS',
    title: 'Special Quasi Random Structures',
    description: 'Intuitive interface for ICET and ATAT generation of special quasi random structures (SQS) to simulate random alloys.',
    icon: Atom,
    color: 'from-green-500 to-teal-600',
    features: ['SQS Generation', 'ICET Integration', 'ATAT Compatibility', 'Materials Modeling']
  },
  {
    id: 3,
    name: 'MACE GUI',
    title: 'MACE MLIP',
    description: 'GUI for running simulations with machine learning MACE interatomic potential. Geometry optimization, formation energies, elastic properties, phonons.',
    icon: Zap,
    color: 'from-purple-500 to-pink-600',
    features: ['MACE Integration', 'Geometry Optimization', 'Elastic Properties', 'Phonons']
  },
  {
    id: 4,
    name: 'VASP Helper',
    title: 'VASP Automation Suite',
    description: 'GUI for automatic creation of POTCAR for POSCAR and calculations of energy cut-off (Ecut) and k-space sampling convergence in VASP DFT calculations.',
    icon: Settings,
    color: 'from-orange-500 to-red-600',
    features: ['POTCAR Generation', 'Ecut Convergence', 'K-point Sampling', 'VASP Automation']
  },
  {
    id: 5,
    name: 'Point Defects Generator',
    title: 'Crystal Defect Modeling',
    description: 'Online application for creating supercells and random point defects in crystal structures. Interstitials, substitutes, vacancies.',
    icon: Building,
    color: 'from-cyan-500 to-blue-600',
    features: ['Supercell Creation', 'Point Defects', 'Random Generation', 'Crystal Structures']
  },
  {
    id: 6,
    name: 'Quiz Dung Game',
    title: 'Educational RPG Game',
    description: 'Calculate correctly math equations and answer quiz questions to beat monsters and progress through a dungeon! Static Streamlit app combining education with gaming.',
    icon: Coffee,
    color: 'from-yellow-500 to-orange-600',
    features: ['Math Equations', 'Quiz Questions', 'RPG Elements', 'Educational Gaming']
  }
];

export default function RotatingAppShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [showCurrentInfo, setShowCurrentInfo] = useState(false);

  // Auto rotation effect
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, autoRotate]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % applications.length);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + applications.length) % applications.length);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const getPositionClass = (index) => {
    const isActive = index === currentIndex;
    
    if (isActive) {
      // Selected app goes to center
      return {
        transform: 'translate(0px, 0px) scale(1.3)',
        opacity: 1,
        zIndex: 30,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      };
    } else {
      // Other apps arranged in circle around the center
      const otherApps = applications.filter((_, i) => i !== currentIndex);
      const otherIndex = otherApps.findIndex((_, i) => applications.indexOf(otherApps[i]) === index);
      const total = otherApps.length;
      const angle = (2 * Math.PI * otherIndex) / total;
      const radius = 140;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      return {
        transform: `translate(${x}px, ${y}px) scale(0.85)`,
        opacity: 0.7,
        zIndex: 20,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      };
    }
  };

  const handleLaunch = (appName) => {
    switch(appName) {
      case 'XRDlicious':
        window.open('https://rdf-xrd-calculator.streamlit.app/', '_blank');
        break;
      case 'ICET & ATAT SQS':
        window.open('https://atat-sqs.streamlit.app/', '_blank');
        break;
      case 'MACE GUI':
        window.open('https://github.com/bracerino/mace-md-gui', '_blank');
        break;
      case 'VASP Helper':
        window.open('https://github.com/bracerino/convergence-vasp-gui', '_blank');
        break;
      case 'Point Defects Generator':
        window.open('https://xrdlicious-point-defects.streamlit.app/', '_blank');
        break;
      case 'Quiz Dung Game':
        window.open('https://math-dung.streamlit.app/', '_blank');
        break;
      default:
        // For other apps, show coming soon message or handle differently
        console.log(`Launch ${appName}`);
    }
  };

  const currentApp = applications[currentIndex];
  const IconComponent = currentApp.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-black/20 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 text-white h-full overflow-y-auto">
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>


          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Miroslav Lebeda</h2>
            <p className="text-gray-300 text-sm">Loving challenges.. usually</p>
          </div>


          <div className="space-y-4">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold mb-3 text-blue-300">Navigation</h3>
              <button 
                onClick={() => {
                  setSidebarOpen(false);
                  setShowCurrentInfo(false);
                }}
                className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <Globe className="w-5 h-5 text-indigo-400" />
                <span>Main Page</span>
              </button>
            </div>
            
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold mb-3 text-blue-300">Information</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => {
                    setShowCurrentInfo(true);
                    setShowCV(false);
                    setSidebarOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/10 transition-colors text-left"
                >
                  <User className="w-5 h-5 text-blue-400" />
                  <span>Current Information and CV</span>
                </button>
                <a
                  href="https://scholar.google.com/citations?user=GGK2czoAAAAJ&hl=cs&oi=sra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Award className="w-5 h-5 text-purple-400" />
                  <span>Publications</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-300">Links</h3>
              <div className="space-y-2">
                <a
                  href="https://implant.fs.cvut.cz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Globe className="w-5 h-5 text-cyan-400" />
                  <span>Team Website</span>
                </a>
                <a
                  href="https://github.com/bracerino"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Github className="w-5 h-5 text-gray-400" />
                  <span>GitHub Profile</span>
                </a>
                <a
                  href="https://www.youtube.com/@implantMD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Youtube className="w-5 h-5 text-red-500" />
                  <span>YouTube Channel</span>
                </a>
                <a
                  href="https://buymeacoffee.com/bracerino"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Coffee className="w-5 h-5 text-yellow-400" />
                  <span>Buy Me a Coffee</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-white/10 text-center text-xs text-gray-400">
            <p>© 2025 Miroslav Lebeda</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-6 left-6 z-40 p-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Main content - Always has left margin on desktop */}
      {!showCurrentInfo && (
        <div className="lg:ml-80 flex-1 flex flex-col items-center justify-center p-4">
          {/* Welcome message */}
          <div className="w-full max-w-7xl mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-2">
              Welcome, stranger
            </h1>
            <p className="text-lg text-gray-300 text-center">
              Thanks for stopping by. Hope your day is as awesome as you are!
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-white space-y-6">
              <div className={`transition-all duration-150 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${currentApp.color} flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-300 font-medium">{currentApp.name}</div>
                    <h1 className="text-3xl font-bold">{currentApp.title}</h1>
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  {currentApp.description}
                </p>

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Key Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {currentApp.features.map((feature, index) => (
                      <div
                        key={feature}
                        className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 backdrop-blur-sm
                                 border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentApp.color}`}></div>
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-6">
                  <button 
                    onClick={() => handleLaunch(currentApp.name)}
                    className={`px-8 py-4 rounded-xl bg-gradient-to-r ${currentApp.color} 
                                   text-white font-semibold hover:scale-105 transition-all duration-300
                                   shadow-2xl hover:shadow-3xl`}
                  >
                    Launch {currentApp.name}
                  </button>
                </div>

                {/* Application Image */}
                <div className="pt-6">
                  <div className="relative overflow-hidden rounded-xl shadow-2xl">
                    <img 
                      key={currentApp.id}
                      src={`/portfolio/app-${currentApp.id}.png`}
                      alt={`${currentApp.name} application screenshot`}
                      className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105 filter grayscale-[0.3] brightness-75 contrast-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                      onLoad={(e) => {
                        e.target.style.display = 'block';
                        e.target.nextSibling.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gray-900/20 pointer-events-none"></div>
                    <div 
                      key={`fallback-${currentApp.id}`}
                      className="w-full h-64 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center text-gray-400 hidden"
                    >
                      <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-3 rounded-lg bg-gradient-to-br ${currentApp.color} flex items-center justify-center`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-sm">Image preview</p>
                        <p className="text-xs">app-{currentApp.id}.png</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div 
                className="flex items-center justify-center"
                onMouseEnter={() => setAutoRotate(false)}
                onMouseLeave={() => setAutoRotate(true)}
              >
                <div className="relative w-96 h-96 flex items-center justify-center">
                  {applications.map((app, index) => {
                    const AppIcon = app.icon;
                    return (
                      <div
                        key={app.id}
                        className={`absolute w-20 h-20 rounded-2xl bg-gradient-to-br ${app.color} 
                                 flex items-center justify-center cursor-pointer
                                 hover:scale-105 shadow-2xl
                                 ${index === currentIndex ? 'ring-4 ring-white/30' : ''}`}
                        style={getPositionClass(index)}
                        onClick={() => handleDotClick(index)}
                      >
                        <AppIcon className="w-10 h-10 text-white" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex justify-center items-center mt-8 space-x-6">
                <button
                  onClick={handlePrev}
                  disabled={isAnimating}
                  className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 
                           transition-all duration-300 disabled:opacity-50 group"
                >
                  <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>

                <div className="flex space-x-2">
                  {applications.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-white scale-125' 
                          : 'bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={isAnimating}
                  className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 
                           transition-all duration-300 disabled:opacity-50 group"
                >
                  <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showCurrentInfo && (
        <div className="fixed bottom-6 right-6 flex items-center space-x-2 text-white/60 text-sm z-30">
          <div className={`w-2 h-2 rounded-full ${autoRotate ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
          <span>{autoRotate ? 'Auto-rotating' : 'Paused'}</span>
        </div>
      )}

      {showCurrentInfo && (
        <div className="fixed inset-0 bg-black z-[999] flex items-center justify-center p-4">
          <div className="bg-gray-900/98 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-white/20 bg-gray-900/98 backdrop-blur-xl flex-shrink-0">
              <h2 className="text-3xl font-bold text-white">Current Information and CV</h2>
              <button
                onClick={() => setShowCurrentInfo(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-scroll p-6 text-white" style={{ minHeight: 0 }}>
              <div className="space-y-8 pb-8">
                {/* Current Status */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">Current Status</h3>
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-1">PhD Studies</h4>
                          <p className="text-gray-300">Finishing the PhD (writing thesis) in Quantum Technologies</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-1">Current Work</h4>
                          <p className="text-gray-300">Working at Faculty of Mechanical Engineering, CTU in Prague</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-1">Research Position</h4>
                          <p className="text-gray-300"><strong>Institute of Physics of the Czech Academy of Sciences</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">Education</h3>
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-1">PhD in Quantum Technologies (2020 – Present)</h4>
                          <p className="text-gray-300">Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-1">Master's Degree in Solid State Engineering (2018 – 2020)</h4>
                          <p className="text-gray-300">Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague | Graduated with honors</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-1">Bachelor's Degree in Solid State Engineering (2014 – 2018)</h4>
                          <p className="text-gray-300">Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague | Graduated with honors</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Work Experience */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">Work Experience</h3>
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-1">PhD Student & Researcher (2019 – Present)</h4>
                          <p className="text-gray-300">Department of Material Analysis, Institute of Physics, Czech Academy of Sciences</p>
                          <p className="text-gray-300 text-sm">X-ray diffraction analysis, SAXS measurement and analysis, orientation of single-crystals</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-1">Researcher (2020 – Present)</h4>
                          <p className="text-gray-300">Department of Physics, Faculty of Mechanical Engineering, Czech Technical University in Prague</p>
                          <p className="text-gray-300 text-sm">Ion implantation and predictions of its effects on materials surface properties using computer simulations</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Research Focus */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">Research Focus</h3>
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <p className="text-gray-300 leading-relaxed">
                      Fundamental research of ion implantation and its application on surface modifications 
                      of titanium with nitrogen beam using a combined experimental and computational approach. 
                      The work involves advanced computational materials science, including DFT calculations, 
                      molecular dynamics simulations, and machine learning applications in materials research.
                    </p>
                  </div>
                </div>

                {/* Technical Skills */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">Technical Skills</h3>
                  <div className="grid gap-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-gray-200 mb-2">Programming</h4>
                      <p className="text-gray-300 text-sm">Python, Bash scripting, Linux (Ubuntu)</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-gray-200 mb-2">Computational Methods</h4>
                      <p className="text-gray-300 text-sm">DFT, MD simulations, Machine Learning</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-gray-200 mb-2">Software</h4>
                      <p className="text-gray-300 text-sm">VASP, CP2K, LAMMPS, HPC Computing (Slurm), Materials Studio, TRIM, TRIDYN, SDTrimSP</p>
                    </div>
                  </div>
                </div>

                
                {/* Research Achievements */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">Research Achievements</h3>
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <ul className="space-y-2 text-gray-300">
                      <li>• 10 published articles and conference papers</li>
                      <li>• Participated in 10 international conferences</li>
                      <li>• Contributed to 3 grant proposals</li>
                      <li>• Work on 2 student grants</li>
                      <li>• Teaching bachelor courses (Seminar of Computer Simulations, Basics of Solid State Physics)</li>
                      <li>• All State Exams (Bachelor, Masters, PhD) absolved with honors</li>
                    </ul>
                  </div>
                </div>

                {/* PhD Courses */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">Completed PhD Courses</h3>
                  <div className="grid gap-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-gray-200 mb-2">Core Courses</h4>
                      <p className="text-gray-300 text-sm">Numerical Methods for Quantum Technologies, Advanced Topics in Quantum Theory of Solid State</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-gray-200 mb-2">Computational Courses</h4>
                      <p className="text-gray-300 text-sm">Atomistic Computer Simulations of Quantum Structures, Computational Physics</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-gray-200 mb-2">Machine Learning</h4>
                      <p className="text-gray-300 text-sm">Machine Learning and Optimization in Physics</p>
                    </div>
                  </div>
                </div>

                {/* Experimental Skills */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">Experimental Skills</h3>
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-200 mb-1">Ion Implantation</h4>
                        <p className="text-gray-300 text-sm">Experienced in ion implantation techniques and analysis</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-200 mb-1">X-ray Diffraction</h4>
                        <p className="text-gray-300 text-sm">Single crystal orientations, phase analysis, stress analysis</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-200 mb-1">SAXS Analysis</h4>
                        <p className="text-gray-300 text-sm">Small-angle X-ray scattering measurements and analysis</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Activities */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">Academic Activities</h3>
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <ul className="space-y-2 text-gray-300">
                      <li>• Teaching assistant for bachelor courses</li>
                      <li>• Supervision of student projects</li>
                      <li>• Participation in international conferences</li>
                      <li>• Collaboration on grant proposals</li>
                      <li>• Peer review activities</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">Languages</h3>
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <p className="text-gray-300 leading-relaxed">
                      <strong>Czech:</strong> Native | <strong>English:</strong> Fluent | <strong>Spanish:</strong> Beginner
                    </p>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      )}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {showCV && (
        <div className="fixed inset-0 bg-black z-[999] p-4">
          <div className="w-full h-full flex items-start justify-center pt-8">
            <div className="bg-gray-900/98 backdrop-blur-xl border border-white/20 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center p-6 border-b border-white/20 bg-gray-900/98 backdrop-blur-xl">
                <h2 className="text-3xl font-bold text-white">Curriculum Vitae</h2>
                <button
                  onClick={() => setShowCV(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 text-white overflow-y-auto max-h-[calc(85vh-100px)] scroll-smooth">
                <div className="space-y-8 pb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-300 mb-4">Education</h3>
                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">PhD in Quantum Technologies</h4>
                          <span className="text-sm text-gray-400">2020 – Present</span>
                        </div>
                        <p className="text-gray-300 text-sm">Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">Master's Degree in Solid State Engineering</h4>
                          <span className="text-sm text-gray-400">2018 – 2020</span>
                        </div>
                        <p className="text-gray-300 text-sm">Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague | Graduated with honors</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">Bachelor's Degree in Solid State Engineering</h4>
                          <span className="text-sm text-gray-400">2014 – 2018</span>
                        </div>
                        <p className="text-gray-300 text-sm">Faculty of Nuclear Sciences and Physical Engineering, Czech Technical University in Prague | Graduated with honors</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-blue-300 mb-4">Work Experience</h3>
                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">PhD Student & Researcher</h4>
                          <span className="text-sm text-gray-400">2019 – Present</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">Department of Material Analysis, Institute of Physics, Czech Academy of Sciences</p>
                        <p className="text-gray-300 text-sm">X-ray diffraction analysis, SAXS measurement and analysis, orientation of single-crystals</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">Researcher</h4>
                          <span className="text-sm text-gray-400">2020 – Present</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">Department of Physics, Faculty of Mechanical Engineering, Czech Technical University in Prague</p>
                        <p className="text-gray-300 text-sm">Ion implantation and predictions of its effects on materials surface properties using computer simulations</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-300 mb-4">Technical Skills</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-200 mb-1">Programming</h4>
                          <p className="text-sm text-gray-400">Python, Bash scripting, Linux (Ubuntu)</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-200 mb-1">Computational</h4>
                          <p className="text-sm text-gray-400">DFT, MD simulations, Machine Learning</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-200 mb-1">Software</h4>
                          <p className="text-sm text-gray-400">VASP, CP2K, LAMMPS, HPC Computing (Slurm), Materials Studio, TRIM, TRIDYN, SDTrimSP</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-300 mb-4">Research</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-200 mb-1">Publications</h4>
                          <p className="text-sm text-gray-400">10 published articles and conference papers</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-200 mb-1">Conferences</h4>
                          <p className="text-sm text-gray-400">Participated in 10 conferences</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-200 mb-1">Languages</h4>
                          <p className="text-sm text-gray-400">Czech (native), English (fluent), Spanish (beginner)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
