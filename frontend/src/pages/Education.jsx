import React from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  ExternalLink,
  Star,
  FileCheck,
  Users,
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { mockEducation, mockCertifications } from '../data/mock';


// CRA sets this to "/" in dev, and to "/Site" for production based on .env/PACKAGE.json
const BASE_URL = process.env.PUBLIC_URL || '/';

const assetUrl = (path) => `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
const file = (name) => assetUrl(`Certificates/${encodeURIComponent(name)}`);

/* Smooth, fully transparent vertical count (1 -> target) */
const CountRoller = ({
  target = 7,
  seconds = 2.5,
  em = 1.3,
  nudgeY = 7,
  className = '',
}) => {
  const containerRef = React.useRef(null);
  const [rowH, setRowH] = React.useState(0);

  React.useLayoutEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const measure = () => {
      const h = el.getBoundingClientRect().height || 0;
      if (h) setRowH(h);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const digits = React.useMemo(() => Array.from({ length: target }, (_, i) => i + 1), [target]);

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex align-baseline items-center overflow-hidden min-w-[2ch] select-none ${className}`}
      style={{
        fontSize: `calc(1em * ${em})`,
        lineHeight: 1,
        height: '1em',
        top: nudgeY,
        background: 'transparent',
        mixBlendMode: 'normal',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        boxShadow: 'none',
        isolation: 'isolate',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
      aria-hidden="true"
    >
      <motion.div
        key={rowH}
        initial={{ y: 0 }}
        animate={{ y: rowH ? -(target - 1) * rowH : 0 }}
        transition={{ duration: seconds, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 w-full will-change-transform"
        style={{
          background: 'transparent',
          mixBlendMode: 'normal',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          boxShadow: 'none',
        }}
      >
        {digits.map((d) => (
          <div
            key={d}
            style={{
              height: rowH || '1em',
              background: 'transparent',
              mixBlendMode: 'normal',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              boxShadow: 'none',
            }}
            className="flex items-center justify-center font-mono tabular-nums leading-none"
          >
            {d}
          </div>
        ))}
      </motion.div>
    </span>
  );
};

const Education = () => {
  // Left subheadings + right-panel content
  const items = [
      {
        label: 'Micro‑Certs & Badges',
        headingSuffix: 'Micro‑Certs and Badges achieved',
        countTarget: 8,
        icon: Award,
        color: 'text-amber-400',
        rgb: '251,191,36', // amber-400
        bullets: [
  {
    text: 'Micro‑Certificates from Uppsala Monitoring Centre',
    href: assetUrl('Certificates/Pharmacovigilance-UMC-certificates.pdf'),
    children: [
      'Introduction to Pharmacovigilance',
      'Signal Detection',
      'Signal Assessment',
      'Causality Assessment',
      'Statistical Reasoning & Algorithms in Pharmacovigilance',
    ],
  },
  {
    text: 'Adverse Drug Reactions: Reporting makes medicines safer (SCOPE Joint Action)',
    href: assetUrl('Certificates/SCOPE_Certificate.pdf'),
  },
  {
    text: 'Tri‑Council Policy Statement: Ethical Conduct for Research Involving Humans (TCPS 2: CORE)',
    href: assetUrl('Certificates/tcps2_core_certificate.pdf'),
  },
  {
    text: 'TESTDOME‑SQL Badge',
    href: 'https://www.testdome.com/certificates/cd984a3167914741a13f528c34c35295',
    external: true,
  },
],
    },
    {
      label: 'SOP Authored and Reviewed',
      headingSuffix: 'SOP Authored and Reviewed',
      countTarget: 15,
      icon: FileCheck,
      color: 'text-cyan-400',
      rgb: '34,211,238', // cyan-400
      bullets: [
        'Authored 11 Standard Operating Procedures (SOPs) and Work Instructions (WIs) to ensure compliance with regulatory standards and improve operational efficiency.',
        'Reviewed 7 SOP and WI documents, contributing to documentation creation and maintenance to facilitate consistent process adherence and quality control.'
      ],
    },
    {
      label: 'Audits',
      headingSuffix: 'Audits Faced',
      countTarget: 3,
      icon: Star,
      color: 'text-emerald-400',
      rgb: '74,222,128', // emerald-400
      bullets: [
        'Successfully managed and participated in 2 third-party vendor audits and 1 FDA pharmacovigilance Audit, consistently achieving compliance with no critical or major findings.',
        'Demonstrated strong adherence to regulatory standards through flawless audit outcomes, ensuring ongoing quality and process integrity.',
      ],
    },
    {
      label: 'Research & Reading',
      icon: BookOpen,
      color: 'text-pink-400',
      rgb: '96,165,250', // blue-400
      bullets: [
        'Deep dives into papers, books, and technical blogs—turning theory into practical heuristics and reusable patterns.',
      ],
    },
    
  ];

  const [activeIndex, setActiveIndex] = React.useState(null);
  const panelId = 'lp-desc-panel';
  const active = activeIndex !== null ? items[activeIndex] : null;

  return (
    <div className="min-h-screen pt-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full px-4 py-2 backdrop-blur-sm border border-cyan-500/30 mb-6">
            <GraduationCap className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            <span className="text-sm font-mono text-cyan-400 tracking-wider">EDUCATION & GROWTH</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Learning <span className="text-cyan-400">Journey</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my educational background, certifications, and
            continuously evolving expertise in data science and analytics.
          </p>
        </motion.div>

        {/* Education Timeline */}
        <section className="mb-20">
          <motion.h2
            className="text-xl font-bold text-white mb-8 flex items-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-flex items-center justify-center mr-3"
              whileHover={{ rotate: -12, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 12 }}
              aria-hidden="true"
            >
              <GraduationCap className="w-8 h-8 text-cyan-400" />
            </motion.span>
            Academic Background
          </motion.h2>

          <div className="space-y-8">
            {mockEducation.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 p-6 hover:bg-gray-800/50 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                      <p className="text-cyan-400 font-medium mb-1">{edu.institution}</p>
                      <p className="text-gray-400 text-sm">{edu.location}</p>
                    </div>
                    <div className="text-right mt-4 md:mt-0">
                      <div className="flex items-center justify-end space-x-2 mb-2">
                        <Calendar className="w-4 h-4 text-gray-400" aria-hidden="true" />
                        <span className="text-gray-300 font-mono text-sm">{edu.period}</span>
                      </div>
                      {edu.gpa && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          GPA: {edu.gpa}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-4">{edu.description}</p>

                  {edu.achievements && (
                    <div>
                      <h4 className="text-sm font-mono uppercase tracking-wider text-cyan-400 mb-2">
                        Key Achievements:
                      </h4>
                      <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-20">
          <motion.h2
            className="text-3xl font-bold text-white mb-8 flex items-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-flex items-center justify-center mr-3"
              whileHover={{ rotate: 12, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 12 }}
              aria-hidden="true"
            >
              <Award className="w-8 h-8 text-green-400" />
            </motion.span>
            Professional Certifications
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {mockCertifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 p-6 hover:bg-gray-800/50 transition-all duration-300 group h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {cert.name}
                      </h3>
                      <p className="text-cyan-400 font-medium mb-1">{cert.issuer}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Calendar className="w-3 h-3" aria-hidden="true" />
                        <span className="font-mono">{cert.date}</span>
                        {cert.expiry && (
                          <>
                            <span>•</span>
                            <span className="font-mono">Expires {cert.expiry}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-sm flex items-center justify-center">
                      <Award className="w-6 h-6 text-green-400" aria-hidden="true" />
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">
                    {cert.description}
                  </p>

                  {cert.skills && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-sm font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {cert.credentialUrl && (
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 hover:from-green-500/30 hover:to-cyan-500/30 border border-green-500/30 text-green-400 font-mono text-xs mt-auto"
                    >
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View credential: ${cert.name}`}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        VIEW CREDENTIAL
                      </a>
                    </Button>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Learning Philosophy */}
        <section className="mb-20">
          <motion.div
            className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <motion.span
                className="inline-flex items-center justify-center mb-6"
                whileHover={{ rotate: -10, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                aria-hidden="true"
              >
                <BookOpen className="w-12 h-12 text-purple-400 mx-auto" />
              </motion.span>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Continuous <span className="text-cyan-400">Learning</span> Philosophy
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                In the rapidly evolving field of data science, staying current with emerging
                technologies and methodologies is essential. I'm committed to continuous learning
                through courses, research, and hands-on experimentation.
              </p>
            </div>

            {/* Layout: Left vertical subheadings / Right floating text panel */}
            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(260px,0.9fr)_minmax(420px,1.1fr)] lg:items-stretch">
              {/* Left column */}
              <div className="space-y-2">
                <ul className="space-y-1.5">
                  {items.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive = activeIndex === idx;
                    return (
                      <li key={idx}>
                        <motion.button
                          type="button"
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onMouseEnter={() => setActiveIndex(idx)}
                          onFocus={() => setActiveIndex(idx)}
                          onClick={() => setActiveIndex(idx)} // sticky selection
                          aria-pressed={isActive}
                          aria-controls={panelId}
                          className={`group w-full flex items-center gap-3 rounded-md px-2.5 py-2.5 text-left transition
                                      border-l-2 ${isActive ? 'border-cyan-500/70 bg-gray-800/30' : 'border-transparent hover:border-cyan-500/40'}
                                      focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40`}
                        >
                          <span
                            className="inline-flex items-center justify-center rounded-md bg-gray-800/70 p-2 shrink-0
                                       transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6"
                            aria-hidden="true"
                          >
                            <Icon
                              className={`w-5 h-5 ${isActive ? item.color : 'text-gray-300'} transition-colors`}
                            />
                          </span>
                          <span
                            className={`text-lg font-bold ${isActive ? item.color : 'text-gray-300'} transition-colors`}
                          >
                            {item.label}
                          </span>
                        </motion.button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Right column: invisible floating text panel */}
              <div className="w-full">
                <div
                  id={panelId}
                  role="region"
                  aria-live="polite"
                  className="relative w-full h-full p-4 lg:p-6 flex items-center justify-center"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex ?? 'placeholder'}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="w-full max-w-2xl"
                    >
                      {active ? (
                        <div className="text-left not-prose">
                          {/* Colored heading with softer glow and optional counter */}
                          {typeof active.countTarget === 'number' ? (
                            <h3
                              className={`text-xl md:text-1.5xl font-bold flex items-baseline gap-2 ${active.color} bg-transparent`}
                              style={{
                                textShadow: `0 0 6px rgba(${active.rgb}, 0.20), 0 0 12px rgba(${active.rgb}, 0.1)`,
                              }}
                            >
                              <CountRoller target={active.countTarget} seconds={2.5} em={1.35} nudgeY={6} />
                              <span className="bg-transparent">{active.headingSuffix ?? active.heading ?? active.label}</span>
                            </h3>
                          ) : (
                            <h3
                              className={`text-xl md:text-2xl font-bold ${active.color} bg-transparent`}
                              style={{
                                textShadow: `0 0 6px rgba(${active.rgb}, 0.20), 0 0 12px rgba(${active.rgb}, 0.1)`,
                              }}
                            >
                              {active.heading ?? active.label}
                            </h3>
                          )}

                          {/* Bullets (support strings, links, and nested children) */}
<ul className="mt-3 list-disc pl-5 text-gray-300 text-sm leading-relaxed space-y-1.5">
  {(active.bullets || []).map((pt, i) => {
    // Simple string bullet
    if (typeof pt === 'string') {
      return (
        <li key={i} className="marker:text-gray-500">
          {pt}
        </li>
      );
    }

    // Object bullet with optional link and nested children
    const isExternal = pt.external || (pt.href || '').startsWith('http');

    return (
      <li key={i} className="marker:text-gray-500">
        {pt.href ? (
          <a
            href={pt.href}
            target="_blank"
            rel={isExternal ? 'noopener noreferrer' : 'noopener'}
            className="underline decoration-dotted decoration-gray-500/60 hover:decoration-current hover:text-gray-100 transition-colors"
            aria-label={pt.text}
          >
            {pt.text}
          </a>
        ) : (
          pt.text
        )}

        {/* nested children (sub-bullets) */}
        {Array.isArray(pt.children) && pt.children.length > 0 && (
          <ul className="mt-1.5 list-[circle] pl-5 text-gray-400 space-y-1">
            {pt.children.map((child, j) => {
              if (typeof child === 'string') {
                return (
                  <li key={j} className="marker:text-gray-500">
                    {child}
                  </li>
                );
              }
              const childExternal = child.external || (child.href || '').startsWith('http');
              return (
                <li key={j} className="marker:text-gray-500">
                  {child.href ? (
                    <a
                      href={child.href}
                      target="_blank"
                      rel={childExternal ? 'noopener noreferrer' : 'noopener'}
                      className="underline decoration-dotted decoration-gray-500/60 hover:decoration-current hover:text-gray-200 transition-colors"
                    >
                      {child.text}
                    </a>
                  ) : (
                    child.text
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  })}
</ul>
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm text-center">
                          Hover, focus, or tap a subheading on the left to see details here.
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-gray-700 p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Always <span className="text-cyan-400">Growing</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Stay updated with my latest certifications and skill developments in
              data science, analytics, and emerging technologies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-mono px-8 py-3 rounded-sm transition-all duration-300 hover:scale-105">
                VIEW LEARNING PATH
              </Button>
              <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-mono px-8 py-3 rounded-sm">
                SKILL ROADMAP
              </Button>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default Education;