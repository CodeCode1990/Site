import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Local SVGs (adjust path if needed)
import bigquery from "../assets/icons/bigquery.svg";
import gitIcon from "../assets/icons/git.svg";
import googleColab from "../assets/icons/google-colab.svg";
import jupyter from "../assets/icons/jupyter-seeklogo.svg";
import looker from "../assets/icons/looker.svg";
import matplotlibIcon from "../assets/icons/matplotlib.svg";
import m365 from "../assets/icons/Microsoft-365.svg";
import mongodbIcon from "../assets/icons/mongodb.svg";
import msOffice from "../assets/icons/MS_Office.svg";
import mssql from "../assets/icons/MSSQL.svg";
import mysqlIcon from "../assets/icons/mysql.svg";
import numpyIcon from "../assets/icons/numpy.svg";
import pandasIcon from "../assets/icons/pandas.svg";
import postgresqlIcon from "../assets/icons/postgresql.svg";
import powerBi from "../assets/icons/power-bi.svg";
import pycharmIcon from "../assets/icons/pycharm.svg";
import pythonIcon from "../assets/icons/python.svg";
import rIcon from "../assets/icons/r.svg";
import seabornIcon from "../assets/icons/seaborn.svg";
import sharepointIcon from "../assets/icons/sharepoint.svg";
import tableauIcon from "../assets/icons/tableau.svg";
import vscodeIcon from "../assets/icons/vscode.svg";

// Groups + icons
const skillGroups = [
  {
    name: "Tools",
    items: [
      { label: "Git", src: gitIcon },
      { label: "VS Code", src: vscodeIcon },
      { label: "PyCharm", src: pycharmIcon },
      { label: "Jupyter", src: jupyter },
      { label: "Google Colab", src: googleColab },
    ],
  },
  {
    name: "Languages",
    items: [
      { label: "Python", src: pythonIcon },
      { label: "R", src: rIcon },
    ],
  },
  {
    name: "Databases",
    items: [
      { label: "PostgreSQL", src: postgresqlIcon },
      { label: "MySQL", src: mysqlIcon },
      { label: "MongoDB", src: mongodbIcon },
      { label: "MS SQL Server", src: mssql },
      { label: "BigQuery", src: bigquery },
    ],
  },
  {
    name: "Visualization",
    items: [
      { label: "Tableau", src: tableauIcon },
      { label: "Power BI", src: powerBi },
      { label: "Looker Studio", src: looker },
    ],
  },
  {
    name: "Packages",
    items: [
      { label: "Pandas", src: pandasIcon },
      { label: "NumPy", src: numpyIcon },
      { label: "Seaborn", src: seabornIcon },
      { label: "Matplotlib", src: matplotlibIcon },
    ],
  },
  {
    name: "Productivity",
    items: [
      { label: "Microsoft 365", src: m365 },
      { label: "MS Office", src: msOffice },
      { label: "SharePoint", src: sharepointIcon },
    ],
  },
];

const FLIP_MS = 2400;             // normal auto-flip delay
const HOLD_AFTER_CLICK_MS = 4000; // hold for 4s after user click

const SkillsFlipShowcase = () => {
  const [idx, setIdx] = useState(0);

  // Timer machinery (preserves remaining time and supports hover pause)
  const timerRef = useRef(null);
  const nextDueRef = useRef(null);
  const remainingRef = useRef(null);
  const currentDelayRef = useRef(FLIP_MS);
  const hoveringRef = useRef(false);

  const current = skillGroups[idx];

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const advance = useCallback(() => {
    currentDelayRef.current = FLIP_MS; // subsequent cycles use normal speed
    setIdx((i) => (i + 1) % skillGroups.length);
  }, []);

  const schedule = useCallback(
    (delay = currentDelayRef.current) => {
      clearTimer();
      const d = typeof delay === "number" ? delay : FLIP_MS;

      // If hovering, don't run a ticking timer; resume later with full remaining time
      if (hoveringRef.current) {
        remainingRef.current = d;
        return;
      }

      nextDueRef.current = Date.now() + d;
      timerRef.current = window.setTimeout(advance, d);
    },
    [advance, clearTimer]
  );

  const pauseTimer = useCallback(() => {
    hoveringRef.current = true;
    if (timerRef.current && nextDueRef.current) {
      remainingRef.current = Math.max(0, nextDueRef.current - Date.now());
    }
    clearTimer();
  }, [clearTimer]);

  const resumeTimer = useCallback(() => {
    hoveringRef.current = false;
    const d = remainingRef.current ?? currentDelayRef.current ?? FLIP_MS;
    remainingRef.current = null;
    schedule(d > 0 ? d : FLIP_MS);
  }, [schedule]);

  // Auto schedule on index change
  useEffect(() => {
    schedule(currentDelayRef.current);
    return clearTimer;
  }, [idx, schedule, clearTimer]);

  // User picks a group from the left pills (hold 4s, then continue)
  const handlePick = useCallback((newIdx) => {
    currentDelayRef.current = HOLD_AFTER_CLICK_MS;
    setIdx(newIdx); // scheduling happens in useEffect
  }, []);

  // Clicking an icon: hold current group for 4s (even if idx doesn't change)
  const handleHoldCurrent = useCallback(() => {
    currentDelayRef.current = HOLD_AFTER_CLICK_MS;
    if (hoveringRef.current) {
      // while hovering, remember to hold for 4s once mouse leaves
      remainingRef.current = HOLD_AFTER_CLICK_MS;
    } else {
      schedule(HOLD_AFTER_CLICK_MS);
    }
  }, [schedule]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
  

      {/* 2. Vertical Stack: Group Name -> Pills -> Icons */}
      <div className="flex flex-col items-center gap-10">
        
        {/* Top: Flip text and Pills */}
        <div className="flex flex-col items-center w-full">


          <div className="h-[64px] relative w-full flex justify-center" style={{ perspective: 900 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ rotateX: -90, opacity: 0, y: -8 }}
                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                exit={{ rotateX: 90, opacity: 0, y: 8 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="origin-bottom text-4xl md:text-5xl font-extrabold text-cyan-400 whitespace-nowrap"
                aria-live="polite"
              >
                {current.name}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Manual controls (pills) - Centered below the group name */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {skillGroups.map((g, i) => (
              <button
                key={g.name}
                onClick={() => handlePick(i)}
                className={`px-3 py-1 rounded-full border text-xs font-mono transition-colors ${
                  i === idx
                    ? "border-cyan-500 text-cyan-400 bg-cyan-500/10"
                    : "border-gray-700 text-gray-400 hover:border-cyan-500/40"
                }`}
                aria-label={`Show ${g.name}`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom: Icons for the current group - Centered Grid */}
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 justify-items-center"
              onMouseEnter={pauseTimer}
              onMouseLeave={resumeTimer}
              onFocusCapture={pauseTimer}
              onBlurCapture={resumeTimer}
            >
              {current.items.map((it, i) => (
                <motion.button
                  type="button"
                  key={it.label}
                  onClick={handleHoldCurrent}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleHoldCurrent();
                  }}
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="flex flex-col items-center gap-2 focus:outline-none"
                >
                  {/* Uniform large but proportional icons */}
                  <div
                    className="w-24 h-24 rounded-xl bg-gray-800/50 border border-gray-700 
                              flex items-center justify-center cursor-pointer 
                              hover:scale-105 hover:border-cyan-500/60 
                              hover:shadow-[0_0_20px_rgba(6,182,212,0.45)] 
                              transition-all duration-300"
                  >
                    <img
                      src={it.src}
                      alt={it.label}
                      loading="lazy"
                      className="w-14 h-14 object-contain object-center"
                      style={{ maxWidth: "64px", maxHeight: "64px" }}
                    />
                  </div>
                  <span className="text-sm text-gray-300 font-medium mt-1">{it.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SkillsFlipShowcase;