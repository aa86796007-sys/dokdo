import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Chapter1 } from './components/Chapter1';
import { Chapter2 } from './components/Chapter2';
import { Chapter3 } from './components/Chapter3';
import { ActivitySheet } from './components/ActivitySheet';
import { Landmark, Compass, BookOpen, Award, FileText, CheckCircle2, ChevronRight, Bookmark } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('intro');
  const [interactions, setInteractions] = useState<Record<string, boolean>>({});
  const [isActivityComplete, setIsActivityComplete] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Track page interaction values to dynamically reward student with completion progress
  const handleInteract = (key: string) => {
    setInteractions((prev) => {
      const next = { ...prev, [key]: true };
      localStorage.setItem('dokdo_edu_interactions', JSON.stringify(next));
      return next;
    });
  };

  // On mount reload interactions
  useEffect(() => {
    const saved = localStorage.getItem('dokdo_edu_interactions');
    if (saved) {
      try {
        setInteractions(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Compute total progress
  useEffect(() => {
    const totalPossiblePoints = 8;
    let points = 0;

    // Check individual interactions
    if (interactions['size_compare']) points += 1;
    if (interactions['visibility_sim']) points += 1;
    if (interactions['doc_filter']) points += 1;
    if (interactions['doc_select']) points += 1;
    if (interactions['map_select']) points += 1;
    if (interactions['ahn_timeline']) points += 1;
    if (interactions['fishery_view']) points += 1;
    if (isActivityComplete) points += 1;

    const roundedProgress = Math.round((points / totalPossiblePoints) * 100);
    setProgress(roundedProgress);
  }, [interactions, isActivityComplete]);

  return (
    <div className="min-h-screen bg-slate-50/40 text-zinc-900 selection:bg-indigo-100 flex flex-col justify-between">
      <div>
        {/* Core Header Navigation Bar */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} progress={progress} />

        {/* Primary Screen Area */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <AnimatePresence mode="wait">
            {activeTab === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {/* Visual Cover Banner Card */}
                <div className="relative bg-zinc-900 text-white rounded-3xl p-6 sm:p-12 overflow-hidden shadow-lg border border-zinc-800">
                  {/* Subtle graphical ocean waves backplate */}
                  <div className="absolute inset-0 bg-[#020617] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                  <div className="relative z-10 space-y-6 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 text-[11px] font-bold font-mono tracking-wider rounded-md bg-indigo-500 border border-indigo-400 text-indigo-50 flex items-center gap-1">
                        <Bookmark className="h-3.5 w-3.5" />
                        중·고등용 역사·지리 융합 수업 보조 교재
                      </span>
                      <span className="px-2.5 py-1 text-[10px] font-semibold font-mono tracking-widest uppercase rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400">
                        2026 EDITION
                      </span>
                    </div>

                    <h1 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-white select-none">
                      독도 영토 주권 <br className="hidden sm:block" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-amber-200">
                        교육 종합 교재
                      </span>
                    </h1>

                    <p className="font-sans text-zinc-400 text-sm sm:text-base leading-relaxed text-justify max-w-2xl">
                      지리적 물리적 실증, 정교독 사료와 교차 복제 분석, 그리고 한일 갈등의 평화적 해결안을 집약한 디지털 교과 인프라입니다. 학생들은 감정적 슬로건을 넘어 합리적 사실로 무장한 비판적 탐구 지능을 배양하게 됩니다.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-800">
                      <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                        <span>독도법적 영토, 영해, 영공, KADIZ 완벽 수록</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                        <span>태정관 지령 포함 7대 1차 사료 탑재</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 요약 (Abstract) Panel */}
                <div className="bg-amber-50/40 border border-amber-200/60 rounded-3xl p-6 sm:p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold font-sans">요약</span>
                    <h3 className="font-sans font-extrabold text-zinc-900 text-base sm:text-lg">교재 기획 배경 및 집필 취지</h3>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed text-justify text-justify-inter-word pl-1">
                    본 교재는 대한민국 독도의 현대·중세적 지위와 동해 해양 영토의 역사적 문맥을 체계적으로 이해하기 위해 기획되었습니다. 학생들이 감정적 해법을 넘어 명확한 역사적 고문서, 법적 조약문, 고지도의 시각적 대조 분석을 바탕으로 사실관계를 정립하고, 동아시아의 평화적 공동 해결 방안을 모색할 수 있는 비판적 사고력을 기르는 것을 목적으로 합니다.
                  </p>
                </div>

                {/* Course Modules Grid representation */}
                <div className="space-y-6">
                  <h3 className="font-sans font-extrabold text-zinc-900 text-lg sm:text-xl">
                    교재 단원별 학습 로드맵
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Chapter 1 Link */}
                    <button
                      onClick={() => setActiveTab('ch1')}
                      className="group flex flex-col justify-between p-6 rounded-2xl border border-zinc-200 bg-white hover:border-indigo-600/30 hover:bg-indigo-50/10 hover:shadow-md transition-all duration-300 text-left cursor-pointer"
                    >
                      <div className="space-y-3">
                        <div className="p-2 w-fit rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Compass className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-zinc-400 block tracking-widest">CHAPTER 01</span>
                        <h4 className="font-sans font-bold text-zinc-800 text-base group-hover:text-zinc-900">
                          독도의 지리적 특성과 영역의 이해
                        </h4>
                        <p className="text-zinc-500 text-xs leading-relaxed text-justify">
                          위도, 면적, 그리고 울릉도에서의 육안 관측성과 관련된 지리학 구면 증명 및 곡률 수치 계산 실증.
                        </p>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-indigo-600 group-hover:text-indigo-800 font-bold font-sans mt-4 self-end">
                        입장하기
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </button>

                    {/* Chapter 2 Link */}
                    <button
                      onClick={() => setActiveTab('ch2')}
                      className="group flex flex-col justify-between p-6 rounded-2xl border border-zinc-200 bg-white hover:border-indigo-600/30 hover:bg-indigo-50/10 hover:shadow-md transition-all duration-300 text-left cursor-pointer"
                    >
                      <div className="space-y-3">
                        <div className="p-2 w-fit rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-zinc-400 block tracking-widest">CHAPTER 02</span>
                        <h4 className="font-sans font-bold text-zinc-800 text-base group-hover:text-zinc-900">
                          사료와 고지도로 규명하는 역사적 권원
                        </h4>
                        <p className="text-zinc-500 text-xs leading-relaxed text-justify">
                          세종실록지리지, 태정관 지령 포함 7대 고문헌 검토 및 팔도총도 대항 지도상 경계 대조.
                        </p>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-indigo-600 group-hover:text-indigo-800 font-bold font-sans mt-4 self-end">
                        입장하기
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </button>

                    {/* Chapter 3 Link */}
                    <button
                      onClick={() => setActiveTab('ch3')}
                      className="group flex flex-col justify-between p-6 rounded-2xl border border-zinc-200 bg-white hover:border-indigo-600/30 hover:bg-indigo-50/10 hover:shadow-md transition-all duration-300 text-left cursor-pointer"
                    >
                      <div className="space-y-3">
                        <div className="p-2 w-fit rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Award className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-zinc-400 block tracking-widest">CHAPTER 03</span>
                        <h4 className="font-sans font-bold text-zinc-800 text-base group-hover:text-zinc-900">
                          현대 독도 갈등의 전개와 평화적 상생 방안
                        </h4>
                        <p className="text-zinc-500 text-xs leading-relaxed text-justify">
                          전후 SCAPIN 677 지령, 신한일어업협정 공동 중간수역 분석 및 동아시아 평화 교류의 가치 성찰.
                        </p>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-indigo-600 group-hover:text-indigo-800 font-bold font-sans mt-4 self-end">
                        입장하기
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </button>

                    {/* Activities Link */}
                    <button
                      onClick={() => setActiveTab('activity')}
                      className="group flex flex-col justify-between p-6 rounded-2xl border border-zinc-200 bg-white hover:border-indigo-600/30 hover:bg-indigo-50/10 hover:shadow-md transition-all duration-300 text-left cursor-pointer"
                    >
                      <div className="space-y-3">
                        <div className="p-2 w-fit rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <FileText className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-zinc-400 block tracking-widest">ACTIVITIES WORKBOOK</span>
                        <h4 className="font-sans font-bold text-zinc-800 text-base group-hover:text-zinc-900">
                          [수업 활동지] 한·일 공동 교과서 직접 집필하기
                        </h4>
                        <p className="text-zinc-500 text-xs leading-relaxed text-justify">
                          학생 제안용 한일 공동 단원 직접 작성 워크시트 및 토론 과제에 따른 개별 학습장 기록.
                        </p>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-indigo-600 group-hover:text-indigo-800 font-bold font-sans mt-4 self-end">
                        입장하기
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Render subcomponents dynamically with state hooks */}
            {activeTab === 'ch1' && (
              <motion.div
                key="ch1"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
              >
                <Chapter1 onInteract={handleInteract} interactions={interactions} />
              </motion.div>
            )}

            {activeTab === 'ch2' && (
              <motion.div
                key="ch2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
              >
                <Chapter2 onInteract={handleInteract} interactions={interactions} />
              </motion.div>
            )}

            {activeTab === 'ch3' && (
              <motion.div
                key="ch3"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
              >
                <Chapter3 onInteract={handleInteract} interactions={interactions} />
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
              >
                <ActivitySheet onInteract={handleInteract} onActivityComplete={setIsActivityComplete} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer System */}
      <footer className="w-full border-t border-zinc-200 bg-white py-6 mt-16 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-400 font-sans tracking-wide space-y-1">
          <p className="font-semibold text-zinc-500">
            © 2026 대한민국 역사·지리 평화교육위원회. All Rights Reserved.
          </p>
          <p>
            중·고등 과정 역사 및 지리 교과 융합 수업 보조 교사용 및 학생용 보급 배포 웹 시스템
          </p>
        </div>
      </footer>
    </div>
  );
}
