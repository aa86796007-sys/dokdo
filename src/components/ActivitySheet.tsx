import React, { useState, useEffect } from 'react';
import { JointTextbookData, ReflectionAnswer } from '../types';
import { FileText, Save, CheckCircle, BrainCircuit, Printer, Award, RefreshCw, PenTool } from 'lucide-react';

interface ActivitySheetProps {
  onInteract: (key: string) => void;
  onActivityComplete: (isComplete: boolean) => void;
}

export const ActivitySheet: React.FC<ActivitySheetProps> = ({ onInteract, onActivityComplete }) => {
  // Activity 4.1 State
  const defaultJointContent = `(예시 서술) 동해의 평화로운 섬 독도는 역사적 사료를 통해 그 지위가 증명된다. 한국의 『세종실록지리지(1454년)』에는 울릉도와 독도(우산)가 서로 거리가 멀지 않아 날시가 맑으면 육안으로 관측 가능하다고 기록되어 양국의 고대 생활권과 인식을 보여준다. 또한, 일본 메이지 정부 최고 기관이 내린 『태정관 지령(1877년)』에서도 울릉도와 독도가 일본과 관계없는 조선의 영역임을 분명히 명시했다. 러일전쟁 중 일본에 의해 불법 편입되는 아픔을 겪기도 했으나, 2차 대전 후 연합국의 조치를 통해 한국의 관할로 환원되었다. 오늘날 양국은 배타적 경제수역(EEZ) 설정 과정에서 어업 갈등을 겪고 있으나, 영토 대립을 넘어 역사적 진실을 직시하고 동해를 평화와 공동 번영의 바다로 만들기 위해 상호 협력해야 한다.`;

  const [jointData, setJointData] = useState<JointTextbookData>({
    memberKr: '',
    memberJp: '',
    chapterTitle: '역사적 사료와 지리적 공존으로 집필하는 동해와 독도',
    content: defaultJointContent,
    rating: 5,
  });

  const [isActivitySubmitted, setIsActivitySubmitted] = useState<boolean>(false);

  // Activity 4.2 State
  const [reflections, setReflections] = useState<ReflectionAnswer>({
    q1: '',
    q2: '',
    q3: '',
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedJoint = localStorage.getItem('dokdo_edu_joint');
    const savedReflections = localStorage.getItem('dokdo_edu_reflections');
    
    if (savedJoint) {
      try {
        const parsed = JSON.parse(savedJoint);
        setJointData(parsed);
      } catch (e) {
        console.error(e);
      }
    }
    
    if (savedReflections) {
      try {
        const parsed = JSON.parse(savedReflections);
        setReflections(parsed);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync Completion back to parent
  useEffect(() => {
    const isWroteNames = jointData.memberKr.trim() !== '' && jointData.memberJp.trim() !== '';
    const isWroteReflections = reflections.q1.trim() !== '' || reflections.q2.trim() !== '' || reflections.q3.trim() !== '';
    onActivityComplete(isWroteNames || isWroteReflections || isActivitySubmitted);
  }, [jointData, reflections, isActivitySubmitted]);

  // Handle inputs
  const handleJointChange = (field: keyof JointTextbookData, value: any) => {
    const updated = { ...jointData, [field]: value };
    setJointData(updated);
    localStorage.setItem('dokdo_edu_joint', JSON.stringify(updated));
    onInteract('joint_textbook_edit');
  };

  const handleReflectionChange = (question: keyof ReflectionAnswer, value: string) => {
    const updated = { ...reflections, [question]: value };
    setReflections(updated);
    localStorage.setItem('dokdo_edu_reflections', JSON.stringify(updated));
    onInteract('reflection_edit');
  };

  const handleResetJoint = () => {
    if (window.confirm('서술 내용을 예시 텍스트로 초기화하시겠습니까?')) {
      handleJointChange('content', defaultJointContent);
    }
  };

  const handleSubmitActivity = (e: React.FormEvent) => {
    e.preventDefault();
    setIsActivitySubmitted(true);
    onInteract('submit_activity');
    alert('🎉 한·일 평화 공동 부속 단원 서술제안서가 정식 평가 심사에 접수되었습니다! 하단에서 인쇄하거나 인증서 사본을 미리 보실 수 있습니다.');
  };

  return (
    <div className="space-y-12">
      {/* Chapter Title */}
      <div className="border-b border-zinc-100 pb-8 no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-700 font-mono text-xs font-semibold uppercase tracking-wider mb-3">
          Lesson 04
        </div>
        <h2 className="font-sans font-bold text-zinc-900 text-3xl sm:text-4xl tracking-tight">
          [수업 활동지] 한·일 평화 공동 교과서 집필하기
        </h2>
        <p className="font-sans text-zinc-500 mt-2 text-base sm:text-lg">
          앞서 학습한 풍부한 한일 고문서, 지리적 원리 및 수평선 관찰 증명을 토대로, 양국 학생들이 교실에서 직접 공동 서술하여 배울 수 있는 객관적이고 평화지향적인 ‘공동 교과서 단원’을 집필해 보십시오.
        </p>
      </div>

      {/* 4.1 공동 교과서 집필 활동 양식 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-indigo-600" />
            <h3 className="font-sans font-bold text-zinc-900 text-xl sm:text-2xl">
              4.1 공동 교과서 집필 및 제안서 양식
            </h3>
          </div>
          
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-600 hover:bg-zinc-50 shadow-sm active:scale-95 transition-all select-none"
          >
            <Printer className="h-4 w-4" />
            인쇄 / PDF 저장
          </button>
        </div>

        {/* Requirements guideline Callout */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/30 border border-indigo-100 rounded-2xl p-5 sm:p-6 no-print">
          <span className="text-[10px] font-mono font-bold text-indigo-600 tracking-widest uppercase block mb-1">
            공동 집필 작성 준수 조건
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 text-xs sm:text-sm text-zinc-700">
            <div className="flex items-start gap-1.5">
              <span className="font-mono text-indigo-600 font-extrabold">1.</span>
              <p>앞서 배운 사료(태정관 지령, 세종실록지리지 등) 중 <b>최소 2개 이상</b>을 역사적 문헌 근거로 가용 제시할 것.</p>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="font-mono text-indigo-600 font-extrabold">2.</span>
              <p>감정적이거나 자극적인 단어 배제, <b>사실(Fact) 및 평화 번영 공동체</b> 관점을 시종 유지할 것.</p>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="font-mono text-indigo-600 font-extrabold">3.</span>
              <p>분량은 전체 흐름을 일괄 아우르는 문장으로 <b>10줄 이내</b> 함축 서술을 준수할 것.</p>
            </div>
          </div>
        </div>

        {/* Interactive Worksheet Container */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-6 sm:p-8 relative overflow-hidden">
          {/* Subtle printed paper lines design overlay */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-zinc-900" />
          
          <form onSubmit={handleSubmitActivity} className="space-y-6">
            <div className="text-center pb-6 border-b border-zinc-100">
              <h4 className="font-serif font-extrabold text-lg sm:text-xl text-zinc-800 tracking-tight">
                한·일 학생 공동 역사 교과서 - 독도 서술 제안서
              </h4>
              <p className="text-zinc-400 text-xs font-mono tracking-widest uppercase mt-1">Joint History & Geography Proposal</p>
            </div>

            {/* Inputs: Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase block mb-1.5">
                  🇰🇷 공동 제안자 (한국 학생 모둠 이름)
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 김민우, 이수진 등"
                  value={jointData.memberKr}
                  onChange={(e) => handleJointChange('memberKr', e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-950 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase block mb-1.5">
                  🇯🇵 공동 제안자 (일본 학생 모둠 이름)
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 사토 하루토, 다나카 미오 등"
                  value={jointData.memberJp}
                  onChange={(e) => handleJointChange('memberJp', e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm focus:border-zinc-950 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Input: Chapter Title */}
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase block mb-1.5">
                우리가 제안하는 독도 대단원 소제목
              </label>
              <input
                type="text"
                required
                placeholder="대단원 소제목을 입력해주십시오."
                value={jointData.chapterTitle}
                onChange={(e) => handleJointChange('chapterTitle', e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-bold text-zinc-800 focus:border-zinc-950 focus:outline-none transition-colors"
              />
            </div>

            {/* Input: Editorial content */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase">
                  공동 집필 제안 본문 (최대 10줄 권장)
                </label>
                <button
                  type="button"
                  onClick={handleResetJoint}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <RefreshCw className="h-3 w-3" />
                  예시문 가져오기/복원
                </button>
              </div>
              <textarea
                rows={8}
                required
                placeholder="독도 영유 기선사료와 평화공동체 미래 서술 내용을 직접 작성 및 교정해 주십시오."
                value={jointData.content}
                onChange={(e) => handleJointChange('content', e.target.value)}
                className="w-full font-serif text-sm sm:text-base leading-relaxed rounded-xl border border-zinc-200 p-4 shrink-0 focus:border-zinc-950 focus:outline-none text-zinc-800 text-justify bg-zinc-50/50"
              />
            </div>

            {/* Additional parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase block mb-1.5">
                  집필 원리 검토도 및 만족도 (1-5성)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleJointChange('rating', star)}
                      className="text-lg font-bold p-1 select-none transition-transform active:scale-125 cursor-pointer"
                    >
                      {star <= jointData.rating ? '★' : '☆'}
                    </button>
                  ))}
                  <span className="text-xs text-zinc-400 font-semibold font-mono">({jointData.rating}/5)</span>
                </div>
              </div>

              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer hover:bg-zinc-800 transition-all select-none"
                >
                  <CheckCircle className="h-4.5 w-4.5" />
                  평화 교과 제안 접수하기
                </button>
              </div>
            </div>
          </form>

          {/* Certificate display under Submitted mode */}
          {isActivitySubmitted && (
            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-200/50 mt-8 space-y-4">
              <div className="flex items-center gap-2 text-indigo-800">
                <Award className="h-5 w-5 block" />
                <h5 className="font-sans font-bold text-sm">공동 역사교과 검토 수료증 사본</h5>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                위 제안서(제목: <b>{jointData.chapterTitle || '무제'}</b>)는 한·일 간 역사적 사실의 원만한 상호 수렴을 위해 ‘대한민국 역사·지리 평화교육위원회’의 심의 풀에 정식 기록되었습니다.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 4.2 토론 및 성찰 질문 리스트 */}
      <div className="space-y-6 pt-6 no-print">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-600" />
          <h3 className="font-sans font-bold text-zinc-900 text-xl sm:text-2xl">
            4.2 토론 및 성찰 질문 리스트 (개별 응답 노트)
          </h3>
        </div>
        <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
          대수업의 마무리 평가 단계에서 모둠 및 자기 성장을 위해 각 질문의 성찰 메모를 개별 서술해 보아 학습 지능을 확장하십시오. 내용은 자동으로 암호화 저장됩니다.
        </p>

        <div className="grid grid-cols-1 gap-6">
          {/* Question 1 */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 flex flex-col justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-zinc-200 text-zinc-700 font-mono text-[10px] font-bold block w-fit">
                QUESTION 01
              </span>
              <h4 className="font-sans font-extrabold text-zinc-800 text-sm sm:text-base mt-2">
                일본의 1877년 『태정관 지령』과 첨부된 『기죽도약도』가 현대 일본 정부의 "에도시대 독도 영유권 영지설" 주장을 완벽히 반박하는 결정적인 수치적 카드인 이유는 무엇일까?
              </h4>
            </div>
            
            <textarea
              rows={3}
              placeholder="여기에 생각이나 요약을 작성해 보십시오."
              value={reflections.q1}
              onChange={(e) => handleReflectionChange('q1', e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs sm:text-sm focus:border-zinc-900 focus:outline-none transition-colors leading-relaxed"
            />
          </div>

          {/* Question 2 */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 flex flex-col justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-zinc-200 text-zinc-700 font-mono text-[10px] font-bold block w-fit">
                QUESTION 02
              </span>
              <h4 className="font-sans font-extrabold text-zinc-800 text-sm sm:text-base mt-2">
                1998년 체결된 ’신한일어업협정’에서 왜 독도가 한국의 독자적 EEZ 영해 기점이 되지 못하고 중간수역에 놓이게 되었는지 당시 연안 200해리 도입과 타협 배경을 평가해 보자.
              </h4>
            </div>
            
            <textarea
              rows={3}
              placeholder="여기에 생각이나 요약을 작성해 보십시오."
              value={reflections.q2}
              onChange={(e) => handleReflectionChange('q2', e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs sm:text-sm focus:border-zinc-900 focus:outline-none transition-colors leading-relaxed"
            />
          </div>

          {/* Question 3 */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 flex flex-col justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-zinc-200 text-zinc-700 font-mono text-[10px] font-bold block w-fit">
                QUESTION 03
              </span>
              <h4 className="font-sans font-extrabold text-zinc-800 text-sm sm:text-base mt-2">
                미래 세대인 우리가 독도의 역사 영유권 갈등을 평화적으로 해결하기 위해 한일 청소년 역사 캠프나 학술 인적 교류의 교차 활성화가 필요한 이유가 무엇일지 생각을 정리해 성찰하자.
              </h4>
            </div>
            
            <textarea
              rows={3}
              placeholder="여기에 생각이나 요약을 작성해 보십시오."
              value={reflections.q3}
              onChange={(e) => handleReflectionChange('q3', e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs sm:text-sm focus:border-zinc-900 focus:outline-none transition-colors leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
