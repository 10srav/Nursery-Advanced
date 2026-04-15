'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';
import type { PlantVariant } from '@/lib/constants';

interface PlantPotProps {
  variant: PlantVariant;
  className?: string;
  tone?: 'terracotta' | 'sand' | 'forest';
}

const POT_PALETTES = {
  terracotta: { pot: '#C8754B', potDark: '#8F4A2B', potRim: '#E0916C', soil: '#3A2A1E' },
  sand: { pot: '#E8D6B8', potDark: '#B89A74', potRim: '#F1E3CA', soil: '#3A2A1E' },
  forest: { pot: '#166534', potDark: '#0A3D20', potRim: '#228F4C', soil: '#14532D' },
};

export function PlantPot({
  variant,
  className,
  tone = 'terracotta',
}: PlantPotProps) {
  const uid = useId().replace(/:/g, '');
  const c = POT_PALETTES[tone];

  const potId = `pot-${uid}`;
  const leafId = `leaf-${uid}`;
  const leafAltId = `leaf-${uid}-alt`;
  const bloomId = `bloom-${uid}`;

  const potUrl = `url(#${potId})`;
  const leafUrl = `url(#${leafId})`;
  const leafAltUrl = `url(#${leafAltId})`;
  const bloomUrl = `url(#${bloomId})`;

  return (
    <svg
      viewBox="0 0 260 320"
      className={cn('overflow-visible', className)}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={potId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.potRim} />
          <stop offset="1" stopColor={c.potDark} />
        </linearGradient>
        <linearGradient id={leafId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4ADE80" />
          <stop offset="1" stopColor="#166534" />
        </linearGradient>
        <linearGradient id={leafAltId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#86EFAC" />
          <stop offset="1" stopColor="#15803D" />
        </linearGradient>
        <linearGradient id={bloomId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F9A8D4" />
          <stop offset="1" stopColor="#DB2777" />
        </linearGradient>
      </defs>

      {/* Plant content */}
      <g>{renderPlant(variant)}</g>

      {/* Pot */}
      <g>
        <ellipse
          cx="130"
          cy="228"
          rx="96"
          ry="10"
          fill={c.soil}
          opacity="0.25"
        />
        <path
          d="M46 230 L58 316 Q58 320 62 320 L198 320 Q202 320 202 316 L214 230 Z"
          fill={potUrl}
        />
        <ellipse cx="130" cy="230" rx="84" ry="12" fill={c.potRim} />
        <ellipse cx="130" cy="230" rx="72" ry="6" fill={c.soil} />
        <path
          d="M46 230 L58 316 Q58 320 62 320 L72 320 L66 232 Z"
          fill="#000"
          opacity="0.08"
        />
      </g>
    </svg>
  );

  function leafFill(i: number) {
    return i % 2 ? leafAltUrl : leafUrl;
  }

  function renderPlant(v: PlantVariant) {
    switch (v) {
      case 'monstera':
        return (
          <g>
            <path
              d="M130 224 L128 120"
              stroke="#14532D"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M128 150c-40-18-70-6-74 16 20-4 44 2 74-16Z"
              fill={leafUrl}
            />
            <path d="M88 165q10 2 20 0" stroke="#052E16" fill="none" strokeWidth="1" opacity="0.5" />
            <path d="M70 160q8 -2 18 -2" stroke="#052E16" fill="none" strokeWidth="1" opacity="0.5" />
            <path
              d="M130 120c44-10 72 12 72 42-26 0-52-12-72-42Z"
              fill={leafAltUrl}
            />
            <path d="M160 132q8 4 14 10" stroke="#052E16" fill="none" strokeWidth="1" opacity="0.5" />
            <path d="M176 140q6 6 10 14" stroke="#052E16" fill="none" strokeWidth="1" opacity="0.5" />
            <path
              d="M128 90c-28-20-62-18-70 6 16 10 44 14 70-6Z"
              fill={leafUrl}
            />
            <path
              d="M128 60c28-14 58-4 64 18-20 8-42 4-64-18Z"
              fill={leafAltUrl}
            />
            <circle cx="128" cy="58" r="4" fill="#F9A8D4" opacity="0.9" />
          </g>
        );

      case 'fiddle-leaf':
        return (
          <g>
            <path
              d="M130 228 L130 80"
              stroke="#1F2E1E"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {[
              { cx: 90, cy: 190, rx: 34, ry: 22, rot: -20 },
              { cx: 178, cy: 166, rx: 34, ry: 22, rot: 18 },
              { cx: 96, cy: 140, rx: 34, ry: 22, rot: -12 },
              { cx: 174, cy: 114, rx: 34, ry: 22, rot: 14 },
              { cx: 120, cy: 86, rx: 30, ry: 20, rot: -4 },
            ].map((l, i) => (
              <ellipse
                key={i}
                cx={l.cx}
                cy={l.cy}
                rx={l.rx}
                ry={l.ry}
                fill={leafFill(i)}
                transform={`rotate(${l.rot} ${l.cx} ${l.cy})`}
              />
            ))}
          </g>
        );

      case 'snake':
        return (
          <g>
            {[
              { x: 92, h: 190, w: 26, rot: -12 },
              { x: 118, h: 210, w: 28, rot: -4 },
              { x: 146, h: 220, w: 30, rot: 2 },
              { x: 174, h: 200, w: 26, rot: 10 },
              { x: 202, h: 170, w: 22, rot: 18 },
            ].map((l, i) => (
              <g key={i} transform={`rotate(${l.rot} ${l.x + l.w / 2} 230)`}>
                <path
                  d={`M${l.x} 230 Q${l.x + l.w / 2} ${230 - l.h - 20} ${l.x + l.w} 230 Z`}
                  fill={leafFill(i)}
                />
                <path
                  d={`M${l.x + l.w / 2} 230 L${l.x + l.w / 2} ${230 - l.h}`}
                  stroke="#86EFAC"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
              </g>
            ))}
          </g>
        );

      case 'fern':
        return (
          <g>
            {[
              { rot: -40, x: 130, y: 220 },
              { rot: -20, x: 130, y: 220 },
              { rot: 0, x: 130, y: 220 },
              { rot: 20, x: 130, y: 220 },
              { rot: 40, x: 130, y: 220 },
            ].map((f, i) => (
              <g key={i} transform={`rotate(${f.rot} ${f.x} ${f.y})`}>
                <path
                  d={`M${f.x} ${f.y} q-8 -80 0 -160`}
                  stroke="#14532D"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                {Array.from({ length: 10 }).map((_, j) => {
                  const ty = f.y - 20 - j * 16;
                  const side = j % 2 === 0 ? -1 : 1;
                  return (
                    <path
                      key={j}
                      d={`M${f.x} ${ty} q${side * 14} ${-4 - j * 0.4} ${side * 20} ${-10 - j * 0.5}`}
                      fill={leafFill(i)}
                      stroke="#14532D"
                      strokeWidth="0.8"
                    />
                  );
                })}
              </g>
            ))}
          </g>
        );

      case 'orchid':
        return (
          <g>
            <path
              d="M110 228 Q108 140 140 100"
              stroke="#166534"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M150 228 Q158 150 130 84"
              stroke="#166534"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M80 228 Q60 210 56 188 q30 -4 48 12 q-12 16 -24 28Z"
              fill={leafUrl}
            />
            <path
              d="M180 228 Q200 212 206 190 q-30 -4 -50 12 q14 16 24 26Z"
              fill={leafAltUrl}
            />
            {[
              { cx: 138, cy: 100 },
              { cx: 128, cy: 80 },
              { cx: 118, cy: 118 },
            ].map((b, i) => (
              <g key={i} transform={`translate(${b.cx} ${b.cy})`}>
                <circle r="12" fill={bloomUrl} />
                <circle r="8" fill="#FBCFE8" opacity="0.7" />
                <circle r="3" fill="#9D174D" />
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse
                    key={a}
                    cx="0"
                    cy="-9"
                    rx="6"
                    ry="10"
                    fill={bloomUrl}
                    transform={`rotate(${a})`}
                    opacity="0.9"
                  />
                ))}
                <circle r="3" fill="#FCE7F3" />
              </g>
            ))}
          </g>
        );

      case 'succulent':
        return (
          <g>
            <g transform="translate(130 200)">
              {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a, i) => (
                <g key={a} transform={`rotate(${a})`}>
                  <path
                    d={`M0 0 q-10 -30 0 -60 q10 30 0 60Z`}
                    fill={leafFill(i)}
                  />
                </g>
              ))}
              {[0, 72, 144, 216, 288].map((a) => (
                <g key={a} transform={`rotate(${a})`}>
                  <path
                    d="M0 0 q-6 -18 0 -36 q6 18 0 36Z"
                    fill={leafUrl}
                  />
                </g>
              ))}
              <circle r="8" fill="#86EFAC" />
            </g>
          </g>
        );

      case 'peace-lily':
        return (
          <g>
            {[
              { d: 'M90 220 Q50 180 70 120 Q100 140 120 220Z', alt: false },
              { d: 'M170 220 Q210 180 190 120 Q160 140 140 220Z', alt: true },
              { d: 'M130 220 Q130 130 150 90 Q170 150 150 220Z', alt: false },
              { d: 'M130 220 Q130 130 110 90 Q90 150 110 220Z', alt: true },
            ].map((l, i) => (
              <path
                key={i}
                d={l.d}
                fill={l.alt ? leafAltUrl : leafUrl}
              />
            ))}
            <path
              d="M130 140 Q118 100 130 70 Q142 100 130 140Z"
              fill="#FAFFFB"
              stroke="#DCFCE7"
              strokeWidth="1"
            />
            <path
              d="M128 70 L128 120"
              stroke="#FDE68A"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        );

      case 'cactus':
        return (
          <g>
            <rect x="110" y="110" width="40" height="120" rx="20" fill={leafUrl} />
            <rect x="70" y="150" width="30" height="80" rx="15" fill={leafAltUrl} />
            <rect x="160" y="140" width="30" height="90" rx="15" fill={leafAltUrl} />
            {[120, 140, 160, 180, 200, 220].map((y) => (
              <g key={y}>
                <circle cx="115" cy={y} r="1.2" fill="#14532D" />
                <circle cx="130" cy={y} r="1.2" fill="#14532D" />
                <circle cx="145" cy={y} r="1.2" fill="#14532D" />
              </g>
            ))}
            <circle cx="130" cy="108" r="6" fill="#EC4899" />
            <circle cx="130" cy="108" r="3" fill="#FBCFE8" />
          </g>
        );

      default:
        return null;
    }
  }
}
