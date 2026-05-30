import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DOCS_DATA, MAPS_DATA, AHN_TIMELINE } from '../data';
import { DocumentItem, MapItem, TimelineEvent } from '../types';
import { BookOpen, Map, Milestone, FileText, ChevronRight, AlertCircle, Quote, Compass } from 'lucide-react';

interface Chapter2Props {
  onInteract: (key: string) => void;
  interactions: Record<string, boolean>;
}

export const Chapter2: React.FC<Chapter2Props> = ({ onInteract, interactions }) => {
  // Document selector state
  const [selectedDocId, setSelectedDocId] = useState<string>('sejong');
  // Document Category filter
  const [docFilter, setDocFilter] = useState<'all' | 'kr_doc' | 'jp_doc'>('all');
  // Ahn Yong-bok current step
  const [activeAhnStep, setActiveAhnStep] = useState<number>(0);
  // Map zoom/select
  const [selectedMapId, setSelectedMapId] = useState<string>('paldo');

  const filteredDocs = DOCS_DATA.filter(
    (doc) => docFilter === 'all' || doc.category === docFilter
  );

  const selectedDoc = DOCS_DATA.find((doc) => doc.id === selectedDocId) || DOCS_DATA[0];
  const selectedMap = MAPS_DATA.find((m) => m.id === selectedMapId) || MAPS_DATA[0];

  return (
    <div className="space-y-12">
      {/* Chapter Title */}
      <div className="border-b border-zinc-100 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-700 font-mono text-xs font-semibold uppercase tracking-wider mb-3">
          Lesson 02
        </div>
        <h2 className="font-sans font-bold text-zinc-900 text-3xl sm:text-4xl tracking-tight">
          사료와 지도로 규명하는 역사적 권원
        </h2>
        <p className="font-sans text-zinc-500 mt-2 text-base sm:text-lg">
          역사학적 사실의 힘은 명확한 1차 사료(Primary Sources)의 과학적 교차 분석에서 나옵니다. 한·일 양국의 관찬 공문서와 공인 최고지도를 완벽히 대조하여 독도의 역사적 국경에 담긴 역진 불가능한 진실을 발견해 보십시오.
        </p>
      </div>

      {/* 2.1 & 2.2 고문서 영역 */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-600" />
          <h3 className="font-sans font-bold text-zinc-900 text-xl sm:text-2xl">
            2.1 & 2.2 한·일 양국 고문서 교차 고찰
          </h3>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'kr_doc', 'jp_doc'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setDocFilter(filter);
                onInteract('doc_filter');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold select-none border transition-all duration-300 ${
                docFilter === filter
                  ? 'bg-zinc-900 border-zinc-900 text-white'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
              }`}
            >
              {filter === 'all' && '전체 1차 사료 목록'}
              {filter === 'kr_doc' && '🇰🇷 대한민국 관찬 고문서'}
              {filter === 'jp_doc' && '🇯🇵 일본 해명 주권 배제 고문서'}
            </button>
          ))}
        </div>

        {/* Split Document Sandbox layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Navigation List */}
          <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[460px] overflow-y-auto pr-2">
            {filteredDocs.map((doc) => {
              const isSelected = doc.id === selectedDoc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => {
                    setSelectedDocId(doc.id);
                    onInteract('doc_select');
                  }}
                  className={`relative flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 select-none group cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/50 border-indigo-200 shadow-sm'
                      : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl border ${
                      isSelected
                        ? 'bg-white border-indigo-200 text-indigo-600'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-500 group-hover:text-zinc-700'
                    }`}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-zinc-800 text-xs sm:text-sm group-hover:text-zinc-900">
                        {doc.title}
                      </h4>
                      <p className="font-mono text-[10px] text-zinc-400 font-semibold group-hover:text-zinc-500 mt-0.5">
                        {doc.year} · {doc.category === 'kr_doc' ? '대한민국 사료' : '일본 관찬 사료'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-zinc-400 group-hover:text-zinc-600 transition-transform ${
                    isSelected ? 'translate-x-1 text-indigo-500' : ''
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Old Antique Scroll Representation */}
          <div className="lg:col-span-7 bg-[#fdfaf5] border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-inner relative flex flex-col justify-between overflow-hidden">
            {/* Scroll Border Visual decorations (Top / Bottom dark rods) */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-[#d97706]/20 bg-gradient-to-r from-amber-800/10 via-amber-700/20 to-amber-800/10" />
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#d97706]/20 bg-gradient-to-r from-amber-800/10 via-amber-700/20 to-amber-800/10" />

            <div className="space-y-6">
              {/* Document Header details */}
              <div className="flex items-start justify-between border-b border-amber-200/80 pb-5">
                <div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider ${
                    selectedDoc.category === 'kr_doc'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-100 text-amber-900 border border-amber-300/60'
                  }`}>
                    {selectedDoc.category === 'kr_doc' ? '🇰🇷 관찬 고유 영토' : '🇯🇵 일본의 주권 배제'}
                  </span>
                  <h4 className="text-xl font-serif font-black text-amber-950 mt-2 tracking-tight">
                    {selectedDoc.title}
                  </h4>
                  <p className="text-[11px] font-serif font-bold text-amber-800 mt-1">
                    출처: {selectedDoc.source} | 편찬시기: {selectedDoc.year}
                  </p>
                </div>
                
                <span className="font-serif text-[10px] text-amber-600/70 border border-amber-200 rounded p-1 font-bold select-none shrink-0 uppercase tracking-widest hidden sm:inline">
                  Archival Copy
                </span>
              </div>

              {/* Translation Content Scroll Text Block */}
              <div className="relative bg-[#f6efe4] p-5 rounded-2xl border border-amber-300/40 shadow-sm">
                <Quote className="absolute -top-3 -left-2 h-7 w-7 text-amber-900/10 block" />
                <p className="font-serif text-sm sm:text-base text-amber-950 leading-relaxed whitespace-pre-line text-justify pl-3 pr-2">
                  {selectedDoc.translation}
                </p>
              </div>

              {/* Historical Context Significance panel */}
              <div className="space-y-2">
                <h5 className="font-sans font-extrabold text-xs text-amber-900 uppercase tracking-widest flex items-center gap-1.5">
                  <AlertCircle className="h-3 w-3" />
                  지질·역사학적 과학 의의
                </h5>
                <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed text-justify">
                  {selectedDoc.significance}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2.3 역사적 지도 대조 분석 */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-600" />
          <h3 className="font-sans font-bold text-zinc-900 text-xl sm:text-2xl">
            2.3 역사적 지도(Map) 대조 분석
          </h3>
        </div>
        <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
          고지도는 당대 국가 행정가들과 일류 지리학자들이 동해와 영토 국경을 어떻게 인식했는지 한 번에 보여주는 확실한 거울입니다. 역사적 가치와 공용력을 지닌 3대 지도를 개방형 그래픽으로 대조하여 성찰하십시오.
        </p>

        {/* High-fidelity abstract map sandbox view */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive schematics view on Left */}
          <div className="lg:col-span-6 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between overflow-hidden relative min-h-[340px]">
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <span className="font-mono text-[9px] text-zinc-500 font-extrabold tracking-widest uppercase flex items-center gap-1">
                <Compass className="h-3 w-3 text-indigo-400 rotate-12" />
                SCHEMATIC CARTOGRAPHIC MODEL
              </span>
              <span className="font-mono text-xs rounded-full bg-zinc-800 text-indigo-400 border border-zinc-700 px-3 py-0.5">
                {selectedMap.year}
              </span>
            </div>

            {/* Simulated Map Drawings via SVGs */}
            <div className="relative h-60 w-full flex items-center justify-center my-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/40">
              {selectedMap.id === 'paldo' && (
                <svg className="w-full h-full text-zinc-600" viewBox="0 0 400 200">
                  {/* Joseon Peninsula silhouette abstraction */}
                  <path d="M 50 10 Q 90 20, 100 80 T 90 140 T 110 190 T 150 180" stroke="#4b5563" strokeWidth="2" fill="none" opacity="0.5" />
                  <text x="70" y="100" fill="#9ca3af" className="font-sans text-[11px] font-bold">대조선국 (Peninsula)</text>
                  
                  {/* East Sea wave abstraction */}
                  <path d="M 180 60 Q 230 40, 310 60" stroke="#134e4a" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                  <path d="M 190 120 Q 240 100, 320 120" stroke="#134e4a" strokeWidth="1" strokeDasharray="2 2" fill="none" />

                  {/* Two islands representing Ulleungdo and Usando */}
                  {/* Ulleungdo island */}
                  <circle cx="210" cy="90" r="14" fill="#0d9488" fillOpacity="0.8" stroke="#14b8a6" strokeWidth="1.5" />
                  <text x="190" y="65" fill="#f5f5f5" className="font-sans text-[9px] font-bold">무릉도 (울릉도)</text>

                  {/* Usando (Dokdo) drawn clearly on the map */}
                  <circle cx="270" cy="95" r="8" fill="#10b981" fillOpacity="0.8" stroke="#34d399" strokeWidth="1.5" />
                  <text x="250" y="120" fill="#a7f3d0" className="font-sans text-[10px] font-bold">우산도 (독도)</text>
                  
                  {/* Legend card */}
                  <rect x="290" y="130" width="100" height="60" rx="4" fill="#111827" stroke="#374151" strokeWidth="1" />
                  <text x="300" y="145" fill="#9ca3af" className="font-mono text-[8px] font-bold">CARTOGRAPHIC DATA</text>
                  <text x="300" y="158" fill="#e5e7eb" className="font-sans text-[9px] font-bold">1531년 관찬 지도</text>
                  <text x="300" y="171" fill="#10b981" className="font-sans text-[8px] font-semibold">동해 우산도 동시 확인</text>
                  <text x="300" y="181" fill="#38bdf8" className="font-sans text-[8px] font-semibold">완전 통치 수록</text>
                </svg>
              )}

              {selectedMap.id === 'sekisui' && (
                <svg className="w-full h-full text-zinc-600" viewBox="0 0 400 200">
                  {/* Japanese Honshu island silhouette abstraction */}
                  <path d="M 80 180 Q 200 130, 310 150 T 380 120" stroke="#d97706" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <text x="240" y="175" fill="#f59e0b" className="font-sans text-[10px] font-bold">일본 본토 (Colored Yellow)</text>
                  
                  {/* Oki Islands as boundary */}
                  <circle cx="160" cy="115" r="8" fill="#d97706" stroke="#f59e0b" strokeWidth="1" />
                  <text x="145" y="100" fill="#fbfbfb" className="font-sans text-[9px] font-bold">오키 제도 (서북 경계)</text>

                  {/* Two islands representing Ulleung & Dokdo - Completely uncolored/blank representing out-of-bounds */}
                  <circle cx="90" cy="65" r="12" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <text x="75" y="45" fill="#9ca3af" className="font-sans text-[9px] font-bold">울릉도 (죽도 - 무색)</text>

                  <circle cx="125" cy="55" r="7" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="120" y="80" fill="#9ca3af" className="font-sans text-[9px] font-bold">독도 (송도 - 무색)</text>

                  {/* Arrow indicating Boundary line */}
                  <line x1="160" y1="115" x2="140" y2="90" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                  <text x="175" y="130" fill="#ef4444" className="font-mono text-[8px] font-extrabold">↓ JAPAN TERRITORY LIMIT (오키섬 한계)</text>
                </svg>
              )}

              {selectedMap.id === 'sangoku' && (
                <svg className="w-full h-full text-zinc-600" viewBox="0 0 400 200">
                  {/* Korean Peninsula painted in bright yellow */}
                  <path d="M 40 10 Q 75 25, 80 80 T 70 145 T 100 180" stroke="#fca5a5" strokeWidth="2" fill="none" opacity="0.3" />
                  <rect x="35" y="50" width="60" height="100" fill="#eab308" fillOpacity="0.2" rx="6" stroke="#eab308" strokeWidth="1" />
                  <text x="45" y="105" fill="#fef08a" className="font-sans text-[10px] font-bold">조선 국토 (Yellow)</text>

                  {/* Japan mainland uncolored or grey */}
                  <rect x="230" y="120" width="130" height="50" fill="#4b5563" fillOpacity="0.3" rx="6" stroke="#4b5563" strokeWidth="1" />
                  <text x="270" y="145" fill="#e5e7eb" className="font-sans text-[10px] font-bold">일본 판도 (Grey)</text>

                  {/* Ulleung & Dokdo highlighted together in Yellow */}
                  <circle cx="150" cy="70" r="10" fill="#eab308" fillOpacity="0.9" stroke="#fef08a" strokeWidth="1.5" />
                  <circle cx="180" cy="75" r="6" fill="#eab308" fillOpacity="0.9" stroke="#fef08a" strokeWidth="1.5" />
                  <text x="135" y="55" fill="#fef08a" className="font-sans text-[9px] font-extrabold text-center">울릉 & 독도 (Yellow)</text>

                  {/* Red highlight circle and direct text of ownership admission */}
                  <rect x="110" y="90" width="120" height="24" rx="4" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" />
                  <text x="118" y="105" fill="#fca5a5" className="font-serif text-[8.5px] font-black">“조선의 소유 (朝鮮ノ持)“</text>
                  
                  {/* Linking line */}
                  <path d="M 170 75 L 170 90" stroke="#ef4444" strokeWidth="1" />
                </svg>
              )}
            </div>

            <div className="relative z-10 text-[10px] italic text-zinc-500 font-sans border-t border-zinc-800/80 pt-3">
              * 위 모식도는 해당 대고지도 원판에 규명된 지리적 채색 및 수록 위치를 교육적으로 도면화한 것입니다.
            </div>
          </div>

          {/* Map details Selection Tab on Right */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              {MAPS_DATA.map((item) => {
                const isActive = item.id === selectedMap.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedMapId(item.id);
                      onInteract('map_select');
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all duration-300 select-none cursor-pointer ${
                      isActive
                        ? 'border-indigo-600 bg-indigo-50/30 shadow-sm ring-1 ring-indigo-500'
                        : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${
                        isActive ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-500'
                      }`}>
                        <Map className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-zinc-400 font-extrabold tracking-widest block uppercase">
                          {item.type === 'kr_map' ? 'KOREAN MAP' : 'JAPANESE MAP'}
                        </span>
                        <h4 className="font-sans font-extrabold text-sm sm:text-base text-zinc-800 flex items-center gap-2">
                          {item.title}
                          <span className="text-xs font-mono font-medium text-zinc-500">({item.year})</span>
                        </h4>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map content info detail card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMap.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200 flex-1 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-indigo-600 tracking-wider uppercase block">지도 설명 및 작도 방식</span>
                  <p className="font-sans text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed text-justify">
                    {selectedMap.description}
                  </p>
                </div>

                <div className="border-t border-zinc-200 pt-4 mt-4 bg-white/50 p-3 rounded-xl">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 tracking-wider uppercase block">결정적인 입증 포인트</span>
                  <p className="font-sans text-xs font-extrabold text-zinc-800 mt-1">
                    {selectedMap.keyFact}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 2.4 안용복 사건과 한·일 외교 교섭 */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-600" />
          <h3 className="font-sans font-bold text-zinc-900 text-xl sm:text-2xl">
            2.4 안용복 사건과 한·일 외교 교섭
          </h3>
        </div>
        <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
          17세기 후반, 평범한 대조선국 어부 안용복의 목숨을 건 주도적 외교 투쟁은 에도 막부의 공식 결정을 이끌어내는 영토 분쟁 정론 해결의 극적인 모멘텀을 형성하였습니다. 연대기 순으로 대화식을 전개하십시오.
        </p>

        {/* Stepwise interactive timeline */}
        <div className="bg-slate-50/50 rounded-3xl border border-slate-200/80 p-5 sm:p-8">
          {/* Progress Nodes bar */}
          <div className="flex items-center justify-between gap-2 max-w-2xl mx-auto mb-8 relative px-2 sm:px-6">
            <div className="absolute top-[18px] left-[15%] right-[15%] h-[2px] bg-zinc-200 -z-0" />
            <div 
              className="absolute top-[18px] left-[15%] right-[15%] h-[2px] bg-indigo-600 -z-0 transition-all duration-500 ease-out" 
              style={{ width: `${(activeAhnStep / (AHN_TIMELINE.length - 1)) * 70}%` }}
            />
            
            {AHN_TIMELINE.map((evt, idx) => {
              const active = idx === activeAhnStep;
              const passed = idx < activeAhnStep;
              return (
                <button
                  key={evt.year}
                  onClick={() => {
                    setActiveAhnStep(idx);
                    onInteract('ahn_timeline');
                  }}
                  className="relative z-10 flex flex-col items-center select-none shrink-0"
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-all duration-300 ${
                    active 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-110' 
                      : passed
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-700'
                      : 'bg-white border-zinc-200 text-zinc-400 hover:border-zinc-300'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-bold mt-2 transition-colors ${
                    active ? 'text-indigo-600 font-extrabold' : 'text-zinc-500'
                  }`}>
                    {evt.year}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active step display cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAhnStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-zinc-200/80 p-6 sm:p-8 shadow-sm flex flex-col justify-between gap-6"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-indigo-600 font-bold tracking-tight">
                      Step 0{activeAhnStep + 1}
                    </span>
                    <h4 className="font-sans font-black text-zinc-800 text-base sm:text-lg">
                      {AHN_TIMELINE[activeAhnStep].title}
                    </h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 font-bold text-[10px] sm:text-xs">
                    {AHN_TIMELINE[activeAhnStep].badge}
                  </span>
                </div>

                <p className="text-zinc-600 text-sm leading-relaxed text-justify font-sans">
                  {AHN_TIMELINE[activeAhnStep].description}
                </p>

                {/* Sub details bullets */}
                <div className="mt-5 space-y-2.5">
                  {AHN_TIMELINE[activeAhnStep].details?.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans text-justify">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step navigations */}
              <div className="flex justify-between items-center border-t border-zinc-100 pt-4 mt-4">
                <button
                  disabled={activeAhnStep === 0}
                  onClick={() => {
                    setActiveAhnStep((prev) => Math.max(0, prev - 1));
                    onInteract('ahn_timeline');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold select-none border border-zinc-200 text-zinc-500 ${
                    activeAhnStep === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-zinc-50 hover:text-zinc-700'
                  }`}
                >
                  이전 단계
                </button>
                <span className="text-xs text-zinc-400 font-semibold font-mono">
                  {activeAhnStep + 1} / {AHN_TIMELINE.length}
                </span>
                <button
                  disabled={activeAhnStep === AHN_TIMELINE.length - 1}
                  onClick={() => {
                    setActiveAhnStep((prev) => Math.min(AHN_TIMELINE.length - 1, prev + 1));
                    onInteract('ahn_timeline');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold select-none bg-zinc-900 border border-zinc-900 text-white ${
                    activeAhnStep === AHN_TIMELINE.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-zinc-800'
                  }`}
                >
                  다음 단계
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
