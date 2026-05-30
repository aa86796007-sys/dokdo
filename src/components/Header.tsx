import React from 'react';
import { Compass, BookOpen, FileText, Award, Landmark } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  progress: number; // calculated completed actions (e.g. read sections or activity written)
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, progress }) => {
  const navItems = [
    { id: 'intro', label: '교재 요약', icon: Landmark, desc: 'Intro' },
    { id: 'ch1', label: '1차시: 지리와 영역', icon: Compass, desc: '지리적 특성' },
    { id: 'ch2', label: '2차시: 사료와 고지도', icon: BookOpen, desc: '역사적 문맥' },
    { id: 'ch3', label: '3차시: 현대와 평화', icon: Award, desc: '갈등의 해결' },
    { id: 'activity', label: '수업 활동지', icon: FileText, desc: '공동 집필 & 토론' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-md no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo & School Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <Landmark className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-sans font-bold text-zinc-900 text-[15px] sm:text-[17px] tracking-tight antialiased">
                독도 영토 주권 교육 종합 교재
              </h1>
              <p className="font-sans text-[10px] sm:text-xs text-zinc-500 font-medium tracking-wide">
                대한민국 역사·지리 평화교육위원회
              </p>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Core Applet Badge & Progress */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-zinc-400 font-semibold tracking-wider">LEARNING MODULE</span>
                <span className="font-mono text-xs text-indigo-600 font-bold">{progress}% 완료</span>
              </div>
              <div className="w-28 bg-zinc-100 h-1.5 rounded-full mt-1 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="px-2.5 py-1 text-[10px] font-bold font-mono tracking-wider rounded-md bg-zinc-100 text-zinc-600 uppercase border border-zinc-200">
              May 2026
            </div>
          </div>
        </div>

        {/* Mobile Submenu Navigation - Horizontal scrolling layout */}
        <div className="flex lg:hidden overflow-x-auto pb-3 gap-2 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mob-nav-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-zinc-900 text-white'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
