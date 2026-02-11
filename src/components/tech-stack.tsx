'use client';

import type { StackTecnologico } from '@/interface/contentfull.interface';
import React from 'react';

import { useState } from 'react';

type StackCategory = 'frontend' | 'backend' | 'metodologias';

interface TechStackProps {
  stackTecnologico: StackTecnologico;
}

const tabs: { id: StackCategory; label: string; icon: React.ReactNode }[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: (
      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
        <polyline points='16 18 22 12 16 6' />
        <polyline points='8 6 2 12 8 18' />
      </svg>
    ),
  },
  {
    id: 'backend',
    label: 'Backend & Tools',
    icon: (
      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
        <rect x='2' y='2' width='20' height='8' rx='2' ry='2' />
        <rect x='2' y='14' width='20' height='8' rx='2' ry='2' />
        <line x1='6' y1='6' x2='6.01' y2='6' />
        <line x1='6' y1='18' x2='6.01' y2='18' />
      </svg>
    ),
  },
  {
    id: 'metodologias',
    label: 'Metodologias',
    icon: (
      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
        <circle cx='12' cy='12' r='10' />
        <path d='M12 6v6l4 2' />
      </svg>
    ),
  },
];

function getLevelColor(level: string) {
  switch (level) {
    case 'Avanzado':
      return 'bg-primary/15 text-primary border-primary/30';
    case 'Ssr':
      return 'bg-accent/15 text-accent border-accent/30';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case 'Backend':
      return 'text-primary';
    case 'Database':
      return 'text-emerald-400';
    case 'Testing':
      return 'text-amber-400';
    case 'Tool':
      return 'text-muted-foreground';
    default:
      return 'text-muted-foreground';
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'Backend':
      return (
        <svg
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path d='M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z' />
        </svg>
      );
    case 'Database':
      return (
        <svg
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <ellipse cx='12' cy='5' rx='9' ry='3' />
          <path d='M21 12c0 1.66-4 3-9 3s-9-1.34-9-3' />
          <path d='M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5' />
        </svg>
      );
    case 'Testing':
      return (
        <svg
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' />
        </svg>
      );
    default:
      return (
        <svg
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path d='M12 2L2 7l10 5 10-5-10-5z' />
          <path d='M2 17l10 5 10-5' />
          <path d='M2 12l10 5 10-5' />
        </svg>
      );
  }
}

export default function TechStack({ stackTecnologico }: TechStackProps) {
  const [activeTab, setActiveTab] = useState<StackCategory>('frontend');

  return (
    <div>
      {/* Tabs */}
      <div className='mb-6 flex gap-1 rounded-xl border border-border bg-card/30 p-1'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 font-mono text-xs transition-all duration-300 ${
              activeTab === tab.id ? 'bg-primary/10 text-primary shadow-sm shadow-primary/10' : 'text-muted-foreground hover:text-foreground'
            }`}>
            {tab.icon}
            <span className='hidden sm:inline'>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className='min-h-[280px]'>
        {/* Frontend */}
        {activeTab === 'frontend' && (
          <div className='grid gap-3 sm:grid-cols-2'>
            {stackTecnologico?.stack.frontend.map((skill, i) => (
              <div
                key={skill.name}
                className='group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/70'
                style={{ animationDelay: `${i * 0.05}s` }}>
                <div className='flex flex-col gap-1'>
                  <span className='text-sm font-medium text-foreground'>{skill.name}</span>
                  {/* Level bar */}
                  <div className='flex items-center gap-2'>
                    <div className='h-1 w-16 overflow-hidden rounded-full bg-border'>
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          skill.level === 'Avanzado' ? 'w-[90%] bg-primary' : 'w-[72%] bg-accent'
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${getLevelColor(skill.level)}`}>{skill.level}</span>
              </div>
            ))}
          </div>
        )}

        {/* Backend & Tools */}
        {activeTab === 'backend' && (
          <div className='grid gap-3 sm:grid-cols-2'>
            {stackTecnologico?.stack.backend_and_tools.map((item, i) => (
              <div
                key={item.name}
                className='group flex items-center gap-3 rounded-xl border border-border bg-card/40 px-4 py-3.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/70'
                style={{ animationDelay: `${i * 0.05}s` }}>
                <div className={`${getTypeColor(item.type)}`}>{getTypeIcon(item.type)}</div>
                <div className='flex flex-1 flex-col'>
                  <span className='text-sm font-medium text-foreground'>{item.name}</span>
                  <span className={`font-mono text-[10px] ${getTypeColor(item.type)}`}>{item.type}</span>
                </div>
                <div
                  className={`h-2 w-2 rounded-full ${
                    item.type === 'Backend'
                      ? 'bg-primary'
                      : item.type === 'Database'
                        ? 'bg-emerald-400'
                        : item.type === 'Testing'
                          ? 'bg-amber-400'
                          : 'bg-muted-foreground'
                  }`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Metodologias */}
        {activeTab === 'metodologias' && (
          <div className='flex flex-col gap-3'>
            {stackTecnologico?.stack.metodologias.map((item, i) => (
              <div
                key={item}
                className='group flex items-center gap-4 rounded-xl border border-border bg-card/40 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/70'
                style={{ animationDelay: `${i * 0.05}s` }}>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 font-mono text-xs font-bold text-primary'>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <span className='text-sm font-medium text-foreground'>{item}</span>
                <div className='ml-auto h-px flex-1 bg-gradient-to-r from-border to-transparent' />
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-primary/40 transition-colors group-hover:text-primary'>
                  <polyline points='9 18 15 12 9 6' />
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
