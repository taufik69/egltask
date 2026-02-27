"use client";
import { useState, useEffect, useRef } from "react";

// ── Animated Gauge ─────────────────────────────────────────────────────────
function KeywordMeter() {
  const dirRef = useRef(1);
  const valRef = useRef(15);
  const [value, setValue] = useState(15);

  useEffect(() => {
    const id = setInterval(() => {
      valRef.current += dirRef.current * (Math.random() * 1.2 + 0.4);
      if (valRef.current >= 92) dirRef.current = -1;
      if (valRef.current <= 8) dirRef.current = 1;
      setValue(Math.round(valRef.current));
    }, 40);
    return () => clearInterval(id);
  }, []);

  const polarToXY = (cx, cy, r, deg) => {
    const rad = ((deg - 180) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const arcPath = (cx, cy, r, startDeg, endDeg) => {
    const s = polarToXY(cx, cy, r, startDeg);
    const e = polarToXY(cx, cy, r, endDeg);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  const needleDeg = (value / 100) * 180 - 90;

  return (
    <div className="bg-white rounded-2xl border border-[#deedea] px-5 pt-4 pb-3 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-[11px] text-[#595959] font-normal">
          Keyword Attribution
        </span>
        <span className="bg-[#1c9876] text-white text-[10px] font-semibold rounded px-1.5 py-[2px]">
          Green Keyword Manager
        </span>
      </div>

      {/* SVG Gauge */}
      <svg viewBox="0 0 200 112" className="w-full overflow-visible block">
        <defs>
          <radialGradient id="meterGlow" cx="50%" cy="100%" r="55%">
            <stop offset="0%" stopColor="#5cd6ba" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#5cd6ba" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path
          d={arcPath(100, 105, 70, 0, 45)}
          fill="none"
          stroke="#ef4444"
          strokeWidth={11}
          strokeLinecap="round"
        />
        <path
          d={arcPath(100, 105, 70, 46, 85)}
          fill="none"
          stroke="#f97316"
          strokeWidth={11}
          strokeLinecap="round"
        />
        <path
          d={arcPath(100, 105, 70, 86, 125)}
          fill="none"
          stroke="#eab308"
          strokeWidth={11}
          strokeLinecap="round"
        />
        <path
          d={arcPath(100, 105, 70, 126, 180)}
          fill="none"
          stroke="#1c9876"
          strokeWidth={11}
          strokeLinecap="round"
        />

        <ellipse cx="100" cy="105" rx="62" ry="35" fill="url(#meterGlow)" />

        {[
          { l: "10", d: 10 },
          { l: "20", d: 36 },
          { l: "40", d: 72 },
          { l: "60", d: 108 },
          { l: "80", d: 144 },
          { l: "100", d: 170 },
        ].map(({ l, d }) => {
          const p = polarToXY(100, 105, 86, d);
          return (
            <text
              key={l}
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              fontSize={7}
              fill="#aaa"
            >
              {l}
            </text>
          );
        })}

        {/* Needle */}
        <g
          transform={`rotate(${needleDeg}, 100, 105)`}
          style={{ transition: "transform 60ms linear" }}
        >
          <line
            x1="100"
            y1="105"
            x2="100"
            y2="40"
            stroke="#171717"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <circle cx="100" cy="105" r={7} fill="#171717" />
          <circle cx="100" cy="105" r={3.5} fill="#fff" />
        </g>
      </svg>
    </div>
  );
}

// ── Attribution Bar ────────────────────────────────────────────────────────
function AttributionBar() {
  const dirRef = useRef(1);
  const valRef = useRef(20);
  const [fill, setFill] = useState(20);

  useEffect(() => {
    const id = setInterval(() => {
      valRef.current += dirRef.current * 0.35;
      if (valRef.current >= 100) dirRef.current = -1;
      if (valRef.current <= 0) dirRef.current = 1;
      setFill(valRef.current);
    }, 30);
    return () => clearInterval(id);
  }, []);

  const score = Math.round(fill * 0.64);

  return (
    <div className="bg-white rounded-2xl border border-[#deedea] px-[18px] py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      {/* Top row */}
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-base font-bold text-[#171717]">
          Attribution Match
        </span>
        <span className="text-[22px] font-bold text-[#171717]">{score}</span>
      </div>

      {/* Bar track */}
      <div className="relative h-3.5 rounded-full bg-[#f0f2f1] overflow-hidden">
        {/* faded full-width gradient */}
        <div
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            background:
              "linear-gradient(90deg,#ef4444 0%,#f97316 25%,#eab308 50%,#84cc16 72%,#1c9876 100%)",
          }}
        />
        {/* live fill */}
        <div
          className="absolute top-0 left-0 bottom-0 rounded-full"
          style={{
            width: `${fill}%`,
            background:
              "linear-gradient(90deg,#ef4444 0%,#f97316 25%,#eab308 50%,#84cc16 72%,#1c9876 100%)",
            backgroundSize: "340px 100%",
            transition: "width 30ms linear",
          }}
        />
        {/* gloss */}
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-white/20 pointer-events-none" />
      </div>

      {/* Tick labels */}
      <div className="flex justify-between mt-1 px-px">
        {["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"].map(
          (t) => (
            <span key={t} className="text-[7.5px] text-[#aaa]">
              {t}
            </span>
          ),
        )}
      </div>

      {/* Meta */}
      <div className="flex gap-5 mt-2.5">
        <span className="text-[13px] text-[#595959]">
          Coverage: <strong className="text-[#171717]">75%</strong>
        </span>
        <span className="text-[13px] text-[#595959]">
          Tagging completeness: <strong className="text-[#171717]">62%</strong>
        </span>
      </div>
    </div>
  );
}

// ── Hero Section ───────────────────────────────────────────────────────────
export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
  }, []);

  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{ background: "linear-gradient(180deg, #e6eeec, #ffffff)" }}
    >
      {/* Background teal blob */}
      <div
        className="pointer-events-none absolute -top-28 -right-28 w-[480px] h-[480px] rounded-full opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(92,214,186,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── CONTAINER ── */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ══ LEFT COPY ══════════════════════════════════════════════════ */}
          <div
            className="flex flex-col"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)",
            }}
          >
            {/* Title */}
            <h1
              className="text-[55px] font-bold text-[#171717] leading-[1.1] mb-5"
              style={{ fontFamily: "var(--font-main, sans-serif)" }}
            >
              Your SEO{" "}
              <span className="relative inline-block">
                Swiss Army
                <svg
                  viewBox="0 0 220 8"
                  className="absolute -bottom-1 left-0 w-full h-2"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q27 1 55 5 Q82 9 110 5 Q137 1 165 5 Q192 9 220 5"
                    stroke="#1c9876"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              Knife,
              <br />
              Right In The Browser.{" "}
              <span role="img" aria-label="fire">
                🔥
              </span>
            </h1>

            {/* Description */}
            <p
              className="text-base font-normal text-[#595959] leading-[1.7] max-w-[400px] mb-8"
              style={{ fontFamily: "var(--font-secondary, sans-serif)" }}
            >
              One click reveals the SEO score, traffic, backlinks, and authority
              of any website you visit. Perfect for link building, content
              research, and competitive analysis.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-5">
              {/* Add to Chrome */}
              <button
                className="bg-[#1c9876] text-white rounded-full px-7 py-3.5 text-base font-semibold border-none cursor-pointer transition-all duration-150 hover:scale-[1.04] active:scale-[0.97]"
                style={{
                  boxShadow: "0 4px 20px rgba(28,152,118,0.3)",
                  fontFamily: "var(--font-secondary, sans-serif)",
                }}
              >
                Add to Chrome
              </button>

              {/* Watch Video */}
              <button
                className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer text-base font-medium text-[#171717] transition-opacity duration-150 hover:opacity-70"
                style={{ fontFamily: "var(--font-secondary, sans-serif)" }}
              >
                <span className="w-10 h-10 rounded-full bg-[#171717] flex items-center justify-center shrink-0">
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
                    <path d="M1 1l10 6-10 6V1z" />
                  </svg>
                </span>
                Watch Video
              </button>
            </div>
          </div>

          {/* ══ RIGHT VISUALS ══════════════════════════════════════════════ */}
          <div
            className="relative flex items-center justify-center"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(28px)",
              transition:
                "opacity 0.9s 0.15s cubic-bezier(.22,1,.36,1), transform 0.9s 0.15s cubic-bezier(.22,1,.36,1)",
            }}
          >
            {/* Attribution Bar — top, overlapping the image */}
            <div
              className="absolute -top-10 right-0 w-[95%] z-10"
              style={{ animation: "floatA 4s ease-in-out infinite" }}
            >
              <AttributionBar />
            </div>

            {/* Hero image — actual size, no stretching */}
            <div className="w-full pt-12 pb-14">
              <img
                src="/hero.png"
                alt="Extension preview"
                className="w-full h-auto object-contain block"
              />
            </div>

            {/* Keyword Meter — bottom left, overlapping the image */}
            <div
              className="absolute -bottom-8 left-[4%] w-[55%] z-10"
              style={{ animation: "floatD 4.2s ease-in-out infinite" }}
            >
              <KeywordMeter />
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes floatA {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-7px); }
        }
        @keyframes floatD {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
}
