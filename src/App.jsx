import { useMemo, useState } from 'react';

const TIME_LABELS = ['22:00', '00:00', '02:00', '04:00', '06:00'];

const WONDER_WEEK_LEAP4_INSIGHT =
  "루시는 지금 새로운 감각을 깨닫는 네 번째 도약인 '이벤트의 세계'를 지나는 중이에요. 밤새 아기의 머릿속이 온통 자라느라 바빴던 것뿐이니 하린님은 걱정 내려놓으셔도 돼요. 오늘 아침도 이미 충분히 잘 해내셨습니다. 🌱";

/** PRD 5.2 — Leap ID별 정성 데이터 맵 (안심형 UX 라이팅) */
export const WONDER_WEEKS_CONTENT_MAP = {
  Leap_01: {
    title: '감각의 변화',
    narrative:
      '주변 소리와 빛에 조금 더 예민해질 수 있는 시기예요. 모로 반사로 잠이 가벼워질 때가 있어도, 속싸개와 부드러운 사운드 케어로 충분히 편안함을 되찾을 수 있어요.',
    actions: [
      '☀️ 낮에는 따뜻한 마사지로 몸의 감각을 부드럽게 익숙하게 해볼까요?',
      '🌙 잠들기 전, 평소보다 살짝 높은 백색소음으로 작은 소리를 감싸 주셔도 좋아요.',
    ],
  },
  Leap_02: {
    title: '패턴의 세계',
    narrative:
      '밤과 낮의 리듬을 익히는 자연스러운 과정이에요. 렘 수면이 조금 늘고 뒤척임이 잦아져도, 몸이 새로운 패턴을 배우고 있다는 좋은 신호랍니다.',
    actions: [
      '☀️ 낮 수유·놀이 시간엔 채광을 충분히 주어 생체 리듬을 기분 좋게 깨워볼까요?',
      '🌙 밤에는 베베루시 무드등을 은은하게 맞춰, 잠들기 좋은 분위기를 함께 만들어 보세요.',
    ],
  },
  Leap_03: {
    title: '부드러운 움직임',
    narrative:
      '스스로 몸을 움직이고 싶어 하는 마음이 커지는 시기예요. 뒤척임과 머리 돌림이 늘어도 성장의 자연스러운 흐름이니, 하린님은 충분히 잘 돕고 계세요.',
    actions: [
      '☀️ 깨어 있을 때 가벼운 스트레칭 놀이로 몸을 편안하게 풀어볼까요?',
      '🌙 수면 중 체온이 살짝 올라갈 수 있으니, 매트리스 온도를 평소보다 0.5도 낮게 맞춰 주셔도 좋아요.',
    ],
  },
  Leap_04: {
    title: '이벤트의 세계',
    narrative:
      '깊은 잠이 평소보다 짧아지고, 밤중에 울음이 잦아질 수 있는 시기예요. 아픈 것이 아니라 뇌가 예쁘게 성장하는 과정이랍니다. 하린님, 오늘도 충분히 잘하고 계세요.',
    actions: [
      '☀️ 낮에는 가벼운 뒤집기 놀이로 에너지를 기분 좋게 발산해 볼까요?',
      '🌙 오늘 밤은 베베루시가 알아서 도울 테니, 편안히 주무셔도 괜찮아요.',
    ],
  },
  Leap_05: {
    title: '관계의 세계',
    narrative:
      '엄마와 자신이 서로 다른 존재라는 걸 알아가는 시기예요. 잠깐 깨었을 때 불안해할 수 있지만, 곁에 있다는 느낌만으로도 금방 마음이 안정돼요.',
    actions: [
      "☀️ 낮에는 '까꿍 놀이'로 눈앞에 안 보여도 다시 돌아온다는 따뜻한 확신을 나눠볼까요?",
      '🌙 자다 깨 울 때, 미리 녹음해 둔 목소리가 편안한 안심이 될 수 있어요.',
    ],
  },
};

/** PRD v1.3 — 대시보드 Mock 스키마 */
const mockDashboardData = {
  baby_name: '루시',
  device_status: {
    connected: true,
    battery_level: 88,
    sync_completed_at: '2026-05-23T07:00:00Z',
    milestones: [
      { step: 1, name: '베베루시 연결', status: 'COMPLETED' },
      { step: 2, name: '어젯밤 몸 상태 불러오기', status: 'COMPLETED' },
      { step: 3, name: '수면 이야기 정리', status: 'COMPLETED' },
    ],
  },
  co_parent: {
    partner_name: '아빠',
    is_linked: true,
    last_shared_at: '2026-05-22T08:15:00Z',
  },
};

const mockBabyScenario1 = {
  user_info: {
    parent_name: '송하린',
    baby_name: '루시',
    estimated_due_date: '2026-02-01',
    weeks_from_due_date: 17,
  },
  overnight_vital_data: {
    heart_rate_avg: 125,
    heart_rate_baseline: 110,
    resp_rate_avg: 32,
    resp_rate_baseline: 30,
    tossing_turning_count: 22,
    tossing_turning_baseline: 12,
    moro_reflex_count: 8,
    moro_reflex_baseline: 3,
    deep_sleep_minutes: 110,
    deep_sleep_baseline: 180,
    rem_sleep_minutes: 240,
    rem_sleep_baseline: 200,
    body_temperature: 37.1,
    body_temperature_baseline: 36.5,
    cry_events: [
      { timestamp: '02:14:00', duration_secs: 60, frequency_hz: 450 },
      { timestamp: '04:35:00', duration_secs: 80, frequency_hz: 480 },
    ],
    sleep_depth_trend: {
      time_labels: TIME_LABELS,
      baseline: [88, 92, 90, 91, 85],
      last_night: [82, 68, 45, 38, 52],
    },
    sleep_snapshot: {
      total_sleep_minutes: 615,
      wake_count: 1,
    },
  },
};

const mockBabyScenario2 = {
  user_info: {
    parent_name: '송하린',
    baby_name: '루시',
    estimated_due_date: '2026-02-01',
    weeks_from_due_date: 6,
  },
  overnight_vital_data: {
    heart_rate_avg: 112,
    heart_rate_baseline: 110,
    resp_rate_avg: 30,
    resp_rate_baseline: 30,
    tossing_turning_count: 11,
    tossing_turning_baseline: 12,
    deep_sleep_minutes: 177,
    deep_sleep_baseline: 180,
    rem_sleep_minutes: 202,
    rem_sleep_baseline: 200,
    moro_reflex_count: 2,
    moro_reflex_baseline: 3,
    body_temperature: 36.6,
    body_temperature_baseline: 36.5,
    cry_events: [],
    sleep_depth_trend: {
      time_labels: TIME_LABELS,
      baseline: [86, 91, 89, 90, 84],
      last_night: [85, 90, 88, 89, 83],
    },
    sleep_snapshot: {
      total_sleep_minutes: 615,
      wake_count: 0,
    },
  },
};

function formatSleepDuration(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}시간 ${minutes}분`;
}

function buildSleepSnapshotLabel(babyName, ov) {
  const snapshot = ov.sleep_snapshot;
  const totalMinutes =
    snapshot?.total_sleep_minutes ??
    ov.deep_sleep_minutes + ov.rem_sleep_minutes + (ov.light_sleep_minutes ?? 0);
  const wakeCount = snapshot?.wake_count ?? ov.cry_events?.length ?? 0;

  const wakePhrase =
    wakeCount === 0
      ? '새벽에 깨지 않고 숙면했어요'
      : `(새벽 깨어남 ${wakeCount}회)`;

  return `어젯밤 ${babyName}는 총 ${formatSleepDuration(totalMinutes)} 동안 잘 잤어요. ${wakePhrase} 🌙`;
}

function resolveLeapFromWeeks(weeks) {
  if (weeks >= 4 && weeks <= 5) return 'Leap_01';
  if (weeks >= 7 && weeks <= 9) return 'Leap_02';
  if (weeks >= 11 && weeks <= 12) return 'Leap_03';
  if (weeks >= 15 && weeks <= 19) return 'Leap_04';
  if (weeks >= 23 && weeks <= 26) return 'Leap_05';
  return null;
}

function leapSensorSatisfied(leapId, ov, deviations) {
  const { TT_dev, DS_dev } = deviations;
  switch (leapId) {
    case 'Leap_01': {
      const base = ov.moro_reflex_baseline;
      if (base <= 0) return false;
      return (ov.moro_reflex_count - ov.moro_reflex_baseline) / base >= 0.5;
    }
    case 'Leap_02': {
      const base = ov.rem_sleep_baseline;
      if (base <= 0) return false;
      return Math.abs(ov.rem_sleep_minutes - ov.rem_sleep_baseline) / base >= 0.2;
    }
    case 'Leap_03':
      return ov.body_temperature - ov.body_temperature_baseline >= 0.5;
    case 'Leap_04':
      return DS_dev >= 0.3 && ov.cry_events.length >= 2;
    case 'Leap_05': {
      const totalSecs = ov.cry_events.reduce((s, e) => s + (e.duration_secs || 0), 0);
      const refSecs = ov.cry_duration_ref_total_secs ?? 90;
      return ov.cry_events.length >= 1 && totalSecs >= refSecs * 1.25;
    }
    default:
      return false;
  }
}

function computeWonderWeekAnalysis(weeksFromDue, ov) {
  const HR_base = ov.heart_rate_baseline;
  const RR_base = ov.resp_rate_baseline;
  const TT_base = ov.tossing_turning_baseline;
  const DS_base = ov.deep_sleep_baseline;

  const HR_dev = HR_base > 0 ? Math.abs(ov.heart_rate_avg - HR_base) / HR_base : 0;
  const RR_dev = RR_base > 0 ? Math.abs(ov.resp_rate_avg - RR_base) / RR_base : 0;
  const TT_dev =
    TT_base > 0 ? (ov.tossing_turning_count - ov.tossing_turning_baseline) / TT_base : 0;
  const DS_dev =
    DS_base > 0 ? (ov.deep_sleep_baseline - ov.deep_sleep_minutes) / DS_base : 0;

  const deviationPayload = { HR_dev, RR_dev, TT_dev, DS_dev };
  const globalTriggerMet = TT_dev >= 0.3 || DS_dev >= 0.25;
  const leapByWeek = resolveLeapFromWeeks(weeksFromDue);

  let activeLeapId = null;
  if (leapByWeek && leapSensorSatisfied(leapByWeek, ov, deviationPayload) && globalTriggerMet) {
    activeLeapId = leapByWeek;
  }

  const wonder_week_status = activeLeapId != null;
  const ttPenalty = TT_dev > 0 ? TT_dev * 15 : 0;
  const dsPenalty = DS_dev > 0 ? DS_dev * 15 : 0;
  const cryCount = ov.cry_events?.length ?? 0;

  const rawScore =
    100 - HR_dev * 100 - RR_dev * 100 - ttPenalty - dsPenalty - cryCount * 5;
  const Condition_Score = Math.max(50, rawScore);

  let Status_Label;
  if (wonder_week_status) Status_Label = 'WONDER_WEEK';
  else if (Condition_Score >= 85) Status_Label = 'STABLE';
  else Status_Label = 'ATTENTION';

  const statusUi = getStatusPresentation(Status_Label);
  const narrativeSource =
    wonder_week_status && activeLeapId
      ? WONDER_WEEKS_CONTENT_MAP[activeLeapId]?.narrative ?? ''
      : buildFallbackNarrative(weeksFromDue, deviationPayload);
  const actions =
    wonder_week_status && activeLeapId
      ? WONDER_WEEKS_CONTENT_MAP[activeLeapId]?.actions ?? []
      : [];

  const sleepStabilityPct = Math.round(Condition_Score);

  return {
    deviations: deviationPayload,
    wonder_week_status,
    activeLeapId,
    leapByWeek,
    globalTriggerMet,
    Condition_Score: Math.round(Condition_Score * 10) / 10,
    sleepStabilityPct,
    Status_Label,
    statusUi,
    narrativeSource,
    actions,
    cryCount,
  };
}

function getStatusPresentation(label) {
  switch (label) {
    case 'WONDER_WEEK':
      return {
        headline: '성장 도약기 🧡',
        metricLabel: '수면 에너지',
        chipClass: 'bg-orange-100 text-orange-700 ring-1 ring-orange-200/80',
        scoreAccent: 'text-bebelucy-blue',
        subLabel: '🌱 성장의 터널을 지나는 중이에요',
      };
    case 'STABLE':
      return {
        headline: '편안한 하루',
        metricLabel: '오늘의 수면 안정도',
        chipClass: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80',
        scoreAccent: 'text-bebelucy-blue',
        subLabel: '어젯밤 리듬이 고르게 이어졌어요',
      };
    default:
      return {
        headline: '함께 살펴볼게요',
        metricLabel: '오늘의 수면 안정도',
        chipClass: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/80',
        scoreAccent: 'text-bebelucy-blue',
        subLabel: '작은 변화도 충분히 자연스러운 흐름이에요',
      };
  }
}

function buildFallbackNarrative(weeks) {
  const leapHint = resolveLeapFromWeeks(weeks);
  if (!leapHint) {
    return `출산일 ${weeks}주 차는 원더윅스 도약 구간 바깥이에요. 어젯밤 패턴도 평소와 비슷한 흐름이라, 특별히 걱정하실 필요는 없어요.`;
  }
  return '지금 주차는 성장 도약 구간에 가깝지만, 어젯밤 데이터만으로는 아직 도약 신호가 뚜렷하지 않아요. 편안한 마음으로 하루를 이어가 주세요.';
}

function getWonderWeekInsight(babyName, parentName, activeLeapId) {
  if (activeLeapId === 'Leap_04') {
    return WONDER_WEEK_LEAP4_INSIGHT.replace('루시', babyName).replace('하린님', `${parentName}님`);
  }
  return `${babyName}는 지금 '${WONDER_WEEKS_CONTENT_MAP[activeLeapId]?.title}'를 지나는 자연스러운 성장의 시기예요. ${parentName}님, 오늘 아침도 이미 충분히 잘 해내셨습니다. 🌱`;
}

function parseActionItem(raw) {
  const isDay = /^☀/.test(raw);
  const isNight = /^🌙/.test(raw);
  const text = raw.replace(/^[☀🌙]️?\s*/, '');
  return {
    period: isDay ? 'day' : isNight ? 'night' : 'guide',
    icon: isDay ? '☀️' : isNight ? '🌙' : '✦',
    text,
  };
}

function Highlight({ children }) {
  return <span className="font-bold text-bebelucy-blue">{children}</span>;
}

function buildNarrativeContent({ parentName, babyName, weeks, analysis }) {
  const { activeLeapId, Status_Label } = analysis;
  const leapContent = activeLeapId ? WONDER_WEEKS_CONTENT_MAP[activeLeapId] : null;

  if (Status_Label === 'WONDER_WEEK' && leapContent) {
    return (
      <>
        <span className="font-semibold text-slate-800">{parentName}님, </span>
        {getWonderWeekInsight(babyName, parentName, activeLeapId)} {analysis.narrativeSource}
      </>
    );
  }

  if (Status_Label === 'STABLE') {
    return (
      <>
        <span className="font-semibold text-slate-800">{parentName}님, </span>
        어젯밤 {babyName}의 잠은 전반적으로 편안하고 고른 흐름이었어요. 평소와 비슷한 리듬으로
        쉬었으니, 오늘은 마음 놓고 하루를 시작하셔도 좋아요. {analysis.narrativeSource}
      </>
    );
  }

  return (
    <>
      <span className="font-semibold text-slate-800">{parentName}님, </span>
      어젯밤 {babyName}의 패턴에 작은 변화가 있었지만, 아픈 신호는 아니에요. 아래 수면 추이를
      함께 보며 편안히 지켜봐 주세요. {analysis.narrativeSource}
    </>
  );
}

function buildLinePath(values, xScale, yScale) {
  return values
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i).toFixed(2)} ${yScale(v).toFixed(2)}`)
    .join(' ');
}

function buildAreaPath(values, xScale, yScale, baselineY) {
  const line = buildLinePath(values, xScale, yScale);
  const lastX = xScale(values.length - 1);
  const firstX = xScale(0);
  return `${line} L ${lastX.toFixed(2)} ${baselineY.toFixed(2)} L ${firstX.toFixed(2)} ${baselineY.toFixed(2)} Z`;
}

function SleepTrendLineChart({ labels, baseline, lastNight, chartKey, babyName, isWonderWeek }) {
  const width = 340;
  const height = 180;
  const pad = { top: 20, right: 16, bottom: 32, left: 16 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;

  const allValues = [...baseline, ...lastNight];
  const minY = Math.max(0, Math.min(...allValues) - 10);
  const maxY = Math.min(100, Math.max(...allValues) + 10);
  const range = maxY - minY || 1;

  const xScale = (i) => pad.left + (i / Math.max(labels.length - 1, 1)) * chartW;
  const yScale = (v) => pad.top + chartH - ((v - minY) / range) * chartH;
  const floorY = yScale(minY);

  const baselinePath = buildLinePath(baseline, xScale, yScale);
  const lastNightPath = buildLinePath(lastNight, xScale, yScale);
  const areaPath = buildAreaPath(lastNight, xScale, yScale, floorY);
  const gradientId = `sleepAreaFill-${chartKey}`;

  return (
    <div className="rounded-2xl bg-slate-50/80 p-4">
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-2">
          <svg width="20" height="2" aria-hidden>
            <line x1="0" y1="1" x2="20" y2="1" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" />
          </svg>
          평소 {babyName}의 평균
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-5 rounded-full bg-bebelucy-blue" />
          푹 잠든 시간
        </span>
        {isWonderWeek && (
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-5 rounded-full bg-amber-400" />
            아기의 뒤척임
          </span>
        )}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full transition-all duration-700 ease-out"
        role="img"
        aria-label={`${babyName}의 어젯밤 수면 흐름 그래프`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#31A0FF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#31A0FF" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((ratio) => {
          const y = pad.top + chartH * ratio;
          return (
            <line
              key={ratio}
              x1={pad.left}
              y1={y}
              x2={width - pad.right}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          );
        })}

        <path d={areaPath} fill={`url(#${gradientId})`} className="transition-all duration-700" />

        <path
          d={baselinePath}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="6 5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-700"
        />

        <path
          d={lastNightPath}
          fill="none"
          stroke="#31A0FF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-700"
        />

        {lastNight.map((v, i) => (
          <circle
            key={`pt-${labels[i]}-${chartKey}`}
            cx={xScale(i)}
            cy={yScale(v)}
            r="4"
            fill="#ffffff"
            stroke="#31A0FF"
            strokeWidth="2"
            className="transition-all duration-700"
          />
        ))}

        {labels.map((label, i) => (
          <text
            key={label}
            x={xScale(i)}
            y={height - 10}
            textAnchor="middle"
            className="fill-slate-400 text-[11px]"
          >
            {label}
          </text>
        ))}
      </svg>

      <p className="mt-3 text-center text-[11px] text-slate-400">
        {isWonderWeek
          ? `파란 선이 내려간 시간대일수록 ${babyName}의 뒤척임이 많았어요`
          : `높을수록 ${babyName}가 편안하게 푹 잔 시간이에요`}
      </p>
    </div>
  );
}

function ActionGuideCard({ item, index }) {
  const parsed = parseActionItem(item);
  const chipTone =
    parsed.period === 'day'
      ? 'bg-amber-50 text-amber-600 ring-amber-100'
      : parsed.period === 'night'
        ? 'bg-indigo-50 text-indigo-600 ring-indigo-100'
        : 'bg-sky-50 text-bebelucy-blue ring-sky-100';

  return (
    <label className="group flex cursor-pointer items-start gap-4 rounded-2xl bg-slate-50/70 p-4 transition hover:bg-slate-50">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg ring-1 ${chipTone}`}
        aria-hidden
      >
        {parsed.icon}
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-[11px] font-semibold tracking-wide text-slate-400">
          {parsed.period === 'day' ? '☀️ 낮에 해볼까요' : parsed.period === 'night' ? '🌙 밤에는 이렇게' : '오늘의 팁'}
        </p>
        <p className="mt-1 text-[15px] leading-relaxed text-slate-700">{parsed.text}</p>
      </div>
      <input
        type="checkbox"
        className="mt-3 h-5 w-5 shrink-0 rounded-md border-slate-300 text-bebelucy-blue focus:ring-bebelucy-blue/30"
      />
    </label>
  );
}

function Card({ children, className = '' }) {
  return (
    <section className={`rounded-3xl bg-white p-6 shadow-card ${className}`}>{children}</section>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-bebelucy-blue/70">
      {children}
    </p>
  );
}

function ScenarioSwitcher({ scenario, onChange }) {
  return (
    <div className="sticky top-0 z-40 border-b border-white/60 bg-white/80 px-4 py-3 backdrop-blur-xl">
      <p className="mb-2 text-center text-[10px] font-semibold tracking-wide text-slate-400">
        DEV · Mock 시나리오 전환
      </p>
      <div className="mx-auto flex max-w-md gap-2">
        {[
          { id: 'leap4', label: '시나리오 1 · 17주 Leap 4' },
          { id: 'stable', label: '시나리오 2 · 6주 안정기' },
        ].map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex-1 rounded-2xl px-3 py-2.5 text-xs font-semibold transition ${
              scenario === id
                ? 'bg-bebelucy-blue text-white shadow-float'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DeviceLinkChip() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 shadow-sm ring-1 ring-slate-100">
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      베베루시 연동 중
    </span>
  );
}

function buildCoreCauseBadge(analysis) {
  const ttPct = Math.round(Math.max(0, analysis.deviations.TT_dev) * 100);
  const dsPct = Math.round(Math.max(0, analysis.deviations.DS_dev) * 100);

  if (ttPct >= 30) {
    return {
      text: `⚠️ 어젯밤 뒤척임이 평소보다 ${ttPct}% 많았어요`,
      className: 'bg-orange-50 text-orange-600',
    };
  }
  if (dsPct >= 25) {
    return {
      text: `⚠️ 깊은 잠이 평소보다 ${dsPct}% 부족했어요`,
      className: 'bg-orange-50 text-orange-600',
    };
  }
  return {
    text: '✨ 어젯밤 수면 리듬이 고르게 이어졌어요',
    className: 'bg-emerald-50 text-emerald-600',
  };
}

function buildSleepPrescription(babyName, analysis) {
  const dsPct = Math.max(0, analysis.deviations.DS_dev);
  if (dsPct >= 0.25 || analysis.wonder_week_status) {
    return {
      headline: '부족한 깊은 잠, 낮잠으로 채워주세요',
      body: `${babyName}가 어제 충분히 깊게 자지 못해 오전 중에 쉽게 보챌 수 있어요. 11시 20분쯤 일찍 첫 낮잠을 재워 컨디션을 조절해 주는 게 좋아요.`,
    };
  }
  return {
    headline: '고른 리듬, 오늘도 이어가요',
    body: `${babyName}는 어젯밤 편안하게 쉬었어요. 평소 낮잠 시간을 유지하며 오늘도 여유롭게 보내보세요.`,
  };
}

function SleepPrescriptionCard({ prescription }) {
  return (
    <section className="rounded-3xl border border-slate-50 bg-white p-6 shadow-sm">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-50 text-2xl ring-1 ring-sky-100">
          💤
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs text-slate-400">오늘의 수면 처방</p>
          <h2 className="text-lg font-semibold leading-snug text-slate-800">
            {prescription.headline}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{prescription.body}</p>
        </div>
      </div>
    </section>
  );
}

function buildShareMissionPreview(babyName, wonderWeekStatus) {
  if (wonderWeekStatus) {
    return `(오늘의 공유 미션: 오후 3시 원더윅스 낮잠 케어 팁)`;
  }
  return `(오늘의 공유 미션: ${babyName}의 편안한 낮·밤 수면 리듬 이어가기)`;
}

function CoParentShareCard({ partnerName, babyName, missionPreview, onShare }) {
  return (
    <Card>
      <h2 className="text-lg font-bold text-slate-800">함께 키우는 분과 나눠보세요</h2>
      <p className="mt-2 text-sm text-slate-500">
        오늘 {babyName} 케어 팁을 {partnerName}에게 살짝 전해드릴게요.
      </p>
      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-lg font-bold text-sky-700">
          {partnerName.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">{partnerName}</p>
          <p className="text-xs text-slate-400">함께 케어하는 {partnerName}</p>
        </div>
      </div>
      <span className="mb-2 mt-4 block text-xs font-normal text-slate-400">
        {missionPreview}
      </span>
      <button
        type="button"
        onClick={onShare}
        className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-sky-600 shadow-sm ring-1 ring-sky-100 transition hover:bg-sky-50"
      >
        오늘의 케어 미션 전달하기
      </button>
    </Card>
  );
}

function DashboardScreen({
  dashboard,
  babyName,
  sleepSnapshotLabel,
  coreCauseBadge,
  sleepPrescription,
  missionPreview,
  onOpenReport,
  onShareMission,
}) {
  return (
    <div>
      <main className="mx-auto max-w-md space-y-5 px-5 pb-36 pt-6">
        <header className="flex items-center justify-between px-1">
          <div>
            <p className="text-lg font-bold tracking-tight text-bebelucy-blue-deep">BebeLucy</p>
            <p className="text-sm text-slate-500">베베 센스 · 아침 리포트</p>
          </div>
          <div className="rounded-2xl bg-white px-3 py-2 text-right shadow-card">
            <p className="text-[10px] font-medium text-slate-400">오늘</p>
            <p className="text-xs font-semibold text-slate-700">2026.05.23</p>
          </div>
        </header>

        <Card className="!p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-50 text-xl ring-2 ring-sky-100">
              👶
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h1 className="text-lg font-bold leading-snug text-slate-800">
                  {babyName}의 어젯밤 수면 분석이 완료되었어요 ✨
                </h1>
                <DeviceLinkChip />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {sleepSnapshotLabel}
              </p>
              <span
                className={`mt-2 inline-block rounded-md px-2.5 py-1 text-xs font-medium ${coreCauseBadge.className}`}
              >
                {coreCauseBadge.text}
              </span>
            </div>
          </div>
        </Card>

        <SleepPrescriptionCard prescription={sleepPrescription} />

        <CoParentShareCard
          partnerName={dashboard.co_parent.partner_name}
          babyName={babyName}
          missionPreview={missionPreview}
          onShare={onShareMission}
        />
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-30">
        <div className="mx-auto max-w-md px-5 pb-6 pt-3">
          <div className="rounded-3xl bg-white/90 p-4 shadow-float backdrop-blur-xl">
            <button
              type="button"
              onClick={onOpenReport}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 py-5 text-lg font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-sky-600 active:scale-[0.99]"
            >
              <span>{babyName}의 수면 분석 리포트 확인하기</span>
              <span aria-hidden>➔</span>
            </button>
            <p className="mt-3 text-center text-[10px] text-slate-400">
              {babyName}의 어젯밤 이야기가 준비됐어요
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ReportScreen({
  babyName,
  parentName,
  weeks,
  analysis,
  trend,
  scenario,
  onBack,
}) {
  return (
    <div>
      <main className="mx-auto max-w-md space-y-6 px-5 pb-36 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <span aria-hidden>←</span> 대시보드로 돌아가기
        </button>

        <header className="flex items-center justify-between px-1">
          <div>
            <p className="text-lg font-bold tracking-tight text-bebelucy-blue-deep">BebeLucy</p>
            <p className="text-sm text-slate-500">베베 센스 리포트</p>
          </div>
          <div className="rounded-2xl bg-white px-3 py-2 text-right shadow-card">
            <p className="text-[10px] font-medium text-slate-400">오늘</p>
            <p className="text-xs font-semibold text-slate-700">2026.05.23</p>
          </div>
        </header>

        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-bebelucy-tint/80 blur-2xl" />
          <div className="relative">
            <p className="mt-2 text-sm text-slate-500">
              {babyName} · 출산일 {weeks}주
            </p>

            <p className="mt-5 text-sm font-medium text-slate-600">
              {analysis.statusUi.metricLabel}
            </p>

            <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span
                    className={`text-5xl font-bold tracking-tight ${analysis.statusUi.scoreAccent}`}
                  >
                    {analysis.sleepStabilityPct}
                  </span>
                  <span className="mb-1 text-lg font-medium text-slate-400">%</span>
                  {analysis.Status_Label === 'WONDER_WEEK' && (
                    <span className="mb-1 text-sm font-medium text-emerald-700/90">
                      {analysis.statusUi.subLabel}
                    </span>
                  )}
                </div>
                {analysis.Status_Label !== 'WONDER_WEEK' && (
                  <p className="mt-1 text-sm text-slate-500">{analysis.statusUi.subLabel}</p>
                )}
              </div>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold ${analysis.statusUi.chipClass}`}
              >
                {analysis.Status_Label === 'WONDER_WEEK' && <span aria-hidden>🧡</span>}
                {analysis.statusUi.headline}
              </span>
            </div>

            {analysis.Status_Label === 'WONDER_WEEK' && (
              <div className="mt-5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50/80 px-4 py-3">
                <p className="text-sm font-semibold text-orange-800">
                  🧡 성장 도약기
                </p>
                <p className="mt-2 text-xs leading-relaxed text-orange-800/90">
                  {getWonderWeekInsight(babyName, parentName, analysis.activeLeapId)}
                </p>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-slate-800">오늘 {babyName} 이야기</h2>
          <p className="mt-4 text-[15px] leading-[1.75] text-slate-600">
            {buildNarrativeContent({ parentName, babyName, weeks, analysis })}
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-slate-800">
            오늘 {babyName}를 위한 맞춤 케어 팁 ✨
          </h2>
          <p className="mt-1 text-sm text-slate-500">오늘 낮과 밤은 이렇게 케어해볼까요?</p>
          {analysis.actions.length > 0 ? (
            <div className="mt-5 space-y-3">
              {analysis.actions.map((item, idx) => (
                <ActionGuideCard key={item} item={item} index={idx} />
              ))}
            </div>
          ) : (
            <p className="mt-5 rounded-2xl bg-slate-50 px-4 py-5 text-sm leading-relaxed text-slate-500">
              오늘은 특별한 케어 제안 없이, {babyName}의 편안한 리듬을 그대로 이어가 주시면
              충분해요.
            </p>
          )}
        </Card>

        <Card>
          <div className="flex items-end justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-800">
              {analysis.wonder_week_status
                ? '평소보다 얼마나 더 뒤척였을까요?'
                : '어젯밤 수면 흐름'}
            </h2>
            <span className="text-[11px] font-medium text-slate-400">22:00 – 06:00</span>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            {analysis.wonder_week_status
              ? '아기의 뒤척임과 푹 잠든 시간을 평소와 나란히 비교해 봤어요.'
              : '평소와 비슷하게 고르게 쉬었어요.'}
          </p>

          <div className="mt-5 pb-1">
            <SleepTrendLineChart
              key={scenario}
              chartKey={scenario}
              babyName={babyName}
              isWonderWeek={analysis.wonder_week_status}
              labels={trend.time_labels}
              baseline={trend.baseline}
              lastNight={trend.last_night}
            />
          </div>
        </Card>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-30">
        <div className="mx-auto max-w-md px-5 pb-6 pt-3">
          <div className="rounded-3xl bg-white/90 p-4 shadow-float backdrop-blur-xl">
            <button
              type="button"
              className="w-full rounded-2xl bg-bebelucy-blue py-4 text-[15px] font-bold text-white shadow-lg shadow-bebelucy-blue/30 transition hover:bg-bebelucy-blue-dark active:scale-[0.99]"
              onClick={() => alert('오늘의 케어 팁을 다이어리에 적어두었어요.')}
            >
              오늘 케어 기록 남기기
            </button>
            <p className="mt-3 px-1 text-center text-[10px] leading-relaxed text-slate-400">
              베베루시가 모은 데이터로 만든 육아 가이드예요. 걱정될 땐 소아과 선생님과 상의해 주세요.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('dashboard');
  const [babyData, setBabyData] = useState(() => structuredClone(mockBabyScenario1));
  const [dashboard] = useState(() => structuredClone(mockDashboardData));
  const [scenario, setScenario] = useState('leap4');

  const analysis = useMemo(() => {
    const w = babyData.user_info.weeks_from_due_date;
    return computeWonderWeekAnalysis(w, babyData.overnight_vital_data);
  }, [babyData]);

  const ov = babyData.overnight_vital_data;
  const trend = ov.sleep_depth_trend;
  const parentName = babyData.user_info.parent_name.trim();
  const babyName = babyData.user_info.baby_name.trim();
  const weeks = babyData.user_info.weeks_from_due_date;

  const sleepSnapshotLabel = useMemo(
    () => buildSleepSnapshotLabel(babyName, ov),
    [babyName, ov]
  );

  const missionPreview = useMemo(
    () => buildShareMissionPreview(babyName, analysis.wonder_week_status),
    [babyName, analysis.wonder_week_status]
  );

  const coreCauseBadge = useMemo(() => buildCoreCauseBadge(analysis), [analysis]);

  const sleepPrescription = useMemo(
    () => buildSleepPrescription(babyName, analysis),
    [babyName, analysis]
  );

  const applyScenario = (which) => {
    setScenario(which);
    setBabyData(structuredClone(which === 'leap4' ? mockBabyScenario1 : mockBabyScenario2));
  };

  const handleShareMission = () => {
    const partner = dashboard.co_parent.partner_name;
    alert(
      `💌 ${partner}에게 '오늘의 ${babyName} 맞춤 가이드'를 콕 찔러 보냈어요! 함께 케어하면 오늘 하루가 훨씬 가벼워질 거예요.`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-bebelucy-tint-soft to-bebelucy-tint">
      <ScenarioSwitcher scenario={scenario} onChange={applyScenario} />

      {view === 'dashboard' ? (
        <DashboardScreen
          dashboard={dashboard}
          babyName={babyName}
          sleepSnapshotLabel={sleepSnapshotLabel}
          coreCauseBadge={coreCauseBadge}
          sleepPrescription={sleepPrescription}
          missionPreview={missionPreview}
          onOpenReport={() => setView('report')}
          onShareMission={handleShareMission}
        />
      ) : (
        <ReportScreen
          babyName={babyName}
          parentName={parentName}
          weeks={weeks}
          analysis={analysis}
          trend={trend}
          scenario={scenario}
          onBack={() => setView('dashboard')}
        />
      )}
    </div>
  );
}
