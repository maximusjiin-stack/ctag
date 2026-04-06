'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  Bell,
  Camera,
  CheckCircle2,
  ChevronRight,
  Droplets,
  Gift,
  Home,
  Leaf,
  Receipt,
  ScanLine,
  ScanSearch,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingDown,
  Trophy,
  Users,
  Wallet,
} from 'lucide-react';

const tabs = [
  { key: 'home', label: '홈', icon: Home },
  { key: 'analytics', label: '분석', icon: BarChart3 },
  { key: 'scan', label: '스캔', icon: ScanLine },
  { key: 'recommend', label: '추천', icon: Sparkles },
  { key: 'reward', label: '리워드', icon: Gift },
] as const;

type TabKey = (typeof tabs)[number]['key'];

type RecommendItem = {
  name: string;
  saving: string;
  desc: string;
};

type RewardItem = {
  title: string;
  desc: string;
};

const featureCards = [
  {
    title: '스캔 기반 데이터화',
    desc: '영수증을 읽고 소비 항목을 구조화해서 개인 탄소 데이터로 바꿔.',
    icon: Receipt,
  },
  {
    title: '행동 분석',
    desc: '카테고리별 배출량, 추세, 또래 평균 비교까지 한 화면에서 보여줘.',
    icon: BarChart3,
  },
  {
    title: '보상 연결',
    desc: '보험, 카드, 쿠폰 같은 혜택으로 행동 변화를 계속 유지하게 도와줘.',
    icon: Wallet,
  },
] as const;

const recommendationData: RecommendItem[] = [
  { name: '텀블러 리필 커피', saving: '-30%', desc: '일회용 컵 대신 텀블러 사용 시 절감 가능' },
  { name: '로컬 제철 과일', saving: '-18%', desc: '수입 과일 대비 운송 탄소 절감' },
  { name: '리필형 세제', saving: '-22%', desc: '플라스틱 패키지 사용량 감소' },
  { name: '다회용 장바구니', saving: '-12%', desc: '비닐봉투 반복 사용을 줄여줘' },
];

const rewardData: RewardItem[] = [
  { title: '친환경 제휴카드 포인트', desc: '1,240P 적립 가능' },
  { title: '보험사 친환경 할인', desc: '다음 달 3% 할인 예상' },
  { title: '리필스테이션 쿠폰', desc: '2장 사용 가능' },
  { title: '멤버십 그린 배지', desc: '레벨 업까지 40점 남음' },
];

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-zinc-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function SectionTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <div className="text-2xl font-black tracking-tight text-zinc-900">{title}</div>
      <div className="mt-1 text-sm text-zinc-500">{sub}</div>
    </div>
  );
}

function Metric({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <Card className="p-5">
      <div className="text-sm text-zinc-500">{title}</div>
      <div className="mt-2 text-3xl font-black text-emerald-700">{value}</div>
      <div className="mt-1 text-sm text-zinc-500">{sub}</div>
    </Card>
  );
}

function Progress({
  label,
  value,
  Icon,
}: {
  label: string;
  value: number;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-800">
          <Icon className="h-4 w-4 text-emerald-700" />
          {label}
        </div>
        <div className="text-sm font-extrabold text-emerald-700">{value}%</div>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-zinc-100">
        <div className="h-full rounded-full bg-emerald-600" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function HomeScreen({ setActiveTab }: { setActiveTab: (tab: TabKey) => void }) {
  const weekly = useMemo(() => [62, 68, 72, 74, 71, 76, 78], []);
  const labels = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-2xl font-black tracking-tight text-emerald-700">CTAG LIFE</div>
          <div className="text-sm text-zinc-500">개인 탄소 라이프 대시보드</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full border border-zinc-200 p-2 text-zinc-500" aria-label="알림">
            <Bell className="h-4 w-4" />
          </button>
          <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">Level A</div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="overflow-hidden bg-gradient-to-br from-emerald-700 to-emerald-600 p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-emerald-100">오늘의 탄소 점수</div>
              <div className="mt-2 flex items-end gap-2">
                <div className="text-6xl font-black">78</div>
                <div className="pb-2 text-xl font-semibold text-emerald-100">/ 100</div>
              </div>
              <div className="mt-3 text-sm font-semibold">🌱 상위 15%의 훌륭한 친환경 라이프</div>
            </div>
            <div className="rounded-3xl bg-white/15 p-3">
              <Leaf className="h-8 w-8" />
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        <Metric title="절감량" value="120g" sub="이번 주 누적" />
        <Metric title="랭킹" value="#12" sub="친구 그룹 기준" />
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-base font-extrabold text-zinc-900">오늘의 인사이트</div>
          <button onClick={() => setActiveTab('analytics')} className="text-sm font-bold text-emerald-700">
            자세히
          </button>
        </div>
        <div className="mt-2 text-sm leading-6 text-zinc-600">점심시간 텀블러 사용으로 탄소 30g 절감 달성</div>
      </Card>

      <Card className="p-5">
        <div className="text-base font-extrabold text-zinc-900">주간 점수 흐름</div>
        <div className="mt-5 flex h-40 items-end justify-between gap-2">
          {weekly.map((v, i) => (
            <div key={labels[i]} className="flex w-full flex-col items-center gap-2">
              <div className="flex h-28 items-end">
                <div className="w-7 rounded-full bg-emerald-600" style={{ height: `${v}%` }} />
              </div>
              <div className="text-xs text-zinc-500">{labels[i]}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="text-base font-extrabold text-zinc-900">빠른 실행</div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button onClick={() => setActiveTab('scan')} className="rounded-2xl bg-zinc-50 p-4 text-left transition hover:bg-zinc-100">
            <Camera className="h-5 w-5 text-emerald-700" />
            <div className="mt-3 text-sm font-extrabold text-zinc-900">영수증 스캔</div>
            <div className="mt-1 text-xs text-zinc-500">소비 기반 분석 시작</div>
          </button>
          <button onClick={() => setActiveTab('recommend')} className="rounded-2xl bg-zinc-50 p-4 text-left transition hover:bg-zinc-100">
            <Sparkles className="h-5 w-5 text-emerald-700" />
            <div className="mt-3 text-sm font-extrabold text-zinc-900">대체 추천</div>
            <div className="mt-1 text-xs text-zinc-500">친환경 상품 보기</div>
          </button>
        </div>
      </Card>
    </div>
  );
}

function AnalyticsScreen() {
  const items = [
    { label: '식품', value: 46, icon: ShoppingBag },
    { label: '이동', value: 28, icon: Leaf },
    { label: '소비', value: 19, icon: Trophy },
    { label: '기타', value: 7, icon: Droplets },
  ];

  return (
    <div className="space-y-4">
      <SectionTitle title="탄소 분석" sub="카테고리별 소비 패턴과 비교 지표" />

      <Card className="p-5">
        <div className="text-base font-extrabold text-zinc-900">카테고리별 배출 비중</div>
        <div className="mt-4 space-y-4">
          {items.map((item) => (
            <Progress key={item.label} label={item.label} value={item.value} Icon={item.icon} />
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Metric title="친구 평균 대비" value="-12%" sub="더 낮은 배출" />
        <Metric title="이번 달 목표" value="82점" sub="현재 78점" />
      </div>

      <Card className="p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
            <TrendingDown className="h-5 w-5" />
          </div>
          <div>
            <div className="text-base font-extrabold text-zinc-900">핵심 해석</div>
            <div className="mt-1 text-sm leading-6 text-zinc-600">이동과 소비 항목만 조금 더 줄이면 이번 주 상위 10% 안으로 들어갈 수 있어.</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ScanScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<null | {
    store: string;
    carbon: string;
    topItem: string;
    suggestion: string;
  }>(null);

  const startScan = () => {
    setIsScanning(true);
    setResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setResult({
        store: 'Green Mart',
        carbon: '420g CO₂e',
        topItem: '플라스틱 생수 2병',
        suggestion: '다음엔 리필 스테이션 이용 시 약 18% 절감 가능',
      });
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <SectionTitle title="영수증 스캔" sub="실제 연동 전 단계의 데모 화면" />

      <Card className="p-4">
        <div className="flex h-72 items-center justify-center rounded-3xl border-2 border-dashed border-emerald-600 bg-zinc-50 px-4 text-center text-zinc-500">
          {isScanning ? 'AI가 영수증을 읽고 탄소 데이터를 분석 중...' : '[ 카메라 / OCR 영역 ]'}
        </div>
        <button
          onClick={startScan}
          disabled={isScanning}
          className="mt-4 w-full rounded-full bg-emerald-700 px-4 py-4 text-base font-extrabold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:bg-zinc-400"
        >
          {isScanning ? '분석 중...' : '영수증 스캔하기'}
        </button>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4">
          <ScanSearch className="h-5 w-5 text-emerald-700" />
          <div className="mt-3 text-sm font-extrabold text-zinc-900">자동 품목 분류</div>
          <div className="mt-1 text-xs leading-5 text-zinc-500">영수증 기반으로 소비 항목을 자동 분류</div>
        </Card>
        <Card className="p-4">
          <ShieldCheck className="h-5 w-5 text-emerald-700" />
          <div className="mt-3 text-sm font-extrabold text-zinc-900">탄소 추정</div>
          <div className="mt-1 text-xs leading-5 text-zinc-500">품목별 탄소 배출량 추정값 제공</div>
        </Card>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Card className="p-5">
              <div className="flex items-center gap-2 text-base font-extrabold text-zinc-900">
                <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                분석 결과
              </div>
              <div className="mt-3 space-y-2 text-sm text-zinc-700">
                <div>매장: {result.store}</div>
                <div>총 탄소 추정치: {result.carbon}</div>
                <div>주요 배출 항목: {result.topItem}</div>
                <div className="font-bold text-emerald-700">{result.suggestion}</div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RecommendScreen({ query }: { query: string }) {
  const filtered = recommendationData.filter((item) => {
    const text = `${item.name} ${item.desc}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <SectionTitle title="대체 상품 추천" sub="지금 소비 패턴 기준 추천" />
      {filtered.length === 0 ? (
        <Card className="p-5 text-sm text-zinc-500">검색 결과가 없어.</Card>
      ) : (
        filtered.map((item) => (
          <Card key={item.name} className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-base font-extrabold text-zinc-900">{item.name}</div>
                <div className="mt-2 text-sm text-zinc-600">{item.desc}</div>
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-extrabold text-emerald-700">{item.saving}</div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

function RewardScreen({ query }: { query: string }) {
  const filtered = rewardData.filter((item) => {
    const text = `${item.title} ${item.desc}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <SectionTitle title="나의 리워드" sub="친환경 행동으로 받은 혜택" />
      {filtered.length === 0 ? (
        <Card className="p-5 text-sm text-zinc-500">검색 결과가 없어.</Card>
      ) : (
        filtered.map((item) => (
          <Card key={item.title} className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-base font-extrabold text-zinc-900">{item.title}</div>
                <div className="mt-2 text-sm text-zinc-600">{item.desc}</div>
              </div>
              <ChevronRight className="h-5 w-5 text-zinc-400" />
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

function DesktopPanel({
  activeTab,
  setActiveTab,
  query,
  setQuery,
}: {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  query: string;
  setQuery: (value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-3xl font-black tracking-tight text-zinc-900">CTAG LIFE</div>
              <div className="mt-2 text-sm leading-6 text-zinc-600">
                영수증 스캔, 탄소 분석, 대체 상품 추천, 보상 시스템까지 한 번에 보여주는 Next.js 배포형 웹 서비스 데모야.
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 px-4 py-3">
              <Search className="h-4 w-4 text-zinc-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="추천, 쿠폰, 포인트 검색"
                className="w-44 bg-transparent text-sm outline-none placeholder:text-zinc-400"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-base font-extrabold text-zinc-900">서비스 포지션</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">ESG</span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700">Carbon Tracking</span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700">Rewards</span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700">AI Receipt Scan</span>
          </div>
        </Card>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {featureCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="p-5">
              <div className="w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-base font-extrabold text-zinc-900">{item.title}</div>
              <div className="mt-2 text-sm leading-6 text-zinc-600">{item.desc}</div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-base font-extrabold text-zinc-900">바로 이동</div>
            <div className="mt-1 text-sm text-zinc-500">원하는 화면을 바로 열어봐.</div>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            현재: {tabs.find((t) => t.key === activeTab)?.label}
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-2xl p-4 text-left transition ${active ? 'bg-emerald-600 text-white' : 'bg-zinc-50 text-zinc-800 hover:bg-zinc-100'}`}
              >
                <Icon className="h-5 w-5" />
                <div className="mt-3 text-sm font-extrabold">{tab.label}</div>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <div className="text-base font-extrabold text-zinc-900">배포용 메모</div>
            <div className="mt-1 text-sm leading-6 text-zinc-600">
              이 파일은 Next.js App Router 기준으로 바로 app/page.tsx에 넣어 쓸 수 있는 형태야.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [query, setQuery] = useState('');

  const screenMap: Record<TabKey, React.ReactNode> = {
    home: <HomeScreen setActiveTab={setActiveTab} />,
    analytics: <AnalyticsScreen />,
    scan: <ScanScreen />,
    recommend: <RecommendScreen query={query} />,
    reward: <RewardScreen query={query} />,
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-100 to-zinc-200 p-4 sm:p-6">
      <section className="mx-auto mb-8 max-w-7xl rounded-[2rem] border border-emerald-100 bg-white/80 p-8 shadow-sm backdrop-blur">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              ESG Lifestyle Platform
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
              소비를 읽고,
              <br />
              탄소를 바꾸는 웹서비스
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
              CTAG LIFE는 영수증 기반 소비 데이터를 탄소 행동 데이터로 전환하고, 분석과 추천, 리워드까지 한 번에
              연결하는 서비스야.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('scan')}
                className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:opacity-95"
              >
                데모 시작
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-bold text-zinc-800"
              >
                분석 보기
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <Metric title="예상 절감 효과" value="-18%" sub="대체 추천 적용 시" />
            <Metric title="주간 점수" value="78" sub="상위 15%" />
            <Metric title="리워드 상태" value="1,240P" sub="누적 포인트" />
          </div>
        </div>
      </section>

      <section className="mx-auto mb-8 grid max-w-7xl gap-5 md:grid-cols-3">
        {featureCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="p-6">
              <div className="w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-black text-zinc-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{item.desc}</p>
            </Card>
          );
        })}
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[360px_1fr]">
        <div className="flex items-center justify-center xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)]">
          <div className="w-full max-w-sm rounded-[2.5rem] bg-zinc-900 p-3 shadow-2xl">
            <div className="overflow-hidden rounded-[2rem] bg-white">
              <div className="flex items-center justify-center border-b border-zinc-100 py-3 text-xs font-bold text-zinc-400">
                CTAG LIFE Live Demo
              </div>
              <div className="min-h-[760px] bg-white p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    {screenMap[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="grid grid-cols-5 border-t border-zinc-200 bg-white px-2 py-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-bold transition ${active ? 'bg-emerald-50 text-emerald-700' : 'text-zinc-400'}`}
                    >
                      <Icon className={`h-5 w-5 ${active ? 'scale-110' : ''}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <DesktopPanel activeTab={activeTab} setActiveTab={setActiveTab} query={query} setQuery={setQuery} />
      </div>
    </main>
  );
}
