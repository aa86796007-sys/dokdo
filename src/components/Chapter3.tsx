import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MODERN_TIMELINE } from '../data';
import { ShieldCheck, Scale, FileWarning, Eye, Compass, Anchor, LayoutGrid, Heart, AlertTriangle } from 'lucide-react';

interface Chapter3Props {
  onInteract: (key: string) => void;
  interactions: Record<string, boolean>;
}

export const Chapter3: React.FC<Chapter3Props> = ({ onInteract, interactions }) => {
  // Fishery agreement map views inside Section 3.3
  const [fisheryView, setFisheryView] = useState<'territorial' | 'intermediate' | 'joint'>('territorial');
  const [activeDefendTab, setActiveDefendTab] = useState<'rhee' | 'garrison' | 'milyak'>('rhee');

  return (
    <div className="space-y-12">
      {/* Title */}
      <div className="border-b border-zinc-100 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-700 font-mono text-xs font-semibold uppercase tracking-wider mb-3">
          Lesson 03
        </div>
        <h2 className="font-sans font-bold text-zinc-900 text-3xl sm:text-4xl tracking-tight">
          현대 독도 갈등의 전개와 평화적 상생 방안
        </h2>
        <p className="font-sans text-zinc-500 mt-2 text-base sm:text-lg">
          전후 질서 재편 과정에서 발생한 외교 교섭 누락, 해상 어업 분쟁과 영토 침탈 움직임을 이해하고, 무력 대립을 극복하여 동해 평화 공동체의 미래 지향적인 번영과 한일 소통 방식을 모색합니다.
        </p>
      </div>

      {/* 3.1 전후 영토 처리와 샌프란시스코 강화조약 */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-600" />
          <h3 className="font-sans font-bold text-zinc-900 text-xl sm:text-2xl">
            3.1 전후 영토 처리와 샌프란시스코 강화조약의 공백
          </h3>
        </div>
        <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
          제2차 세계대전의 종전 및 추축국 일본에 대한 처리 지령은 연합군의 절대 원칙론에 따라 출발했으나, 조약의 실제 문헌 초안 수정 과정의 치열한 로비 공작으로 오늘날 갈등의 불씨인 외교 문헌 공백을 남겼습니다.
        </p>

        {/* Binary cards layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card left: SCAPIN 677 */}
          <div className="bg-gradient-to-br from-emerald-50/50 to-white border border-emerald-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-lg bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold font-sans">
                  연합국 공식 지령 (성공적 복원)
                </span>
                <span className="font-mono text-xs font-bold text-emerald-600">SCAPIN 677호</span>
              </div>
              <h4 className="font-sans font-extrabold text-zinc-900 text-lg sm:text-xl flex items-center gap-2">
                <ShieldCheck className="h-5.5 w-5.5 text-emerald-600 block shrink-0" />
                연합국대표사령관 지령 제677호
              </h4>
              <p className="text-zinc-400 font-mono text-[10px] mt-0.5">선포일: 1946년 1월 29일</p>
              
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mt-4 text-justify font-sans">
                연합국 사령부는 한반도 영토 복원을 명령하는 이 지령에서 <b>“울릉도, 제주도, 그리고 독도 (Liancourt Rocks)”</b>를 일본의 자국 영역 지배로부터 완벽히 추출 배제하여 한국의 고유한 영주령으로 직지 환원하였습니다.
              </p>
            </div>

            <div className="border-t border-emerald-100/60 pt-4 mt-6 text-xs text-emerald-900 bg-emerald-50/40 p-3 rounded-xl font-sans">
              <strong>결정적 역사력:</strong> 일본 영토 정리에 있어 2차 대전 추축국 응징 전후 처리 원칙이 가장 공평하고 엄격히 적용된 국가 간 행제 명령서입니다.
            </div>
          </div>

          {/* Card right: SF Peace Treaty */}
          <div className="bg-gradient-to-br from-red-50/40 to-white border border-red-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs font-bold font-sans">
                  종국적 평화조약 (기록상 공백)
                </span>
                <span className="font-mono text-xs font-bold text-red-600">샌프란시스코 강화조약</span>
              </div>
              <h4 className="font-sans font-extrabold text-zinc-900 text-lg sm:text-xl flex items-center gap-2">
                <FileWarning className="h-5.5 w-5.5 text-red-500 block shrink-0" />
                샌프란시스코 강화조약 제2조 (a)항
              </h4>
              <p className="text-zinc-400 font-mono text-[10px] mt-0.5">체결일: 1951년 9월 8일</p>

              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mt-4 text-justify font-sans">
                수정을 거듭한 제2조 (a)항의 문헌에 <b>“한국의 자립 독립을 인정하며 제주도, 거문도, 울릉도를 포기한다”</b>라고 고유 도서들을 기재하였으나, 빈번한 로비의 여파로 <strong>최종본에서 ‘독도’의 구체적인 활칭 명이 직접 수록되지 못하는</strong> 실수가 발생했습니다.
              </p>
            </div>

            <div className="border-t border-red-100/60 pt-4 mt-6 text-xs text-red-900 bg-red-50/30 p-3 rounded-xl font-sans">
              <strong>일본의 억지 주장:</strong> 조약 문헌에 독도라는 글자가 선별 포함되지 않은 사각지대를 기회삼아 본토 영역설 분쟁화를 조장하는 왜곡된 논점의 출발지입니다.
            </div>
          </div>
        </div>
      </div>

      {/* 3.2 평화선 선포와 주권 수호의 노력 */}
      <div className="space-y-6 pt-6 animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-600" />
          <h3 className="font-sans font-bold text-zinc-900 text-xl sm:text-2xl">
            3.2 평화선 선포와 주권 수호의 노력
          </h3>
        </div>
        <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
          샌프란시스코 종전 조서 발효 직후, 무차별한 일본 측 침찰에 직면한 정부와 기층 민중 어부들은 단호하게 해상 물리적 저항망을 직수 구축했습니다. 3대 주요 사건의 전말을 성찰하십시오.
        </p>

        {/* Accordion Tabs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controllers on Left */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setActiveDefendTab('rhee');
                onInteract('defend_tab');
              }}
              className={`p-4 rounded-2xl text-left border transition-all duration-300 select-none cursor-pointer ${
                activeDefendTab === 'rhee'
                  ? 'bg-zinc-900 border-zinc-900 text-white shadow-md'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
              }`}
            >
              <span className="font-mono text-[9px] text-zinc-400 font-bold block uppercase tracking-wider">EVENTS 01</span>
              <h4 className="font-sans font-bold text-sm sm:text-base mt-1 flex items-center gap-2">
                <Anchor className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                이승만 평화선 선포 (1952년 1월)
              </h4>
            </button>

            <button
              onClick={() => {
                setActiveDefendTab('garrison');
                onInteract('defend_tab');
              }}
              className={`p-4 rounded-2xl text-left border transition-all duration-300 select-none cursor-pointer ${
                activeDefendTab === 'garrison'
                  ? 'bg-zinc-900 border-zinc-900 text-white shadow-md'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
              }`}
            >
              <span className="font-mono text-[9px] text-zinc-400 font-bold block uppercase tracking-wider">EVENTS 02</span>
              <h4 className="font-sans font-bold text-sm sm:text-base mt-1 flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                독도의용수비대의 영웅적 항쟁 (1953~1956)
              </h4>
            </button>

            <button
              onClick={() => {
                setActiveDefendTab('milyak');
                onInteract('defend_tab');
              }}
              className={`p-4 rounded-2xl text-left border transition-all duration-300 select-none cursor-pointer ${
                activeDefendTab === 'milyak'
                  ? 'bg-zinc-900 border-zinc-900 text-white shadow-md'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
              }`}
            >
              <span className="font-mono text-[9px] text-zinc-400 font-bold block uppercase tracking-wider">EVENTS 03</span>
              <h4 className="font-sans font-bold text-sm sm:text-base mt-1 flex items-center gap-2">
                <Scale className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                한일 국교정상화와 보류합의 (1965)
              </h4>
            </button>
          </div>

          {/* Expanded view on Right */}
          <div className="lg:col-span-8 bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 min-h-[300px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {activeDefendTab === 'rhee' && (
                <motion.div
                  key="rhee"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg font-sans font-extrabold text-zinc-800">이승만 평화선(Rhee Line)과 실효적 관할</h4>
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed text-justify">
                    건국 초기 극심한 정서적·군사적 격변 수역에서 대한민국 주권 훼손을 차단하기 위해 이승만 대통령은 한반도 주변 해양에 국가 ‘인접해역 주권선(Peace Line)’을 단호하게 선포했습니다.
                  </p>
                  <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100/50 text-indigo-900 text-xs sm:text-sm">
                    <strong>주권 수호의 영향:</strong> 선포된 가상 기선 내 독도를 자국 안전 통제영토로 명확히 소유 편입하였으며, 침입하는 일본 관제 군경함과 조업 밀수선을 직접 포획·나포함으로써 주권의 실효성을 국제관례에 등식화했습니다.
                  </div>
                </motion.div>
              )}

              {activeDefendTab === 'garrison' && (
                <motion.div
                  key="garrison"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg font-sans font-extrabold text-zinc-800 flex items-center gap-2">
                    독도의용수비대의 눈물겨운 전설
                    <span className="text-xs bg-red-100 hover:bg-red-200 text-red-800 font-extrabold rounded px-2 py-0.5">홍순칠 대장</span>
                  </h4>
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed text-justify">
                    한국전쟁의 난리 통에 혼잡한 기회를 타서 일본 측 정찰선들이 버젓이 Dokdo 육지에 무단 상륙해 자국 영토 편입 기둥을 말뚝질하는 등 노골적인 침찰을 감행했습니다.
                  </p>
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-amber-900 text-xs leading-relaxed text-justify">
                    <strong>나무 대포의 지략과 전설:</strong> 울릉의 전경 군인 홍순칠 대장과 젊은 자원어민들이 오직 애국의 충정으로 ‘독도의용수비대’를 조직하고 바위섬에 상시 천막 주둔했습니다. 이들은 무기가 절대적으로 결핍하자, 소나무 고목을 깎아 가짜 박격포 모형을 절벽 요충에 가설하여 적 해경선을 위장 격퇴하는 기지를 발휘하였으며, 육탄 방어 끝에 독도를 우리 영토로 온몸을 바쳐 사수하였습니다.
                  </div>
                </motion.div>
              )}

              {activeDefendTab === 'milyak' && (
                <motion.div
                  key="milyak"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg font-sans font-extrabold text-zinc-800">1965년 한일국교정상화와 독도 문제보류</h4>
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed text-justify">
                    청구권 협정 및 국교 회복 회담당시 양국 최상위 중개 고위층은 <b>독도 영유권을 공동 문서상에 직접 규정해 못 박지 않는 대신</b> “미결의 과제로서 묵인 보류하고 소강 대치를 유예한다”는 구두 합의(일명 독도 밀약)를 통해 가파른 현실 갈등의 모서리를 수면 아래로 임시 가라앉혔습니다.
                  </p>
                  <p className="text-xs text-zinc-500 italic">
                    * 이는 양국 간 즉시의 직접 충돌을 완화했으나, 미래 영토 경계 획정의 해결을 원천 보류시켜 현대 갈등이 재점화되는 불완전한 외교 공백의 불씨를 안고 있었습니다.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-sans border-t border-zinc-200 pt-4 mt-6">
              <Eye className="h-3.5 w-3.5" />
              <span>각 탭을 눌러 대한민국 수호 영웅들의 투쟁과 역사 유예의 배경을 상세하게 성찰하세요.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3.3 신한일어업협정과 갈등의 재점화 */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-600" />
          <h3 className="font-sans font-bold text-zinc-900 text-xl sm:text-2xl">
            3.3 신한일어업협정(1998년)과 중간수역 설정
          </h3>
        </div>
        <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
          1994년 유엔 해양법협약 발효에 따라 200해리 배타적 경제수역(EEZ) 체제가 공인되자, 울릉도와 일본 오키섬 간 중첩 수역 조율이 시급해졌습니다. 이에 국가 간 합의가 불투명하자 마찰 지대 중심을 <b>‘중간수역’</b>으로 조속 타결하였습니다.
        </p>

        {/* Dynamic Maritime boundary diagram on Left & description on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* SVG Map of East Sea Fishery Agreement */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none" />

            <div className="flex justify-between items-center relative z-10">
              <span className="font-mono text-[9px] font-bold text-indigo-400 tracking-widest uppercase">
                Interactive Maritime Boundary Layout
              </span>
              <span className="text-[10px] text-zinc-400 bg-zinc-800 border border-zinc-700 font-sans px-2.5 py-0.5 rounded-md">
                영해: 12해리 | 중간수역 폭: 공동 관리
              </span>
            </div>

            {/* Fishing map SVG */}
            <div className="relative h-64 w-full flex items-center justify-center my-4 rounded-xl bg-zinc-950/50 border border-zinc-900 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 500 220">
                {/* East Sea Ambient Grid water */}
                <path d="M 50 150 Q 250 100, 450 150" stroke="#1e293b" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="3 3" />
                <path d="M 50 180 Q 250 130, 450 180" stroke="#1e293b" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="3 3" />

                {/* Observer points */}
                {/* Ulleungdo Left */}
                <circle cx="100" cy="110" r="16" fill="#0369a1" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="75" y="80" fill="#e0f2fe" className="font-sans text-[10px] font-black">울릉도 (Korea)</text>

                {/* Oki Island Right */}
                <circle cx="400" cy="120" r="14" fill="#3f3f46" stroke="#71717a" strokeWidth="1.5" opacity="0.8" />
                <text x="385" y="95" fill="#f4f4f5" className="font-sans text-[10px] font-bold">오키 제도 (Japan)</text>

                {/* Dokdo Middle */}
                <circle cx="230" cy="115" r="8" fill="#10b981" stroke="#34d399" strokeWidth="1.5" />
                <text x="215" y="95" fill="#a7f3d0" className="font-sans text-[11px] font-extrabold shadow-sm">독도</text>

                {/* 1. Territorial view overlay */}
                {fisheryView === 'territorial' && (
                  <>
                    {/* Exclusive 12Nm territorial sea ring around Dokdo */}
                    <circle cx="230" cy="115" r="24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 2" />
                    <circle cx="230" cy="115" r="24" fill="#10b981" fillOpacity="0.15" />
                    <text x="225" y="152" fill="#34d399" className="font-sans text-[9px] font-bold">완전주권 12해리 영해 (Exclusive)</text>
                    
                    {/* Ulleungdo 12Nm */}
                    <circle cx="100" cy="110" r="32" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
                  </>
                )}

                {/* 2. Overlapping Intermediate Zone Highlight */}
                {fisheryView === 'intermediate' && (
                  <>
                    {/* Intermediate Zone box drawn in the middle enclosing Dokdo */}
                    <rect x="150" y="40" width="160" height="140" rx="12" fill="#ca8a04" fillOpacity="0.12" stroke="#eab308" strokeWidth="2" strokeDasharray="6 3" />
                    <text x="175" y="165" fill="#fef08a" className="font-sans text-[10px] font-black">신한일어업 중간수역 (Joint area)</text>
                    
                    {/* Direction arrow line illustration between Ulleungdo and Oki Island boundary */}
                    <line x1="116" y1="110" x2="386" y2="120" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="190" y="200" fill="#fca5a5" className="font-mono text-[9px]">마찰방지 완충 관리 구역</text>
                  </>
                )}

                {/* 3. Joint Analysis */}
                {fisheryView === 'joint' && (
                  <>
                    {/* Composite layout */}
                    <rect x="150" y="40" width="160" height="140" rx="12" fill="#ca8a04" fillOpacity="0.06" stroke="#ca8a04" strokeWidth="1" />
                    <circle cx="230" cy="115" r="24" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5" />
                    <path d="M 100 110 L 230 115" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="110" y="130" fill="#93c5fd" className="font-mono text-[8px]">87.4km 국경 거리</text>
                    <text x="210" y="155" fill="#fcd34d" className="font-sans text-[9px] font-bold text-center">중간수역 내 고립화된 주도적 형태</text>
                  </>
                )}
              </svg>
            </div>

            {/* Interactive Selector */}
            <div className="grid grid-cols-3 gap-2 relative z-10">
              <button
                onClick={() => {
                  setFisheryView('territorial');
                  onInteract('fishery_view');
                }}
                className={`p-2.5 rounded-xl border text-center transition-colors text-xs font-semibold cursor-pointer ${
                  fisheryView === 'territorial'
                    ? 'bg-emerald-600 border-emerald-500 text-white font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                1. 독도 영해 (12해리)
              </button>
              <button
                onClick={() => {
                  setFisheryView('intermediate');
                  onInteract('fishery_view');
                }}
                className={`p-2.5 rounded-xl border text-center transition-colors text-xs font-semibold cursor-pointer ${
                  fisheryView === 'intermediate'
                    ? 'bg-amber-600 border-amber-500 text-white font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                2. 중간수역 범위
              </button>
              <button
                onClick={() => {
                  setFisheryView('joint');
                  onInteract('fishery_view');
                }}
                className={`p-2.5 rounded-xl border text-center transition-colors text-xs font-semibold cursor-pointer ${
                  fisheryView === 'joint'
                    ? 'bg-indigo-600 border-indigo-500 text-white font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                3. 종합 중첩 고찰
              </button>
            </div>
          </div>

          {/* Details on Right */}
          <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-zinc-400 tracking-wider block uppercase mb-1">
                주권 쟁점 분석
              </span>
              <h4 className="font-sans font-extrabold text-zinc-900 text-lg">중간수역 설정의 쟁점론</h4>
              
              <div className="space-y-4 mt-5">
                <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                  <h5 className="font-sans font-bold text-xs text-zinc-800 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                    국내 우려 및 영도기 기선 누락
                  </h5>
                  <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mt-1.5 text-justify">
                    한국의 완전 주권 하에 놓인 독도가 한일 공동 어업 중간 관리구류에 포함되면서 일본에 빌미를 주어 “독도가 한국 단독 영토가 아닌 완충 지대에 있다”는 식의 <b>왜곡된 주권 침손 논쟁으로 폭발하는 계기</b>를 주었습니다.
                  </p>
                </div>

                <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                  <h5 className="font-sans font-bold text-xs text-zinc-800 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                    2005년 이후 일방적 도발 및 역사 왜곡
                  </h5>
                  <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mt-1.5 text-justify">
                    피해 세대로 분장한 시마네현 어민들을 앞세워 매년 2월 22일을 <b>‘다케시마의 날’ 조례</b>로 제정 선포하고, 일본 초·중·고 검인정 교과서의 교육지침을 개정하여 “한국이 독도를 불법 점유하고 있다”는 적반하장의 교육을 체계화하고 있습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Warning callout for peace */}
            <div className="border shadow-sm border-amber-200 bg-amber-50/50 p-4 rounded-xl mt-6">
              <span className="text-[11px] font-extrabold text-amber-800 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" />
                평화 지향적 상생해법의 가치
              </span>
              <p className="text-[11px] text-zinc-600 mt-1.5 text-justify leading-relaxed">
                갈등은 미몽적인 대결로 극복되지 않습니다. 과거 자국의 공식 입증 문서(태정관 지령 마뉴스크립트 등)에 투사된 사실론적 진실을 똑바로 보고, 해양 공동 영토의 가치 파트너로서 한일 공동 교재 집필이나 아카데믹 청소년 교류를 통한 <b>체계적인 평화공동체</b> 형성이 미래 청소년 세대에게 당면한 핵심 평화 과제입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
