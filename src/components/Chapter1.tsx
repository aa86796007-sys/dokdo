import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Compass, Navigation, MapPin, Eye, Zap, HelpCircle } from 'lucide-react';

interface Chapter1Props {
  onInteract: (key: string) => void;
  interactions: Record<string, boolean>;
}

export const Chapter1: React.FC<Chapter1Props> = ({ onInteract, interactions }) => {
  // Size comparison state
  const [sizeMultiplier, setSizeMultiplier] = useState(1);
  const DOKDO_AREA = 187554; // m²
  const JAMSIL_AREA = 110000; // m² (Jamsil Main Stadium pitch & track footprint area approximate)

  // Visibility simulator states
  const [observerHeight, setObserverHeight] = useState(300); // meters
  const [locationTab, setLocationTab] = useState<'ulleung' | 'oki'>('ulleung');
  const [dokdoPeak, setDokdoPeak] = useState<'seodo' | 'dongdo'>('seodo');

  const distance = locationTab === 'ulleung' ? 87.4 : 157.5;
  const targetPeakHeight = dokdoPeak === 'seodo' ? 168.5 : 98.6; // Seodo is 168.5m, Dongdo is 98.6m

  // Compute maximum distance of line-of-sight according to standard earth curvature
  // D_max = 3.57 * (sqrt(h_observer) + sqrt(h_target))
  const maxLineOfSight = parseFloat(
    (3.57 * (Math.sqrt(observerHeight) + Math.sqrt(targetPeakHeight))).toFixed(1)
  );
  const isVisible = maxLineOfSight >= distance;

  return (
    <div className="space-y-12">
      {/* Intro Header */}
      <div className="border-b border-zinc-100 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-700 font-mono text-xs font-semibold uppercase tracking-wider mb-3">
          Lesson 01
        </div>
        <h2 className="font-sans font-bold text-zinc-900 text-3xl sm:text-4xl tracking-tight">
          독도의 지리적 특성과 영역의 이해
        </h2>
        <p className="font-sans text-zinc-500 mt-2 text-base sm:text-lg">
          독도가 대한민국의 영토임을 이해하는 첫걸음은 명확한 물리적·지리적 사실과 국제법적 영역 개념을 정확히 확립하는 것입니다.
        </p>
      </div>

      {/* 1.1 지리적 위치와 물리적 거리 분석 */}
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-600" />
          <h3 className="font-sans font-bold text-zinc-900 text-xl sm:text-2xl">
            1.1 지리적 위치와 물리적 거리 분석
          </h3>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Geographical Spec Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-zinc-50 text-indigo-600">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-zinc-900 text-lg">지리 및 구성 상세 정보</h4>
                <p className="text-zinc-500 text-xs font-medium">동도 우산봉 중심의 지구 물리 좌표</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100">
                <span className="text-[10px] font-mono font-bold text-zinc-400 tracking-wider">COORDINATES</span>
                <p className="font-mono text-zinc-800 text-base font-semibold mt-1">북위 37°14′26.8″</p>
                <p className="font-mono text-zinc-800 text-base font-semibold">동경 131°52′10.4″</p>
                <p className="text-xs text-zinc-500 mt-2">한반도의 가장 동쪽 경계 지점</p>
              </div>

              <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100">
                <span className="text-[10px] font-mono font-bold text-zinc-400 tracking-wider">AREA SIZE</span>
                <p className="font-sans text-zinc-800 text-lg font-bold mt-1">총면적 187,554 m²</p>
                <p className="text-xs text-zinc-600 mt-0.5">동도: 73,297 m² | 서도: 88,740 m²</p>
                <p className="text-xs text-zinc-500 mt-2">주변 89개의 부속 바위섬으로 복합 구성</p>
              </div>
            </div>

            {/* Sizes Comparison Sandbox widget */}
            <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/40">
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-zinc-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  잠실종합운동장 크기 비교 시뮬레이션
                </span>
                <button
                  onClick={() => {
                    setSizeMultiplier(1);
                    onInteract('size_compare');
                  }}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline transition-colors"
                >
                  기본값 복원
                </button>
              </div>

              {/* Slider representation of sizing */}
              <div className="flex gap-4 items-center mb-4">
                <span className="text-xs text-zinc-500 shrink-0">축력 배율</span>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={sizeMultiplier}
                  onChange={(e) => {
                    setSizeMultiplier(parseFloat(e.target.value));
                    onInteract('size_compare');
                  }}
                  className="w-full accent-indigo-600"
                />
                <span className="text-xs font-mono font-bold text-indigo-700 w-8 shrink-0">{sizeMultiplier}x</span>
              </div>

              <div className="grid grid-cols-2 gap-4 h-32 relative">
                {/* Dokdo comparison graphic block */}
                <div className="bg-white rounded-xl p-3 border border-zinc-200/60 shadow-sm flex flex-col justify-between overflow-hidden">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 block">DOKDO AREA</span>
                    <span className="text-xs font-bold text-zinc-800">독도 영토 {Math.round(DOKDO_AREA * sizeMultiplier).toLocaleString()}m²</span>
                  </div>
                  <div className="relative aspect-video bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100 overflow-hidden">
                    <div 
                      className="absolute bg-emerald-600/30 border-2 border-emerald-500 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(100, 35 * Math.sqrt(sizeMultiplier))}%`,
                        height: `${Math.min(100, 35 * Math.sqrt(sizeMultiplier))}%`
                      }}
                    />
                    <span className="text-[10px] font-semibold text-emerald-800 relative z-10 font-mono">
                      ~{(DOKDO_AREA / JAMSIL_AREA * sizeMultiplier).toFixed(1)}x 경기장
                    </span>
                  </div>
                </div>

                {/* Jamsil comparison block */}
                <div className="bg-white rounded-xl p-3 border border-zinc-200/60 shadow-sm flex flex-col justify-between overflow-hidden opacity-80">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 block">BASE CRITERIA</span>
                    <span className="text-xs font-bold text-zinc-800">서울 잠실종합운동장 (~11만m²)</span>
                  </div>
                  <div className="aspect-video bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100 relative">
                    <div 
                      className="absolute bg-indigo-600/20 border-2 border-indigo-400 rounded-full"
                      style={{ width: '35%', height: '35%' }}
                    />
                    <span className="text-[10px] font-semibold text-zinc-600 relative z-10 font-mono">1.0x (고정)</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 mt-3 italic">
                * 독도는 잠실종합운동장 크기의 <b>약 1.7배</b> 크기입니다. 슬라이더를 조정하여 상대적인 영토 변량을 모형화해 보십시오.
              </p>
            </div>
          </div>

          {/* Geographical Significance Card Box */}
          <div className="lg:col-span-5 bg-zinc-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-amber-400 border border-zinc-700 font-mono text-[10px] font-semibold tracking-wider mb-5">
                <Eye className="h-3 w-3" />
                지리적 육안 관측성의 역사적 의의
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-sans font-bold text-zinc-100 text-base flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    1. 울릉도에서의 독도 관측
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-sans leading-relaxed">
                    울릉도의 사동, 석포마을 등 고지대에서는 날씨가 맑은 날 <b>독도가 육안으로 또렷이 관측</b>됩니다. 이는 아주 먼 옛날부터 울릉도에 살던 사람들이 동해 상존 섬의 존재를 자연스럽게 인식하고 생활권의 일부로 편입시켰음을 증명합니다.
                  </p>
                </div>

                <div className="border-t border-zinc-800 pt-5">
                  <h4 className="font-sans font-bold text-zinc-100 text-base flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-zinc-500" />
                    2. 일본 오키섬에서의 관측 불가능성
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-sans leading-relaxed">
                    반면, 일본에서 가장 가까운 오키섬에서는 수평지구 곡률의 기하학적 한계<strong>(157.5 km 거리 장벽)</strong> 때문에 아무리 맑은 날씨에도 독도를 절대 볼 수 없습니다. 일본 어민들의 인위적인 항해 활동은 자연적 생활권 인지 범위를 아득히 벗어난 외적인 도해였음을 정론합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 font-bold block uppercase tracking-widest">Core Distance Metrics</span>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="border border-zinc-800 rounded-xl p-2 bg-zinc-950 text-center">
                  <span className="text-[9px] text-zinc-500 block">울릉도-독도</span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-indigo-400">87.4 km</span>
                </div>
                <div className="border border-zinc-800 rounded-xl p-2 bg-zinc-950 text-center">
                  <span className="text-[9px] text-zinc-500 block">죽변-독도</span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-zinc-400">216.8 km</span>
                </div>
                <div className="border border-zinc-800 rounded-xl p-2 bg-zinc-950 text-center">
                  <span className="text-[9px] text-zinc-500 block">오키섬-독도</span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-zinc-400">157.5 km</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------ INTERACTIVE BARRIER: CURVATURE & VISIBILITY SIMULATOR ------------------ */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-bold font-mono uppercase">
                Interactive Lab
              </span>
              <h4 className="font-sans font-bold text-zinc-900 text-lg sm:text-xl mt-1 flex items-center gap-2">
                <Navigation className="h-5 w-5 text-indigo-600 block shrink-0" />
                지형 높이와 지구 곡률 간 육안 관측 시뮬레이터
              </h4>
              <p className="text-zinc-500 text-xs sm:text-sm mt-0.5">
                관찰자의 높이와 독도의 봉우리를 선택하여, 수평선 뒤편의 지리학적 관측 가능 한계를 실증해보세요.
              </p>
            </div>

            <div className="flex gap-2 bg-zinc-200/60 p-1 rounded-xl w-fit shrink-0">
              <button
                onClick={() => {
                  setLocationTab('ulleung');
                  setObserverHeight(300);
                  onInteract('visibility_sim');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold select-none transition-colors ${
                  locationTab === 'ulleung' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                울릉도 (87.4km)
              </button>
              <button
                onClick={() => {
                  setLocationTab('oki');
                  setObserverHeight(300);
                  onInteract('visibility_sim');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold select-none transition-colors ${
                  locationTab === 'oki' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                일본 오키섬 (157.5km)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Control Panel */}
            <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-2xl p-5 flex flex-col justify-between gap-6">
              <div>
                <label className="text-xs font-extrabold text-zinc-600 uppercase tracking-wider block mb-2">
                  1. 관측자 위치에서의 해발 고도 (m)
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={observerHeight}
                    onChange={(e) => {
                      setObserverHeight(parseInt(e.target.value));
                      onInteract('visibility_sim');
                    }}
                    className="w-full accent-indigo-600"
                  />
                  <span className="font-mono text-sm leading-none font-bold text-zinc-800 w-16 shrink-0 text-right">
                    {observerHeight} m
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1">
                  <span>해수면 (10m)</span>
                  <span>울릉 성인봉 (984m)</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-zinc-600 uppercase tracking-wider block mb-2">
                  2. 관측 목표 (독도의 지형)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setDokdoPeak('seodo');
                      onInteract('visibility_sim');
                    }}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-colors ${
                      dokdoPeak === 'seodo'
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-700 font-bold'
                        : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    서도 대한봉 (168.5m)
                  </button>
                  <button
                    onClick={() => {
                      setDokdoPeak('dongdo');
                      onInteract('visibility_sim');
                    }}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-colors ${
                      dokdoPeak === 'dongdo'
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-700 font-bold'
                        : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    동도 우산봉 (98.6m)
                  </button>
                </div>
              </div>

              {/* Status Box */}
              <div className={`rounded-xl p-4 border flex items-start gap-3 transition-colors duration-300 ${
                isVisible 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="mt-0.5">
                  <Zap className={`h-5 w-5 ${isVisible ? 'text-emerald-600 animate-pulse' : 'text-red-500'}`} />
                </div>
                <div>
                  <h5 className="font-sans font-bold text-sm">
                    {isVisible ? '수평선 위로 관측 가능!' : '지구 곡률 뒤에 은폐됨!'}
                  </h5>
                  <p className="text-xs mt-1 leading-relaxed opacity-90">
                    {isVisible 
                      ? `해당 고도(${observerHeight}m)에서는 수평선 너머 최대 ${maxLineOfSight}km 앞까지 관찰가능하여, ${distance}km 밖 독도가 또렷이 육안에 포착됩니다.`
                      : `해당 고도(${observerHeight}m)에서 수평선 너머 최대로 볼 수 있는 거리는 ${maxLineOfSight}km입니다. 독도(${distance}km 소요)는 수평선 뒤 숨어 물리적으로 보이지 않습니다.`
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Visual SVG Curvature Diagram */}
            <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between overflow-hidden text-zinc-400 relative min-h-[300px]">
              {/* Overlay Grid lines for HUD vibe */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-20 pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <span className="font-mono text-[10px] tracking-widest font-bold text-zinc-500 uppercase flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${isVisible ? 'bg-emerald-400' : 'bg-red-400'}`} />
                  ORBITAL CURVATURE SIMULATOR V1.1
                </span>
                <span className="font-mono text-xs text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                  물리적 거리: <strong>{distance} km</strong> | 최대 한계선: <strong>{maxLineOfSight} km</strong>
                </span>
              </div>

              {/* Curve Drawing Area */}
              <div className="relative h-44 w-full flex items-end justify-center px-4 my-4">
                <svg className="w-full h-full text-zinc-500" viewBox="0 0 500 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Earth Curvature (Large Arc) */}
                  <path d="M 10 145 Q 250 85, 490 145" stroke="#4b5563" strokeWidth="4" fill="none" />
                  
                  {/* Left Observer pole */}
                  <line x1="50" y1="135" x2="50" y2={135 - (observerHeight / 10)} stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
                  
                  {/* Right Target Dokdo pole */}
                  <line x1="450" y1="135" x2="450" y2={135 - (targetPeakHeight / 4)} stroke="#d97706" strokeWidth="3" strokeLinecap="round" />

                  {/* Observer label */}
                  <text x="35" y={115 - (observerHeight / 10)} fill="#a5b4fc" className="font-sans text-[10px] font-bold">
                    관측자 ({observerHeight}m)
                  </text>

                  {/* Target labels */}
                  <text x="410" y={115 - (targetPeakHeight / 4)} fill="#fcd34d" className="font-sans text-[10px] font-bold">
                    독도 {dokdoPeak === 'seodo' ? '서도' : '동도'} ({targetPeakHeight}m)
                  </text>

                  {/* Line of sight beam */}
                  <line 
                    x1="50" 
                    y1={135 - (observerHeight / 10)} 
                    x2="450" 
                    y2={135 - (targetPeakHeight / 4)} 
                    stroke={isVisible ? '#10b981' : '#ef4444'} 
                    strokeWidth="1.5" 
                    strokeDasharray={isVisible ? "none" : "4 4"}
                  />

                  {/* Curvature obstacle indicator circle if invisible */}
                  {!isVisible && (
                    <>
                      <circle cx="250" cy="115" r="8" fill="#ef4444" fillOpacity="0.8" />
                      <text x="220" y="100" fill="#fca5a5" className="font-mono text-[9px] font-semibold">지구곡률 장막 (BLOCKED)</text>
                    </>
                  )}
                  {isVisible && (
                    <>
                      <circle cx="250" cy="100" r="4" fill="#10b981" />
                      <text x="210" y="90" fill="#a7f3d0" className="font-mono text-[9px] font-semibold">시야선 개방 (CLEAR)</text>
                    </>
                  )}
                </svg>
              </div>

              {/* Informative scientific note block */}
              <div className="bg-zinc-950/60 p-3 rounded-lg border border-zinc-800 relative z-10">
                <p className="font-sans text-xs text-zinc-300 leading-relaxed">
                  <HelpCircle className="h-3.5 w-3.5 text-indigo-400 inline mr-1" />
                  <b>물리법칙:</b> 수평선 관찰 한지 공식(피타고라스 구면 공식)에 따르면, 울릉 성인봉(984m) 및 인근 고도에서 독도(서도 168.5m)는 극지 기후가 안개로 뒤덮이지 않는 이상 <b>두 눈으로 확실히 관측</b>됩니다 (약 130km 가용 거리). 일본은 오키섬에서 독도의 최정상부마저 기하학적으로 가로막혀 고대부터 자생적으로 영토 영유 관념을 잉태하는 것이 불가능했습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1.2 국가 영역의 삼요소와 독도 */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-600" />
          <h3 className="font-sans font-bold text-zinc-900 text-xl sm:text-2xl">
            1.2 국가 영역(Territory)의 삼요소와 독도
          </h3>
        </div>
        <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
          국가 영역은 영토, 영해, 영공으로 나뉩니다. 대한민국 헌법 제3조에 근거하고 국제법상 선언된 기준에 따라 대한민국은 독도를 온전히 기점으로 삼는 완전무결한 입체적 영역 주권을 실질 지배하고 행사합니다.
        </p>

        {/* Territory Elements Table */}
        <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="p-4 text-xs font-extrabold text-zinc-600 uppercase tracking-wider font-sans w-1/4">영역 구분</th>
                  <th className="p-4 text-xs font-extrabold text-zinc-600 uppercase tracking-wider font-sans">핵심 지위 및 독도의 법적 지위</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 font-sans font-bold text-zinc-900 border-r border-zinc-100 flex items-center gap-2 mt-2">
                    <span className="p-1 rounded bg-blue-50 text-blue-600 font-bold text-xs font-sans">영토</span>
                    영토 (Territory)
                  </td>
                  <td className="p-4 font-sans text-sm text-zinc-700 leading-relaxed">
                    주권이 미치는 지표의 범위로, 독도는 <b>경상북도 울릉군 울릉읍 독도리 1~96번지</b>에 해당하는 엄연한 대한민국의 행정 영토입니다. 국가가 영유권을 직접 발령하여 등기부 주민등록 등 국토대장에 등록되어 관리되고 있습니다.
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 font-sans font-bold text-zinc-900 border-r border-zinc-100 flex items-center gap-2">
                    <span className="p-1 rounded bg-teal-50 text-teal-600 font-bold text-xs font-sans">영해</span>
                    영해 (Territorial Sea)
                  </td>
                  <td className="p-4 font-sans text-sm text-zinc-700 leading-relaxed">
                    영토에 인접한 해역으로 기선으로부터 <b>12해리</b>(1해리 = 1,852m)까지 주권 해역으로 지정됩니다. 대한민국은 독도 주변 12해리를 선포하고 우리 해양경찰청 함정이 상시 무단 불법 일본어선 침입과 초계 활동을 강력하게 단속 및 통제하고 있습니다.
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 font-sans font-bold text-zinc-900 border-r border-zinc-100 flex items-center gap-2">
                    <span className="p-1 rounded bg-indigo-50 text-indigo-600 font-bold text-xs font-sans">영공</span>
                    영공 (Airspace)
                  </td>
                  <td className="p-4 font-sans text-sm text-zinc-700 leading-relaxed">
                    영토와 영해의 상부 대기 수직 수역을 의미하며, 독도 상공은 대한민국 공군의 공중작전 및 <b>방공식별구역(KADIZ)</b>에 강력히 포함됩니다. 국산 초음속 전투기가 상시 정기적으로 독도 수호 비행 미션을 전개합니다.
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 font-sans font-bold text-zinc-900 border-r border-zinc-100 flex items-center gap-2">
                    <span className="p-1 rounded bg-purple-50 text-purple-600 font-bold text-xs font-sans">EEZ</span>
                    배타적 경제수역 (EEZ)
                  </td>
                  <td className="p-4 font-sans text-sm text-zinc-700 leading-relaxed">
                    영해 기선으로부터 최대 <b>200해리</b> 수역 중 영해를 제외한 공간입니다. 연안국가에 각종 어업권, 해저 천연 자원의 탐사·개발·보존 및 환경 보호 관리 권한이 부여되는 경제적 주권 권리 수역입니다. (신한일어업협정 핵심)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 1.3 독도의 주소와 도로명 체계 */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-600" />
          <h3 className="font-sans font-bold text-zinc-900 text-xl sm:text-2xl">
            1.3 독도의 주소와 도로명 체계
          </h3>
        </div>
        <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
          독도는 단지 멀리서 지켜만 보는 무인 돌섬이 아닙니다. 상주하고 있는 독도 주민들과 독도경비대 정예 대원들이 실제 실 거주 생활을 영위하고 있는 엄연한 <b>유인도(有人島)</b>이며, 대한민국 주소 및 도로명 주소를 공식 부여받아 사용하고 있습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dongdo Card */}
          <div className="relative bg-gradient-to-br from-indigo-50 to-white hover:from-indigo-100/50 rounded-3xl p-6 border border-indigo-100 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="absolute top-4 right-4 text-xs font-mono font-bold text-indigo-300">EAST ISLAND</div>
            <div>
              <div className="px-3 py-1 font-sans text-xs bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold rounded-lg w-fit">
                동도 (Dongdo)
              </div>
              <h4 className="font-sans font-bold text-zinc-900 text-lg mt-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-indigo-600" />
                경상북도 울릉군 울릉읍 이사부길
              </h4>
              <p className="text-zinc-500 text-xs sm:text-sm mt-2 leading-relaxed">
                신라 지증왕 시대 우산국을 우리 영토에 복속시켜 독도역사의 효시를 이룩한 대한민국 영웅 ‘이사부 장군’의 혁혁한 이름을 딴 도로명입니다.
              </p>
            </div>
            
            <div className="border-t border-indigo-100/60 pt-4 mt-6">
              <span className="text-[10px] font-mono text-indigo-500 font-bold uppercase block tracking-wider mb-2">대표 포함 인프라</span>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-white border border-indigo-100 px-2.5 py-1 rounded-lg text-zinc-700 font-medium">독도경비대 막사</span>
                <span className="bg-white border border-indigo-100 px-2.5 py-1 rounded-lg text-zinc-700 font-medium">독도 등대</span>
                <span className="bg-white border border-indigo-100 px-2.5 py-1 rounded-lg text-zinc-700 font-medium">한반도 바위</span>
              </div>
            </div>
          </div>

          {/* Seodo Card */}
          <div className="relative bg-gradient-to-br from-amber-50 to-white hover:from-amber-100/50 rounded-3xl p-6 border border-amber-100 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="absolute top-4 right-4 text-xs font-mono font-bold text-amber-500/50">WEST ISLAND</div>
            <div>
              <div className="px-3 py-1 font-sans text-xs bg-amber-100 border border-amber-200 text-amber-800 font-bold rounded-lg w-fit">
                서도 (Seodo)
              </div>
              <h4 className="font-sans font-bold text-zinc-900 text-lg mt-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-amber-700" />
                경상북도 울릉군 울릉읍 안용복길
              </h4>
              <p className="text-zinc-500 text-xs sm:text-sm mt-2 leading-relaxed">
                조선 숙종 시기, 목숨을 걸고 일본 막부로 두 차례나 직접 건너가 울릉도와 독도가 조선 주권 영토임을 법적 인정한 ‘호민 안용복’ 장군의 충심을 기념하는 도로명입니다.
              </p>
            </div>
            
            <div className="border-t border-amber-100/60 pt-4 mt-6">
              <span className="text-[10px] font-mono text-amber-600 font-bold uppercase block tracking-wider mb-2">대표 포함 인프라</span>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-white border border-amber-100 px-2.5 py-1 rounded-lg text-zinc-700 font-medium">독도 주민숙소</span>
                <span className="bg-white border border-amber-100 px-2.5 py-1 rounded-lg text-zinc-700 font-medium">음용수 식수원 ‘물골’</span>
                <span className="bg-white border border-amber-100 px-2.5 py-1 rounded-lg text-zinc-700 font-medium">가파른 자갈 해안선</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
