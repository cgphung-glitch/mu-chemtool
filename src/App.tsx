/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  RotateCcw,
  Menu,
  X,
  Compass,
  FlaskConical,
  Atom,
  TrendingUp,
  Layers
} from 'lucide-react';

interface TopicItem {
  id: string;
  name: string;
  url: string;
  description?: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: TopicItem[];
}

const CATEGORIES: Category[] = [
  {
    id: 'basic',
    name: 'Basic',
    icon: <Compass className="w-4 h-4 mr-1.5 inline-block text-[#FFC72C]" />,
    items: [
      { id: 'conversionFactor', name: 'Conversion Factor', url: 'https://cgphung-glitch.github.io/basic/conversion.html', description: 'Dimensional analysis and unit conversion practice' },
      { id: 'temperatureConversion', name: 'Temperature Conversion', url: 'https://cgphung-glitch.github.io/basic/temp-conv.html', description: 'Convert between Celsius, Fahrenheit, and Kelvin' },
      { id: 'significantFigures', name: 'Significant Figures', url: 'https://cgphung-glitch.github.io/basic/sigfig-trainer.html', description: 'Sig-fig identification, rounding, and arithmetic rules' },
      { id: 'uncertainty', name: 'Percent Uncertainty', url: 'https://cgphung-glitch.github.io/basic/Uncertainty.html', description: 'Calculations for relative and absolute uncertainty' },
      { id: 'stdDev', name: 'Standard Deviation', url: 'https://cgphung-glitch.github.io/basic/std-dev-trainer.html', description: 'Sample and population standard deviation calculations' },
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: <FlaskConical className="w-4 h-4 mr-1.5 inline-block text-[#FFC72C]" />,
    items: [
      { id: 'genChem01', name: 'General Chemistry I - Flash Quiz 01', url: 'https://cgphung-glitch.github.io/chemistry/Chem-01-Quiz.html', description: 'Quick recall quiz for fundamentals of Gen Chem I' },
      { id: 'genChem02', name: 'General Chemistry I - Flash Quiz 02', url: 'https://cgphung-glitch.github.io/chemistry/Chem-02-Quiz.html', description: 'Quiz 2 covering atomic structure and molecular bonding' },
      { id: 'genChem03', name: 'General Chemistry I - Practice 03', url: 'https://cgphung-glitch.github.io/chemistry/Chem-03-Practice.html', description: 'Problem-solving practice and guided equations' },
      { id: 'isotopeMass', name: 'Isotopes & Average Atomic Mass', url: 'https://cgphung-glitch.github.io/chemistry/isotope-mass-practice.html', description: 'Calculate weighted average atomic masses from isotopic abundances' },
      { id: 'nomenclature', name: 'General Chemistry Nomenclature', url: 'https://cgphung-glitch.github.io/chemistry/genchem-nomenclature.html', description: 'Inorganic naming conventions for binary and polyatomic salts' },
      { id: 'organicNomenclature', name: 'Organic Nomenclature', url: 'https://cgphung-glitch.github.io/chemistry/organic-nomenclature.html', description: 'IUPAC naming rules for alkanes, alkenes, alkynes, and functional groups' },
      { id: 'stoichiometry', name: 'Stoichiometry', url: 'https://cgphung-glitch.github.io/chemistry/stoichiometry.html', description: 'Mole ratios, limiting reactants, and percent yield' },
      { id: 'balancingEq', name: 'Balancing Chemical Equation', url: 'https://cgphung-glitch.github.io/chemistry/balance-equation.html', description: 'Practice balancing coefficients for chemical equations' },
      { id: 'redoxBalancer', name: 'Redox Reaction Balancer', url: 'https://cgphung-glitch.github.io/chemistry/redox-balance.html', description: 'Half-reaction method in acidic and basic solutions' },
      { id: 'solubility', name: 'Solubility Rules', url: 'https://cgphung-glitch.github.io/chemistry/solubility-quiz.html', description: 'Determine precipitates and aqueous ionic solubilities' },
      { id: 'gasLaws', name: 'Gas Laws', url: 'https://cgphung-glitch.github.io/chemistry/gas-laws-practice.html', description: 'Ideal gas law, Boyle’s, Charles’s, and combined gas law problems' },
      { id: 'thermochemistry', name: 'Thermochemistry', url: 'https://cgphung-glitch.github.io/chemistry/thermochemistry.html', description: 'Enthalpy, calorimetry, and Hess’s Law calculations' },
      { id: 'qchemistry', name: 'Quantum Chemistry', url: 'https://cgphung-glitch.github.io/chemistry/qchem-practice.html', description: 'Energy levels, photon wavelength, and quantum numbers' },
      { id: 'electronConfiguration', name: 'Electron Configuration', url: 'https://cgphung-glitch.github.io/chemistry/electron-configuration.html', description: 'Aufbau principle, Hund’s rule, and orbital diagrams' },
      { id: 'lewisStructures', name: 'Lewis Structures', url: 'https://cgphung-glitch.github.io/chemistry/lewis-structure-trainer.html', description: 'Draw and evaluate covalent Lewis electron dot structures' },
    ]
  },
  {
    id: 'chemLab',
    name: 'Chemistry Lab',
    icon: <Atom className="w-4 h-4 mr-1.5 inline-block text-[#FFC72C]" />,
    items: [
      { id: 'ptProperties', name: 'Periodic Table - Properties', url: 'https://cgphung-glitch.github.io/chemlab-animation/periodic-table-app.html', description: 'Periodic trends, electronegativity, and electron configurations' },
      { id: 'ptGame', name: 'Periodic Table - Game', url: 'https://cgphung-glitch.github.io/chemlab-animation/ptable-game.html', description: 'Interactive element identification and memorization game' },
      { id: 'titration', name: 'Titration', url: 'https://cgphung-glitch.github.io/chemlab-animation/titration.html', description: 'Simulated acid-base titration curve and endpoint analysis' },
      { id: 'constpcalori', name: 'Constant Pressure Calorimetry', url: 'https://cgphung-glitch.github.io/chemlab-animation/const-press-calorimetry.html', description: 'Coffee cup calorimeter simulation for heat of reaction' },
      { id: 'constvcalori', name: 'Constant Volume Calorimetry', url: 'https://cgphung-glitch.github.io/chemlab-animation/bomb-calorimetry.html', description: 'Bomb calorimetry combustion energy simulation' },
      { id: 'lineSpectra', name: 'Line Spectra', url: 'https://cgphung-glitch.github.io/chemlab-animation/element-line-spectra.html', description: 'Emission spectra analysis across periodic table elements' },
      { id: 'HLineSpectra', name: 'Hydrogen Line Spectra Series', url: 'https://cgphung-glitch.github.io/chemlab-animation/hydrogen-spectral-series.html', description: 'Lyman, Balmer, Paschen, and Brackett hydrogen transitions' },
      { id: 'gasLawSims', name: 'Gas Laws Simulation', url: 'https://cgphung-glitch.github.io/chemlab-animation/gas-laws-simulator.html', description: 'Interactive kinetic molecular theory particle simulation' },
      { id: 'hydrogenicOrbitals', name: 'Hydrogenic Orbitals', url: 'https://cgphung-glitch.github.io/chemlab-animation/hydrogenic-orbitals.html', description: '3D electron probability density visualizations' },
      { id: 'particle1DBox', name: 'Particle in a Box', url: 'https://cgphung-glitch.github.io/chemlab-animation/particle-in-a-box.html', description: '1D infinite square well wavefunctions and probabilities' },
      { id: 'HRadialFunc', name: 'Hydrogen Radial Functions', url: 'https://cgphung-glitch.github.io/chemlab-animation/hydrogen-radial-functions.html', description: 'Radial distribution functions and orbital nodes' },
      { id: 'PlanckDistribution', name: 'Planck\'s Distribution of Radiation Energy', url: 'https://cgphung-glitch.github.io/chemlab-animation/Plancks-distribution.html', description: 'Blackbody radiation spectral radiance curves' },
      { id: 'maxwellDistribution', name: 'Maxwell-Boltzmann Distribution', url: 'https://cgphung-glitch.github.io/chemlab-animation/maxwell-boltzmann-distribution.html', description: 'Molecular speeds at varying temperatures and molar masses' },
      { id: 'moleculeSketcher', name: 'Molecule Sketcher', url: 'https://cgphung-glitch.github.io/chemlab-animation/molecule-sketcher.html', description: '2D/3D chemical structure builder and visualizer' },
      { id: 'massWaterBeaker', name: 'Mass of Water in a Beaker', url: 'https://cgphung-glitch.github.io/chemlab-animation/mass-of-water-beaker-demo.html', description: 'Laboratory glassware precision demo with a beaker' },
      { id: 'massWaterGraduatedCylinder', name: 'Mass of Water in a Graduated Cylinder', url: 'https://cgphung-glitch.github.io/chemlab-animation/mass-of-water-cylinder-demo.html', description: 'Meniscus reading and measurement precision with cylinders' },
      { id: 'massWaterVolumetricPipet', name: 'Mass of Water in a Volumetric Pipet', url: 'https://cgphung-glitch.github.io/chemlab-animation/mass-of-water-beaker-pipet-demo.html', description: 'High precision volumetric pipet volumetric transfer' },
      { id: 'massSpectDemo', name: 'Mass Spectrometry Demo', url: 'https://cgphung-glitch.github.io/chemlab-animation/mass-spec-explorer.html', description: 'Deflection of charged ions through magnetic field analyzer' },
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: <TrendingUp className="w-4 h-4 mr-1.5 inline-block text-[#FFC72C]" />,
    items: [
      { id: 'kinematics', name: 'Kinematic Equations Practice', url: 'https://cgphung-glitch.github.io/physics/kinematics-trainer.html', description: '1D motion with constant acceleration problem generator' },
      { id: 'kinematicsDemo', name: 'Kinematics Demonstration', url: 'https://cgphung-glitch.github.io/physics/kinematics-demos.html', description: 'Visual position, velocity, and acceleration comparisons' },
      { id: 'kinematicsGraphs', name: 'Kinematics Graphs', url: 'https://cgphung-glitch.github.io/physics/kinematics-graph-lab.html', description: 'Interactive position-time and velocity-time graphing lab' },
      { id: 'vectors', name: 'Vectors', url: 'https://cgphung-glitch.github.io/physics/vector-practice.html', description: 'Vector addition, components, and trigonometry trainer' },
      { id: 'vectorLab', name: 'Vector Lab', url: 'https://cgphung-glitch.github.io/physics/vector-lab.html', description: 'Interactive graphical vector addition simulation' },
      { id: 'kinematic2DVectors', name: '2D Kinematics & Vectors Practice', url: 'https://cgphung-glitch.github.io/physics/2d-kinematics-vectors.html', description: 'Projectile motion and 2-dimensional vector kinematics' },
      { id: 'freebodydiagrams', name: 'Free-Body Diagrams', url: 'https://cgphung-glitch.github.io/physics/free-body-diagram.html', description: 'Identify and construct accurate force vectors on objects' },
      { id: 'dynamics', name: 'Dynamics & Forces Practice', url: 'https://cgphung-glitch.github.io/physics/dynamics-forces.html', description: 'Newton’s second law problem solver with tension & ramps' },
      { id: 'fricDragElas', name: 'Friction, Drag, and Elasticity', url: 'https://cgphung-glitch.github.io/physics/friction-drag-elasticity.html', description: 'Static & kinetic friction, terminal velocity, and Hooke’s law' },
      { id: 'cirMotion', name: 'Circular Motion & Gravitation', url: 'https://cgphung-glitch.github.io/physics/circular-motion.html', description: 'Centripetal acceleration, circular orbits, and universal gravity' },
      { id: 'workEnergy', name: 'Work, Energy, & Power', url: 'https://cgphung-glitch.github.io/physics/work-energy.html', description: 'Work-energy theorem, conservative forces, and mechanical energy' },
      { id: 'momentum', name: 'Momentum', url: 'https://cgphung-glitch.github.io/physics/momentum-practice.html', description: 'Elastic, inelastic collisions, and impulse calculations' },
      { id: 'staticTorque', name: 'Static Equilibrium & Torque', url: 'https://cgphung-glitch.github.io/physics/statics-torque.html', description: 'Torque balance, lever arms, and center of mass conditions' },
      { id: 'rotationMotion', name: 'Rotational Motion', url: 'https://cgphung-glitch.github.io/physics/rotational-motion.html', description: 'Rotational kinematics, moment of inertia, and angular momentum' },
    ]
  },
  {
    id: 'graphing',
    name: 'Graphing',
    icon: <Layers className="w-4 h-4 mr-1.5 inline-block text-[#FFC72C]" />,
    items: [
      { id: 'dataGrapher', name: 'Data Grapher', url: 'https://cgphung-glitch.github.io/graphing/data_grapher.html', description: 'Plot scientific experimental points with linear & polynomial fits' },
      { id: 'plotFunctions', name: 'Plot Functions', url: 'https://cgphung-glitch.github.io/graphing/plot-three-functions.html', description: 'Graph up to three simultaneous mathematical functions' },
      { id: 'plotPolar', name: 'Plot Polar Functions', url: 'https://cgphung-glitch.github.io/graphing/polar-plot.html', description: 'Polar coordinate curves r(θ) and trigonometric spirals' },
      { id: 'plot3dFunctions', name: 'Plot 3D Functions', url: 'https://cgphung-glitch.github.io/graphing/3d-grapher.html', description: 'Interactive 3D surface and multivariable function visualizer' },
      { id: 'ternarygraph', name: 'Ternary Grapher', url: 'https://cgphung-glitch.github.io/graphing/ternary-graph.html', description: 'Three-component phase diagram and mixture composition plotter' },
    ]
  }
];

export default function App() {
  const [activeItem, setActiveItem] = useState<TopicItem | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Header visibility state: true = visible, false = scrolled up & hidden
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(120);

  const headerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const touchStartY = useRef(0);
  const isInteractingWithMenu = useRef(false);

  // Measure header height dynamically
  const updateHeaderHeight = useCallback(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      if (height > 0) {
        setHeaderHeight(height);
      }
    }
  }, []);

  useEffect(() => {
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [updateHeaderHeight, mobileMenuOpen]);

  // Keep dropdown open states from causing accidental auto-hiding
  const hideHeader = useCallback(() => {
    // Only hide if mobile menu or dropdowns are not currently open and a module is active
    if (!openDropdown && !mobileMenuOpen && activeItem) {
      setIsHeaderVisible(false);
    }
  }, [openDropdown, mobileMenuOpen, activeItem]);

  const showHeader = useCallback(() => {
    setIsHeaderVisible(true);
  }, []);

  // Handle scroll events in container and window
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    const currentScrollY = container ? container.scrollTop : window.scrollY;
    const diff = currentScrollY - lastScrollY.current;

    // Scrolling DOWN: scroll up and hide header
    if (diff > 8 && currentScrollY > 20) {
      hideHeader();
    }
    // Scrolling UP: reveal header
    else if (diff < -8) {
      showHeader();
    }

    lastScrollY.current = Math.max(0, currentScrollY);
  }, [hideHeader, showHeader]);

  // Wheel listener: works even before scroll container hits scroll boundaries
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // If moving downwards by wheel
      if (e.deltaY > 6) {
        hideHeader();
      } else if (e.deltaY < -6) {
        showHeader();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', onWheel, { passive: true });
    }
    window.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      if (container) {
        container.removeEventListener('wheel', onWheel);
      }
      window.removeEventListener('wheel', onWheel);
    };
  }, [hideHeader, showHeader]);

  // Touch swipe listener for mobile scrolling
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const diff = touchStartY.current - currentY;

      // Swiped UP (moving finger up -> scrolling content down)
      if (diff > 18) {
        hideHeader();
      }
      // Swiped DOWN (moving finger down -> scrolling content up)
      else if (diff < -18) {
        showHeader();
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [hideHeader, showHeader]);

  // Mouse move near top edge: reveal header automatically when user hovers at very top
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 30) {
        showHeader();
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [showHeader]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node) &&
        !isInteractingWithMenu.current
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSelectTopic = (item: TopicItem) => {
    setActiveItem(item);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative w-screen h-screen flex flex-col bg-[#f8f9fa] overflow-hidden font-sans select-none antialiased">
      {/* 
        TOP HOVER TRIGGER ZONE
        When the header is hidden, moving mouse to the top 20px instantly reveals it 
      */}
      <div
        onMouseEnter={showHeader}
        className="fixed top-0 left-0 right-0 h-4 z-40 cursor-pointer pointer-events-auto"
        aria-hidden="true"
      />

      {/* 
        FLOATING RETRIEVE BUTTON / STATUS PILL (Shown when top panel is scrolled up and hidden) 
      */}
      <div
        className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform pointer-events-auto ${
          !isHeaderVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-6 scale-95 pointer-events-none'
        }`}
      >
        <button
          onClick={showHeader}
          title="Click to reveal menu (or scroll up)"
          className="flex items-center gap-2 px-4 py-1.5 bg-[#005A36] text-[#FFC72C] rounded-full shadow-lg border-2 border-[#FFC72C]/40 text-xs sm:text-sm font-bold tracking-wide hover:bg-[#00482B] hover:shadow-xl transition-all duration-200 cursor-pointer"
        >
          <ChevronDown className="w-4 h-4 text-[#FFC72C] animate-bounce" />
          <span>Show Menu</span>
          {activeItem && (
            <span className="hidden md:inline-block max-w-[200px] truncate text-white/90 font-normal pl-1 border-l border-white/20">
              {activeItem.name}
            </span>
          )}
        </button>
      </div>

      {/* 
        TOP PANEL (HEADER)
        Smoothly scrolls up (-100%) and hides when the user scrolls down 
      */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 bg-[#005A36] text-[#FFC72C] px-3 sm:px-6 py-3.5 text-center shadow-md transition-transform duration-300 ease-in-out ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Header Title Row */}
          <div className="w-full flex items-center justify-between relative mb-1">
            {/* Left placeholder for balanced centering */}
            <div className="w-8 sm:w-24"></div>

            {/* University Title & Department */}
            <div className="text-center px-2">
              <h1 className="text-lg sm:text-2xl font-bold tracking-wide text-white drop-shadow-sm">
                Methodist University
              </h1>
              <h2 className="text-xs sm:text-sm font-medium text-[#FFC72C] opacity-95">
                Department of Chemistry and Physical Science
              </h2>
            </div>

            {/* Right: Manual quick collapse button & Mobile menu toggle */}
            <div className="w-8 sm:w-24 flex items-center justify-end gap-1.5">
              <button
                onClick={hideHeader}
                title="Scroll up and hide menu"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-[#FFC72C]/20 hover:bg-[#FFC72C]/30 text-[#FFC72C] px-2.5 py-1 rounded transition-colors"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Hide</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden bg-[#FFC72C] text-[#005A36] p-1.5 rounded font-bold text-xs flex items-center justify-center shadow"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Desktop Navigation Container */}
          <nav
            id="mainNav"
            className="hidden md:flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-2"
          >
            {CATEGORIES.map((category) => {
              const isOpen = openDropdown === category.id;
              const hasActiveChild = category.items.some((it) => it.id === activeItem?.id);

              return (
                <div key={category.id} className="relative group">
                  <button
                    onClick={(e) => toggleDropdown(category.id, e)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded transition-all duration-200 cursor-pointer shadow-sm ${
                      hasActiveChild
                        ? 'bg-white text-[#005A36] ring-2 ring-[#FFC72C]'
                        : 'bg-[#FFC72C] text-[#005A36] hover:bg-white hover:text-[#005A36]'
                    }`}
                  >
                    {category.name}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 mt-1.5 w-72 max-h-[380px] overflow-y-auto bg-white rounded-md shadow-2xl border border-gray-200 z-50 py-1 divide-y divide-gray-100 text-left animate-in fade-in slide-in-from-top-1 duration-150"
                    >
                      {category.items.map((item) => {
                        const isSelected = activeItem?.id === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelectTopic(item)}
                            className={`w-full px-3.5 py-2.5 text-xs text-left flex flex-col gap-0.5 transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#005A36] text-[#FFC72C] font-semibold'
                                : 'text-gray-800 hover:bg-gray-100 hover:text-[#005A36]'
                            }`}
                          >
                            <span className="font-semibold">{item.name}</span>
                            {item.description && (
                              <span
                                className={`text-[10px] line-clamp-1 ${
                                  isSelected ? 'text-white/80' : 'text-gray-500'
                                }`}
                              >
                                {item.description}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Navigation Collapsible List */}
          {mobileMenuOpen && (
            <div className="md:hidden w-full mt-3 bg-[#00482B] rounded-lg p-2.5 border border-[#FFC72C]/30 max-h-[70vh] overflow-y-auto text-left flex flex-col gap-2">
              {CATEGORIES.map((category) => (
                <div key={category.id} className="border-b border-[#005A36] pb-1.5 last:border-b-0">
                  <button
                    onClick={(e) => toggleDropdown(category.id, e)}
                    className="w-full flex items-center justify-between text-xs font-bold text-[#FFC72C] py-1.5 px-2 bg-[#003821] rounded"
                  >
                    <span>{category.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        openDropdown === category.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openDropdown === category.id && (
                    <div className="mt-1 pl-2 flex flex-col gap-1">
                      {category.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSelectTopic(item)}
                          className={`text-left text-xs py-1.5 px-2 rounded ${
                            activeItem?.id === item.id
                              ? 'bg-[#FFC72C] text-[#005A36] font-bold'
                              : 'text-white/90 hover:bg-[#005A36]'
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* 
        MAIN CONTENT / LOWER PANEL DISPLAY CANVAS
        Dynamically adjusts top padding when header hides/shows so the content smoothly expands 
      */}
      <main
        id="canvasContainer"
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          paddingTop: isHeaderVisible ? `${headerHeight}px` : '0px',
        }}
        className="flex-1 w-full h-full relative flex flex-col overflow-y-auto transition-all duration-300 ease-in-out bg-[#f8f9fa]"
      >
        {activeItem ? (
          <div className="flex-1 w-full h-full flex flex-col min-h-0 relative">
            {/* Thin Subheader Utility Bar when an active module is loaded */}
            <div className="w-full bg-gray-100 border-b border-gray-200 px-3 py-1.5 flex items-center justify-between text-xs text-gray-700 flex-shrink-0 z-20">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="font-bold text-[#005A36] truncate">{activeItem.name}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsHeaderVisible(!isHeaderVisible)}
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-white hover:bg-gray-200 text-gray-700 border border-gray-300 flex items-center gap-1 transition-colors cursor-pointer"
                  title={isHeaderVisible ? "Scroll up / Hide Menu" : "Show Menu"}
                >
                  {isHeaderVisible ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  <span>{isHeaderVisible ? 'Hide Menu' : 'Show Menu'}</span>
                </button>
                <button
                  onClick={() => {
                    const iframe = document.getElementById('displayCanvas') as HTMLIFrameElement;
                    if (iframe) iframe.src = activeItem.url;
                  }}
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-white hover:bg-gray-200 text-gray-700 border border-gray-300 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Reload current simulation"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reload</span>
                </button>
                <a
                  href={activeItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-white hover:bg-gray-200 text-gray-700 border border-gray-300 flex items-center gap-1 transition-colors"
                  title="Open simulation in new browser tab"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="hidden sm:inline">New Tab</span>
                </a>
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-white hover:bg-gray-200 text-gray-700 border border-gray-300 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Close current module"
                >
                  <X className="w-3 h-3" />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>
            </div>

            {/* Module Iframe */}
            <div className="flex-1 w-full h-full min-h-0 relative">
              <iframe
                id="displayCanvas"
                src={activeItem.url}
                title={activeItem.name}
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        ) : (
          /* LOWER PANEL: PROMPT TO CHOOSE A MODULE FROM THE MENU */
          <div className="flex-1 w-full h-full flex flex-col items-center justify-center p-8 text-center select-none">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-600 tracking-wide">
              Choose a Module from the Menu
            </h2>
          </div>
        )}
      </main>
    </div>
  );
}
