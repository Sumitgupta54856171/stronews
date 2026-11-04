import React, { useState, useEffect, useMemo } from 'react';
import {
  Flame,
  Sparkles,
  TrendingUp,
  Headphones,
  Play,
  Pause,
  Bookmark,
  Share2,
  Search,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  Clock,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  CheckCircle2,
  BarChart3,
  Layers,
  Zap,
  Globe,
  MessageSquare,
  Volume2,
  Code2,
  DollarSign,
  ExternalLink,
  SlidersHorizontal,
  BookOpen,
  ListChecks,
  GitCommit,
  X,
  Copy,
  Check,
  Radio,
  Newspaper,
  Send,
  ThumbsUp,
  Compass
} from 'lucide-react';

// ============================================================================
// REALISTIC 2026 BREAKING NEWS & GOOGLE TRENDS DATA
// ============================================================================
const ARTICLES_DATA = [
  {
    id: 'vande-bharat-sleeper-trial-180kmh',
    slug: '/news/vande-bharat-sleeper-180kmh-crs-trial-routes-fares',
    category: 'India & Infra',
    isBreaking: true,
    isDiscoverOptimized: true,
    trendQuery: 'Vande Bharat Sleeper Route & Ticket Price',
    trendSpike: '+840%',
    searchVolume: '250K+ searches today',
    seoCompetition: 'Low (Breakout Query)',
    publishedAt: '14 mins ago',
    updatedAt: 'Just now',
    readTime: '3 min read',
    listenDuration: '1:55',
    activeReaders: 1842,
    author: {
      name: 'Siddharth Verma',
      role: 'Senior Infrastructure & Policy Editor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    },
    title: 'Vande Bharat Sleeper Hits 180 km/h in Final CRS Trial: First 3 Overnight Routes & Expected Fare Chart Revealed',
    subtitle: 'Indian Railways completes high-speed oscillation trials on the Kota–Nagda section; commercial overnight operations set to challenge domestic budget airlines on trunk routes.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Prototype 16-coach Vande Bharat Sleeper rake undergoing high-speed instrumentation testing. (16:9 Discover Ratio • 1200x675px)',
    keyStat: {
      value: '180 km/h',
      label: 'Peak Test Speed Achieved',
      context: 'Cuts 1,400 km overnight journey times by up to 3.5 hours compared to Rajdhani Express'
    },
    aiSummary: [
      'BEML-ICF built 16-coach Vande Bharat Sleeper cleared the mandatory 180 km/h water-glass stability test under CRS supervision.',
      'First commercial rakes will operate on New Delhi–Srinagar, New Delhi–Mumbai, and Howrah–Secunderabad corridors.',
      'Aircraft-grade bio-vacuum toilets, hot-water showers in First AC, and anti-collision Kavach 4.0 comes standard.',
      'Expected dynamic fares sit 10–12% above Rajdhani AC tiers, targeting overnight business commuters.'
    ],
    sixtyWordSummary: 'Indian Railways successfully tested the new 16-coach Vande Bharat Sleeper train at 180 km/h on the Kota-Nagda stretch. Designed for overnight journeys over 1,000 km, the train features ergonomic cushioned berths, Kavach 4.0 safety, and noise-insulated cabins. Commercial launch begins next month on the Delhi–Srinagar and Delhi–Mumbai routes, cutting travel time by over 3 hours.',
    timeline: [
      { time: '09:15 AM', title: 'High-Speed Run Initiated', desc: 'Loaded prototype rake departs Kota Junction with RDSO oscillation sensors.' },
      { time: '11:40 AM', title: '180 km/h Peak Velocity Recorded', desc: 'Sustained 180 km/h achieved across a 42 km stretch with 0.02g lateral vibration index.' },
      { time: '02:10 PM', title: 'Emergency Braking Verification', desc: 'Full service brake test from 160 km/h to 0 completed within 1,120 meters.' },
      { time: '04:30 PM', title: 'Railway Board Route Allocation', desc: 'Northern and Western Railway zones allotted the first two production rakes.' }
    ],
    bodyParagraphs: [
      'In a major milestone for India’s semi-high-speed rail network, the first prototype of the Vande Bharat Sleeper trainset breached the 180 km/h mark during its final Commissioner of Railway Safety (CRS) instrumentation trials today. Unlike the chair-car variants currently operating on daytime intercity stretches, the new 16-coach sleeper formation is engineered specifically for overnight trunk routes spanning 800 km to 1,500 km.',
      'Officials from the Research Designs and Standards Organisation (RDSO) confirmed that the austenitic stainless-steel coaches demonstrated superior ride comfort indices even at 180 km/h, although commercial operational speeds will initially be capped at 160 km/h along fenced corridors such as the New Delhi–Mumbai and New Delhi–Howrah routes.',
      'Inside the cabin, passengers will see a generational leap over legacy Rajdhani LHB coaches. The train integrates sensor-activated inter-communication doors, diffused circadian LED lighting, dedicated USB-C 65W fast-charging ports for laptops at every berth, and redesigned ladder ergonomics for upper-berth access.'
    ],
    relatedQueries: [
      { q: 'Vande Bharat Sleeper Delhi to Srinagar ticket price', answer: 'Expected to start at ₹2,450 for 3AC, ₹3,300 for 2AC, and ₹4,600 for 1st AC.' },
      { q: 'How many berths in Vande Bharat Sleeper train?', answer: 'Each 16-coach rake accommodates 823 passengers across 11 AC 3-Tier, 4 AC 2-Tier, and 1 First AC coach.' },
      { q: 'Difference between Amrit Bharat and Vande Bharat Sleeper', answer: 'Amrit Bharat is a non-AC/Sleeper push-pull train for budget travel (130 km/h), while Vande Bharat Sleeper is a fully air-conditioned EMU trainset (180 km/h).' }
    ],
    poll: {
      question: 'Would you switch from a morning budget flight to an overnight Vande Bharat Sleeper for a 10-hour journey?',
      options: [
        { id: 'yes', text: 'Yes — saves hotel night & airport hassle', votes: 68 },
        { id: 'price', text: 'Only if 3AC ticket stays under ₹2,800', votes: 23 },
        { id: 'no', text: 'No — still prefer 2-hour flight', votes: 9 }
      ]
    },
    reactions: { fire: 428, mindblown: 194, clap: 312, lightbulb: 89 }
  },
  {
    id: 'india-ai-compute-subsidy-startups',
    slug: '/news/india-ai-mission-gpu-compute-voucher-portal-live',
    category: 'Tech & AI',
    isBreaking: false,
    isDiscoverOptimized: true,
    trendQuery: 'IndiaAI GPU Compute Portal Apply',
    trendSpike: '+620%',
    searchVolume: '110K+ searches today',
    seoCompetition: 'Low (High Tech RPM)',
    publishedAt: '42 mins ago',
    updatedAt: '20 mins ago',
    readTime: '4 min read',
    listenDuration: '2:10',
    activeReaders: 1290,
    author: {
      name: 'Ananya Krishnan',
      role: 'AI & DeepTech Correspondent',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80'
    },
    title: 'MeitY Opens ₹10,300 Cr IndiaAI Compute Portal: Startups Get H100 & B200 GPU Hours at Under ₹65/Hour',
    subtitle: 'Domestic AI labs, IIT researchers, and solo builders can now book subsidized sovereign GPU clusters online with up to 40% direct cost offset.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'High-density liquid-cooled AI server racks deployed under the national sovereign compute grid.',
    keyStat: {
      value: '₹62 / hr',
      label: 'Subsidized GPU Compute Rate',
      context: 'Nearly 65% cheaper than standard hyperscaler on-demand GPU cloud pricing'
    },
    aiSummary: [
      'MeitY launched the unified IndiaAI Compute Portal giving direct access to 18,000+ AI GPUs across empanelled data centers.',
      'Registered Indian startups building foundational models or Indic voice/vision tools get a 40% direct voucher subsidy.',
      'Effective hourly rate for flagship NVIDIA H100/H200 instances drops below ₹65/hour after sovereign subsidy.',
      'Includes pre-loaded BharatGen datasets and zero egress fees for domestic API deployment.'
    ],
    sixtyWordSummary: 'The Ministry of Electronics and IT (MeitY) has opened the IndiaAI Compute Portal under its ₹10,300 crore mission. Indian startups, students, and AI developers can now rent top-tier H100 and B200 GPUs for under ₹65 per hour after a 40% government subsidy. Applications are approved within 72 hours for Indic LLM and healthcare/agri-tech projects.',
    timeline: [
      { time: 'March 2025', title: 'Cabinet Approves ₹10,372 Cr Outlay', desc: 'Union Cabinet clears 5-year sovereign compute and dataset infrastructure plan.' },
      { time: 'Jan 2026', title: 'Data Center Empanelment Completed', desc: 'Yotta, E2E Networks, CtrlS, and Jio Cloud empanelled to host 18,693 GPUs.' },
      { time: 'Today', title: 'Self-Serve Voucher Portal Live', desc: 'Instant KYC and GPU cluster allocation opened for DPIIT startups and researchers.' }
    ],
    bodyParagraphs: [
      'Indian AI developers and early-stage SaaS founders no longer need to rely exclusively on overseas cloud credits to train and fine-tune large models. The Ministry of Electronics and Information Technology (MeitY) today activated the self-serve booking engine for the IndiaAI Compute Pillar, unlocking over 18,000 high-performance GPUs.',
      'Under the tiered subsidy structure, startups building solutions in healthcare, agriculture, education, and Bhashini-linked regional languages receive an instant 40% discount voucher applied directly at billing. This brings the effective cost of an NVIDIA H100 tensor core GPU down to roughly ₹62–₹74 per hour.',
      'Crucially, the portal also waives domestic bandwidth egress fees—a hidden cost that previously ate up to 18% of monthly cloud bills for high-traffic micro-tools and media startups.'
    ],
    relatedQueries: [
      { q: 'How to apply for IndiaAI GPU subsidy voucher?', answer: 'Log in via Startup India DPIIT ID or academic institutional email on the official IndiaAI portal and submit a 2-page compute utilization brief.' },
      { q: 'Can solo developers use IndiaAI compute?', answer: 'Yes, independent researchers and MSME-registered solo developers qualify for the 25% compute rebate tier.' }
    ],
    poll: {
      question: 'What is the biggest bottleneck for your AI or Micro-SaaS project right now?',
      options: [
        { id: 'gpu', text: 'Cloud & API Inference Cost', votes: 54 },
        { id: 'seo', text: 'Getting Organic Distribution & Users', votes: 35 },
        { id: 'data', text: 'Clean Domain-Specific Datasets', votes: 11 }
      ]
    },
    reactions: { fire: 519, mindblown: 308, clap: 410, lightbulb: 245 }
  },
  {
    id: 'rbi-upi-offline-tap-lite-x-limit',
    slug: '/news/rbi-upi-lite-auto-topup-5000-limit-nfc-offline',
    category: 'Markets & Policy',
    isBreaking: false,
    isDiscoverOptimized: true,
    trendQuery: 'UPI Lite New Limit ₹5000 Auto Replenish',
    trendSpike: '+490%',
    searchVolume: '95K+ searches today',
    seoCompetition: 'Low (High Finance RPM)',
    publishedAt: '1 hour ago',
    updatedAt: '35 mins ago',
    readTime: '3 min read',
    listenDuration: '1:40',
    activeReaders: 945,
    author: {
      name: 'Rohan Deshmukh',
      role: 'Fintech & RBI Policy Editor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    title: 'RBI Upgrades UPI Lite Offline Wallet Limit to ₹5,000 with Zero-PIN NFC Tap & Biometric Fallback',
    subtitle: 'New NPCI circular allows instant metro, highway toll, and retail payments in zero-network zones without entering a 4-digit UPI PIN.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Contactless NFC tap-to-pay terminals at retail counters now process offline UPI Lite X transactions in under 0.4 seconds.',
    keyStat: {
      value: '0.38 sec',
      label: 'Offline NFC Transaction Speed',
      context: '99.94% success rate even in basement parking and zero-cellular zones'
    },
    aiSummary: [
      'Per-transaction PIN-less limit increased to ₹1,000, while total on-device UPI Lite wallet balance rises to ₹5,000.',
      'UPI Lite X uses device-to-device NFC so both sender and merchant can complete payment completely offline.',
      'Smart auto-replenish triggers safely via on-device FaceID/Fingerprint when balance drops below ₹500.'
    ],
    sixtyWordSummary: 'The Reserve Bank of India (RBI) and NPCI have expanded the UPI Lite offline wallet limit to ₹5,000 and raised single PIN-less transactions to ₹1,000. Using NFC-based UPI Lite X, users can now tap their phones to pay at metro gates, flights, and basement stores with zero internet connectivity in under 0.4 seconds.',
    timeline: [
      { time: '10:30 AM', title: 'RBI Monetary Policy Statement', desc: 'Governor announces enhancement in small-value digital payment thresholds.' },
      { time: '12:15 PM', title: 'NPCI Operational Circular Issued', desc: 'PhonePe, GPay, and Paytm instructed to enable ₹1,000 PIN-less tap by the 15th.' }
    ],
    bodyParagraphs: [
      'To decongest core banking servers from billions of daily ₹20–₹500 grocery and transit transactions, the Reserve Bank of India has doubled down on on-device wallets. The updated UPI Lite framework raises the maximum wallet storage capacity to ₹5,000 and allows single tap-and-go payments up to ₹1,000 without requiring a UPI PIN.',
      'Because UPI Lite transactions stay off the central bank’s core ledger until bulk top-up, users get clean bank statements and near-zero payment failures during peak evening rush hours.'
    ],
    relatedQueries: [
      { q: 'What happens if I lose my phone with UPI Lite balance?', answer: 'Since UPI Lite balance is tied to your virtual payment address (VPA) metadata, logging into your UPI app on a new SIM-verified phone restores or refunds the unused wallet balance.' }
    ],
    poll: {
      question: 'Do you use UPI Lite for daily small chai/grocery payments?',
      options: [
        { id: 'daily', text: 'Yes, keeps my main bank statement clean', votes: 61 },
        { id: 'now', text: 'Will start now with ₹1,000 limit', votes: 28 },
        { id: 'regular', text: 'No, normal UPI works fine for me', votes: 11 }
      ]
    },
    reactions: { fire: 310, mindblown: 142, clap: 285, lightbulb: 176 }
  },
  {
    id: 'ind-vs-aus-squad-announcement-breakout',
    slug: '/news/india-test-squad-selection-new-pace-bolting-update',
    category: 'Cricket & Sports',
    isBreaking: true,
    isDiscoverOptimized: true,
    trendQuery: 'India Test Squad Selection Press Conference',
    trendSpike: '+950%',
    searchVolume: '500K+ searches today',
    seoCompetition: 'Medium (Massive Discover Viral Potential)',
    publishedAt: '28 mins ago',
    updatedAt: '5 mins ago',
    readTime: '3 min read',
    listenDuration: '1:50',
    activeReaders: 3420,
    author: {
      name: 'Vikramaditya Rao',
      role: 'Chief Cricket Analyst',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
    },
    title: 'BCCI Names 18-Man Test Squad: Two Express Ranji Pacers Earn Maiden Call-Up; Fitness Clearance for Lead All-Rounder',
    subtitle: 'Selectors prioritize high-release bounce and left-arm angle ahead of the five-Test marquee series; two uncapped batters added to reserve travelling group.',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Packed stadium under floodlights as BCCI selection committee finalizes the five-match red-ball touring party.',
    keyStat: {
      value: '148.5 km/h',
      label: 'Top Speed of New Bowling Pick',
      context: 'Picked after taking 29 wickets at an average of 16.4 in the domestic red-ball season'
    },
    aiSummary: [
      'BCCI announced an 18-member main squad plus 4 travelling reserves after a two-hour meeting in Mumbai.',
      'Sports science wing cleared the frontline seam-bowling all-rounder to bowl 12–15 overs per day.',
      'Dedicated 10-day red-ball simulation camp scheduled before the opening Test.'
    ],
    sixtyWordSummary: 'The BCCI selection committee has unveiled an 18-member Test squad featuring two express pace bowlers rewarded for standout Ranji Trophy seasons. The medical panel also cleared India’s premier seam all-rounder for full bowling workloads. A specialized 10-day centre-wicket simulation camp will be held prior to the opening Test match.',
    timeline: [
      { time: '01:00 PM', title: 'Selection Committee Meeting Begins', desc: 'Chief Selector, Head Coach, and Captain review NCA medical fitness reports.' },
      { time: '03:15 PM', title: 'Official 18-Member Squad Released', desc: 'Five specialist fast bowlers and three spin-bowling all-rounders named.' }
    ],
    bodyParagraphs: [
      'Addressing the perennial challenge of sustaining pace intensity across five back-to-back Test matches, the BCCI selection panel today named a seam-heavy 18-member squad that blends seasoned campaigners with raw domestic pace.',
      'Speaking at the press briefing, the chief selector emphasized that bowler workload data and high release points were decisive factors over reputation alone.'
    ],
    relatedQueries: [
      { q: 'Where to watch India Test series live streaming in 4K?', answer: 'Live broadcast will be available on Star Sports Network and 4K multi-cam streaming on JioHotstar.' }
    ],
    poll: {
      question: 'Should India play 4 fast bowlers + 1 spinner in the opening Test?',
      options: [
        { id: '4p', text: 'Yes — 4 pacers is mandatory on spicy pitches', votes: 74 },
        { id: '3p2s', text: 'No — play 3 pacers + 2 spin all-rounders for batting depth', votes: 26 }
      ]
    },
    reactions: { fire: 890, mindblown: 412, clap: 650, lightbulb: 95 }
  },
  {
    id: 'ott-weekend-releases-box-office-tracker',
    slug: '/news/friday-ott-releases-theatrical-box-office-guide',
    category: 'Cinema & OTT',
    isBreaking: false,
    isDiscoverOptimized: true,
    trendQuery: 'New Friday OTT Releases This Week List',
    trendSpike: '+540%',
    searchVolume: '180K+ searches today',
    seoCompetition: 'Low (High Affiliate & AdSense CTR)',
    publishedAt: '2 hours ago',
    updatedAt: '1 hour ago',
    readTime: '3 min read',
    listenDuration: '1:30',
    activeReaders: 1510,
    author: {
      name: 'Meera Nair',
      role: 'Entertainment & Streaming Editor',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80'
    },
    title: 'Weekend Streaming Radar: 7 Big Theatrical Blockbusters & Thriller Originals Dropping Across Netflix, Prime & JioHotstar Tonight',
    subtitle: 'Legal "Where to Watch" guide: From the ₹400-Crore sci-fi theatrical hit making its digital debut to a gripping 6-part courtroom crime series.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Legal OTT release trackers and streaming guides consistently capture 100K+ weekend search visitors without copyright risk.',
    keyStat: {
      value: '7 Titles',
      label: 'Major Premieres Tonight (Midnight IST)',
      context: 'Available in 4K Dolby Vision with Hindi, Tamil, Telugu, Malayalam & English audio tracks'
    },
    aiSummary: [
      'Three major theatrical hits complete their 8-week cinema window and land on Prime Video and Netflix at 12:00 AM IST.',
      'Legal "Where to Watch" & Release Time tables rank on Google without any DMCA or piracy risk.',
      'Includes audio language availability, IMDb ratings, and family-friendly viewing indicators.'
    ],
    sixtyWordSummary: 'Seven major movies and web series premiere across Netflix, Amazon Prime Video, and JioHotstar tonight at midnight IST. Highlights include the digital premiere of last month’s sci-fi theatrical blockbuster in 4K Dolby Atmos and a 6-episode investigative thriller. Check our complete platform-by-platform streaming schedule and audio language guide.',
    timeline: [
      { time: '12:00 AM IST', title: 'Netflix & Prime Midnight Drop', desc: 'Pan-India sci-fi thriller goes live in 5 languages.' },
      { time: '01:30 PM Friday', title: 'Global Anime & Docu-Series Premiere', desc: 'Simultaneous global release with English and Hindi dubs.' }
    ],
    bodyParagraphs: [
      'Instead of risky piracy sites that face constant domain blocks, smart media publishers capture massive entertainment search traffic by publishing structured, fast-loading "Where to Watch", "OTT Release Date & Time", and "Ending Explained" guides.',
      'This weekend’s lineup is headlined by four pan-Indian theatrical releases transitioning to SVOD platforms after completing their 56-day theatrical window.'
    ],
    relatedQueries: [
      { q: 'At what exact time do new movies release on Netflix and Prime in India?', answer: 'Indian originals and licensed domestic films typically go live at 12:00 AM (Midnight) IST, whereas global originals drop at 12:30 PM or 1:30 PM IST.' }
    ],
    poll: {
      question: 'What are you streaming first this weekend?',
      options: [
        { id: 'scifi', text: 'Sci-Fi Theatrical Blockbuster (Prime)', votes: 49 },
        { id: 'thriller', text: '6-Part Crime Thriller Series (Netflix)', votes: 38 },
        { id: 'cricket', text: 'Live Test Match & Highlights', votes: 13 }
      ]
    },
    reactions: { fire: 380, mindblown: 190, clap: 220, lightbulb: 115 }
  }
];

const GOOGLE_TRENDS_RADAR = [
  {
    rank: '01',
    query: 'India Test Squad 18-Man List',
    category: 'Cricket & Sports',
    velocity: '+950%',
    volume: '500K+',
    competition: 'Medium',
    rpmEstimate: '$2.40',
    sparkline: [12, 18, 25, 42, 68, 92, 100],
    articleId: 'ind-vs-aus-squad-announcement-breakout',
    whyTrending: 'BCCI press conference just ended; fans searching for reserve pacers & fitness updates.'
  },
  {
    rank: '02',
    query: 'Vande Bharat Sleeper Ticket Price & Route',
    category: 'India & Infra',
    velocity: '+840%',
    volume: '250K+',
    competition: 'Low (Breakout)',
    rpmEstimate: '$3.10',
    sparkline: [10, 14, 22, 48, 75, 89, 98],
    articleId: 'vande-bharat-sleeper-trial-180kmh',
    whyTrending: '180 km/h CRS speed test video went viral; commuters checking Delhi-Srinagar & Mumbai fares.'
  },
  {
    rank: '03',
    query: 'IndiaAI Compute Portal ₹65 GPU Apply',
    category: 'Tech & AI',
    velocity: '+620%',
    volume: '110K+',
    competition: 'Low (Goldmine)',
    rpmEstimate: '$7.80',
    sparkline: [8, 15, 30, 52, 70, 84, 95],
    articleId: 'india-ai-compute-subsidy-startups',
    whyTrending: 'MeitY opened GPU subsidy applications; high-CPC cloud & SaaS advertisers bidding on this keyword.'
  },
  {
    rank: '04',
    query: 'Friday OTT Releases Midnight Time',
    category: 'Cinema & OTT',
    velocity: '+540%',
    volume: '180K+',
    competition: 'Low',
    rpmEstimate: '$3.50',
    sparkline: [20, 28, 35, 49, 64, 80, 91],
    articleId: 'ott-weekend-releases-box-office-tracker',
    whyTrending: '7 major movies dropping tonight; huge legal search traffic for OTT platform & dubbing details.'
  },
  {
    rank: '05',
    query: 'UPI Lite ₹5000 Limit Auto Top-Up Setup',
    category: 'Markets & Policy',
    velocity: '+490%',
    volume: '95K+',
    competition: 'Low (High CPC)',
    rpmEstimate: '$6.20',
    sparkline: [15, 22, 38, 51, 67, 79, 88],
    articleId: 'rbi-upi-offline-tap-lite-x-limit',
    whyTrending: 'RBI circular goes live; users searching how to activate NFC PIN-less tap in GPay & PhonePe.'
  }
];

const CATEGORIES = [
  'All Pulse',
  'Tech & AI',
  'India & Infra',
  'Cricket & Sports',
  'Cinema & OTT',
  'Markets & Policy'
];

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

// Crisp SVG Sparkline for Trend Velocity
const TrendSparkline = ({ data, color = '#059669' }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * 64;
      const y = 22 - ((val - min) / (max - min || 1)) * 18;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width="68" height="24" viewBox="0 0 68 24" className="overflow-visible shrink-0">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      <circle
        cx="64"
        cy={22 - ((data[data.length - 1] - min) / (max - min || 1)) * 18}
        r="3"
        fill={color}
      />
    </svg>
  );
};

// SEO & Monetization X-Ray Callout Badge
const SeoXrayBadge = ({ show, type = 'seo', label, subtext }) => {
  if (!show) return null;
  const styles =
    type === 'seo'
      ? 'bg-indigo-950/95 text-indigo-100 border-indigo-400/50'
      : 'bg-emerald-950/95 text-emerald-100 border-emerald-400/50';

  return (
    <div
      className={`my-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono flex items-center justify-between gap-2 shadow-sm backdrop-blur-sm transition-all ${styles}`}
    >
      <div className="flex items-center gap-1.5">
        {type === 'seo' ? (
          <Code2 className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
        ) : (
          <DollarSign className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
        )}
        <span className="font-semibold tracking-tight">{label}</span>
      </div>
      {subtext && <span className="opacity-80 text-[10px] hidden sm:inline">{subtext}</span>}
    </div>
  );
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Navigation & Viewport State
  const [activeNav, setActiveNav] = useState('home'); // 'home' | 'article' | 'shorts' | 'trends'
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [seoXray, setSeoXray] = useState(false);
  const [showSchemaModal, setShowSchemaModal] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Content & Filter State
  const [selectedCategory, setSelectedCategory] = useState('All Pulse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState(ARTICLES_DATA[0].id);
  const [expandedSummaries, setExpandedSummaries] = useState({ [ARTICLES_DATA[0].id]: true });
  const [bookmarkedIds, setBookmarkedIds] = useState(['india-ai-compute-subsidy-startups']);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  // Article Reader State
  const [readerMode, setReaderMode] = useState('editorial'); // 'editorial' | 'tldr' | 'timeline'
  const [fontScale, setFontScale] = useState(1); // 0.95 | 1 | 1.1
  const [pollVotes, setPollVotes] = useState({});
  const [articleReactions, setArticleReactions] = useState(
    ARTICLES_DATA.reduce((acc, item) => ({ ...acc, [item.id]: item.reactions }), {})
  );
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Arjun Mehta • Founder @ StackFlow',
      time: '8m ago',
      text: 'The 15-second AI summary + Breakout query structure on this page is so much cleaner than legacy news sites plastered with popups.',
      likes: 24
    },
    {
      id: 2,
      user: 'Priya Nair • Product Designer',
      time: '19m ago',
      text: 'Warm daylight background (#F7F6F2) makes reading long policy breakdowns way easier on the eyes.',
      likes: 17
    }
  ]);
  const [newComment, setNewComment] = useState('');

  // 60-Word Visual Deck State
  const [shortIndex, setShortIndex] = useState(0);

  // Global Sticky Audio Player State
  const [audioTrack, setAudioTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(28);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Simulate audio progress when playing
  useEffect(() => {
    if (!isPlaying || !audioTrack) return;
    const interval = setInterval(() => {
      setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 600);
    return () => clearInterval(interval);
  }, [isPlaying, audioTrack]);

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All Pulse' || article.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.trendQuery.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBookmark = !showOnlyBookmarks || bookmarkedIds.includes(article.id);
      return matchesCategory && matchesSearch && matchesBookmark;
    });
  }, [selectedCategory, searchQuery, showOnlyBookmarks, bookmarkedIds]);

  const currentArticle = useMemo(
    () => ARTICLES_DATA.find((a) => a.id === selectedArticleId) || ARTICLES_DATA[0],
    [selectedArticleId]
  );

  // Handlers
  const openArticle = (id, mode = 'editorial') => {
    setSelectedArticleId(id);
    setReaderMode(mode);
    setActiveNav('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSummary = (e, id) => {
    e.stopPropagation();
    setExpandedSummaries((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (e, id) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const startAudio = (e, article) => {
    e.stopPropagation();
    if (audioTrack?.id === article.id) {
      setIsPlaying(!isPlaying);
    } else {
      setAudioTrack(article);
      setAudioProgress(12);
      setIsPlaying(true);
    }
  };

  const handleVote = (articleId, optionId) => {
    setPollVotes((prev) => ({ ...prev, [articleId]: optionId }));
  };

  const handleReaction = (articleId, key) => {
    setArticleReactions((prev) => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        [key]: prev[articleId][key] + 1
      }
    }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments((prev) => [
      {
        id: Date.now(),
        user: 'You • Verified Reader',
        time: 'Just now',
        text: newComment.trim(),
        likes: 1
      },
      ...prev
    ]);
    setNewComment('');
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    setPlaybackSpeed(next);
  };

  // JSON-LD Schema Generator for Current Article
  const generatedSchemaCode = useMemo(() => {
    return `<!-- 1. Google Discover High-CTR Meta Tag -->
<meta name="robots" content="max-image-preview:large, index, follow" />

<!-- 2. Instant NewsArticle JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://pulsewire.io${currentArticle.slug}"
  },
  "headline": "${currentArticle.title}",
  "description": "${currentArticle.subtitle}",
  "image": [
    "${currentArticle.image}"
  ],
  "datePublished": "2026-11-01T17:15:00+05:30",
  "dateModified": "2026-11-01T17:40:00+05:30",
  "author": {
    "@type": "Person",
    "name": "${currentArticle.author.name}",
    "jobTitle": "${currentArticle.author.role}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "stronews Media",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pulsewire.io/logo-600x60.png"
    }
  }
}
</script>`;
  }, [currentArticle]);

  const copySchemaToClipboard = () => {
    navigator.clipboard?.writeText(generatedSchemaCode);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  // Determine container width based on Viewport Switcher
  const isMobileSimulated = viewportMode === 'mobile';
  const isTabletSimulated = viewportMode === 'tablet';

  const containerDimensionsClass = isMobileSimulated
    ? 'max-w-[420px] mx-auto my-4 rounded-[36px] border-[8px] border-stone-900 shadow-2xl overflow-hidden bg-[#F7F6F2]'
    : isTabletSimulated
    ? 'max-w-[780px] mx-auto my-4 rounded-[24px] border-[6px] border-stone-800 shadow-2xl overflow-hidden bg-[#F7F6F2]'
    : 'w-full bg-[#F7F6F2]';

  return (
    <div className="min-h-screen bg-[#ECEAE4] text-[#111315] antialiased selection:bg-indigo-600 selection:text-white">
      {/* Inject Editorial Serif + Geometric Sans + JetBrains Mono Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-editorial { font-family: 'Instrument Serif', Georgia, serif; }
        .font-sans-ui { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
        .font-mono-num { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
        /* Hide scrollbars on horizontal pill strips */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* =====================================================================
          1. STICKY WORKSPACE & VIEWPORT PREVIEW BAR (BUILDER CONTROLS)
         ===================================================================== */}
      <div className="sticky top-0 z-50 bg-[#141413] text-stone-200 border-b border-stone-800 px-3 sm:px-6 py-2 font-sans-ui">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Builder Mode Label */}
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-num font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE WEB APP
            </span>
            <span className="text-xs text-stone-400 hidden md:inline">
              Warm Daylight Editorial Palette (<code className="text-stone-200">#F7F6F2</code>) • Zero Eye Strain
            </span>
          </div>

          {/* Center: Responsive Viewport Switcher */}
          <div className="flex items-center bg-stone-900 p-1 rounded-lg border border-stone-800">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                viewportMode === 'desktop'
                  ? 'bg-white text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop Web</span>
            </button>
            <button
              onClick={() => setViewportMode('tablet')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                viewportMode === 'tablet'
                  ? 'bg-white text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                viewportMode === 'mobile'
                  ? 'bg-white text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile (412px)</span>
            </button>
          </div>

          {/* Right: SEO & Ad-Slot X-Ray Toggle + Schema Modal */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSeoXray(!seoXray)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                seoXray
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm'
                  : 'bg-stone-900 text-stone-300 border-stone-700 hover:border-stone-500'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>SEO & Ad X-Ray: {seoXray ? 'ON' : 'OFF'}</span>
            </button>
            <button
              onClick={() => setShowSchemaModal(true)}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono-num bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
              title="View Google News JSON-LD Schema"
            >
              <span>JSON-LD</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. MAIN RESPONSIVE APPLICATION CONTAINER
         ===================================================================== */}
      <div className={`${containerDimensionsClass} font-sans-ui transition-all duration-300 pb-24`}>
        {/* Mobile Status Bar (Only visible when Mobile Viewport is selected) */}
        {isMobileSimulated && (
          <div className="bg-[#F7F6F2] px-6 pt-2.5 pb-1 flex items-center justify-between text-[11px] font-mono-num font-semibold text-stone-800 border-b border-stone-200/60">
            <span>9:41</span>
            <div className="w-20 h-4 bg-stone-900 rounded-full" />
            <span>5G • 98%</span>
          </div>
        )}

        {/* ===================================================================
            LIVE GOOGLE TRENDS BREAKOUT TICKER BAR
           =================================================================== */}
        <div className="bg-[#EFECE6] border-b border-[#E2DFD7] px-3 sm:px-6 py-2">
          <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#E11D48] text-white text-[11px] font-mono-num font-semibold tracking-wider uppercase shrink-0">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>TRENDS SPIKE</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {GOOGLE_TRENDS_RADAR.map((trend) => (
                <button
                  key={trend.rank}
                  onClick={() => openArticle(trend.articleId)}
                  className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white hover:bg-stone-900 hover:text-white border border-[#E2DFD7] transition-all text-xs shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                >
                  <span className="font-medium text-stone-800 group-hover:text-white">
                    {trend.query}
                  </span>
                  <span className="font-mono-num text-[11px] font-semibold text-emerald-700 bg-emerald-50 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 px-1.5 py-0.2 rounded-full">
                    ↗ {trend.velocity}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================================
            MAIN EDITORIAL HEADER & NAVIGATION
           =================================================================== */}
        <header className="sticky top-0 z-30 bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#E4E2DD]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
            <div className="flex items-center justify-between gap-4">
              {/* Brand Identity */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveNav('home')}
                  className="text-left group focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#111315] text-white flex items-center justify-center font-mono-num font-bold text-sm shadow-sm group-hover:bg-indigo-600 transition-colors">
                      S
                    </div>
                    <div>
                      <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#111315]">
                        stronews
                      </span>
                      <span className="hidden lg:inline-block ml-2.5 text-[11px] font-mono-num uppercase tracking-widest text-stone-500 border-l border-stone-300 pl-2.5">
                        Real-Time Search & Editorial Desk
                      </span>
                    </div>
                  </div>
                </button>
              </div>

              {/* Center / Right Navigation Modes (Desktop) */}
              {!isMobileSimulated && (
                <nav className="hidden md:flex items-center gap-1 bg-[#EAE8E1] p-1 rounded-xl border border-[#DFDDD4]">
                  <button
                    onClick={() => setActiveNav('home')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeNav === 'home'
                        ? 'bg-white text-stone-950 shadow-sm'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    <Newspaper className="w-3.5 h-3.5" />
                    <span>Pulse Feed</span>
                  </button>
                  <button
                    onClick={() => setActiveNav('shorts')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeNav === 'shorts'
                        ? 'bg-white text-stone-950 shadow-sm'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    <span>60-Word Deck</span>
                  </button>
                  <button
                    onClick={() => setActiveNav('trends')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeNav === 'trends'
                        ? 'bg-white text-stone-950 shadow-sm'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Google Trends Radar</span>
                  </button>
                  <button
                    onClick={() => setActiveNav('article')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeNav === 'article'
                        ? 'bg-white text-stone-950 shadow-sm'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Reader View</span>
                  </button>
                </nav>
              )}

              {/* Search & Saved Controls */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (activeNav !== 'home') setActiveNav('home');
                    }}
                    placeholder={isMobileSimulated ? 'Search news...' : 'Search topics or trends...'}
                    className="w-36 sm:w-52 pl-8 pr-3 py-1.5 rounded-full bg-white border border-[#DEDBD2] text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-indigo-600 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    setShowOnlyBookmarks(!showOnlyBookmarks);
                    if (activeNav !== 'home') setActiveNav('home');
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
                    showOnlyBookmarks
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-[#DEDBD2] hover:border-stone-400'
                  }`}
                  title="Saved Stories"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span className="font-mono-num">{bookmarkedIds.length}</span>
                </button>
              </div>
            </div>

            {/* Category Filter Strip (Shown on Home View) */}
            {activeNav === 'home' && (
              <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-[#EAE7DF] overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-1.5">
                  {CATEGORIES.map((category) => {
                    const active = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 ${
                          active
                            ? 'bg-[#111315] text-white shadow-xs'
                            : 'bg-transparent text-stone-600 hover:bg-[#EAE8E1] hover:text-stone-950'
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>

                <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono-num text-stone-500 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Google Indexing API: Connected (2.4s Ping)</span>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ===================================================================
            VIEW 1: HOME — ASYMMETRIC BENTO EDITORIAL & TRENDS HUB
           =================================================================== */}
        {activeNav === 'home' && (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <SeoXrayBadge
              show={seoXray}
              type="seo"
              label="DISCOVER ARCHITECTURE: 16:9 Hero Card (1200x675px WebP) + Breakout Keyword H1"
              subtext="Drives 75%+ mobile Chrome Discover feed impressions"
            />

            {filteredArticles.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E5E3DC] p-12 text-center my-6">
                <p className="text-base font-semibold text-stone-800">
                  No stories match "{searchQuery || (showOnlyBookmarks ? 'Saved Bookmarks' : selectedCategory)}"
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Try clearing your search filter or switching back to All Pulse.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All Pulse');
                    setSearchQuery('');
                    setShowOnlyBookmarks(false);
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  isMobileSimulated || isTabletSimulated
                    ? 'grid-cols-1'
                    : 'grid-cols-1 lg:grid-cols-12'
                }`}
              >
                {/* LEFT / CENTER EDITORIAL COLUMN (8 COLS ON DESKTOP) */}
                <div className={isMobileSimulated || isTabletSimulated ? '' : 'lg:col-span-8 space-y-6'}>
                  {/* 1. HERO FEATURE STORY CARD */}
                  {(() => {
                    const hero = filteredArticles[0];
                    const isSummaryOpen = !!expandedSummaries[hero.id];
                    const isSaved = bookmarkedIds.includes(hero.id);
                    const isCurrentAudio = audioTrack?.id === hero.id && isPlaying;

                    return (
                      <article
                        onClick={() => openArticle(hero.id)}
                        className="group bg-white rounded-2xl border border-[#E4E2DA] hover:border-stone-400/80 shadow-[0_2px_10px_rgba(17,19,21,0.03)] hover:shadow-[0_12px_30px_rgba(17,19,21,0.07)] transition-all duration-200 overflow-hidden cursor-pointer"
                      >
                        {/* 16:9 Discover Optimized Visual Container */}
                        <div className="relative aspect-16/9 w-full bg-stone-900 overflow-hidden">
                          <img
                            src={hero.image}
                            alt={hero.title}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                          {/* Top Floating Badges */}
                          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              {hero.isBreaking && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E11D48] text-white text-[11px] font-mono-num font-bold uppercase tracking-wider shadow-sm">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                  Breaking Lead
                                </span>
                              )}
                              <span className="px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-semibold">
                                {hero.category}
                              </span>
                            </div>

                            {/* Google Trends Breakout Velocity Pill */}
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md text-emerald-300 border border-emerald-400/30 text-[11px] font-mono-num font-semibold">
                              <TrendingUp className="w-3 h-3 text-emerald-400" />
                              <span>{hero.trendSpike} Search Spike</span>
                            </span>
                          </div>

                          {/* Bottom Image Overlay Metadata */}
                          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white/90 text-xs">
                            <div className="flex items-center gap-2 font-mono-num text-[11px]">
                              <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
                                <Eye className="w-3 h-3 text-emerald-400" />
                                {hero.activeReaders.toLocaleString()} reading now
                              </span>
                              <span className="hidden sm:inline opacity-80">• {hero.publishedAt}</span>
                            </div>
                            <span className="text-[11px] font-mono-num bg-white/15 backdrop-blur-md px-2 py-0.5 rounded">
                              16:9 Discover HD
                            </span>
                          </div>
                        </div>

                        {/* Hero Card Content Body */}
                        <div className="p-5 sm:p-6">
                          {/* Breakout Query Breadcrumb */}
                          <div className="flex items-center gap-2 text-xs font-mono-num text-indigo-700 mb-2">
                            <Sparkles className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">
                              Trending Search: <strong>"{hero.trendQuery}"</strong> ({hero.searchVolume})
                            </span>
                          </div>

                          {/* Editorial Headline */}
                          <h1 className="font-editorial text-2xl sm:text-3xl md:text-[34px] leading-[1.15] font-normal text-[#111315] group-hover:text-indigo-950 transition-colors">
                            {hero.title}
                          </h1>

                          <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-[#57534E]">
                            {hero.subtitle}
                          </p>

                          {/* Interactive Action Bar: 15-Sec AI Summary + Audio Player + Save */}
                          <div className="mt-5 pt-4 border-t border-[#ECEAE3] flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              {/* Toggle 15-Sec AI Summary right inside feed */}
                              <button
                                onClick={(e) => toggleSummary(e, hero.id)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                                  isSummaryOpen
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                    : 'bg-indigo-50/80 text-indigo-900 border-indigo-200 hover:bg-indigo-100'
                                }`}
                              >
                                <Zap className="w-3.5 h-3.5" />
                                <span>{isSummaryOpen ? 'Hide 15s AI Takeaways' : '⚡ 15-Sec AI Summary'}</span>
                              </button>

                              {/* One-Click Audio Article Trigger */}
                              <button
                                onClick={(e) => startAudio(e, hero)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                                  isCurrentAudio
                                    ? 'bg-stone-900 text-white border-stone-900'
                                    : 'bg-[#F5F4EF] text-stone-800 border-[#E2DFD7] hover:bg-stone-200/70'
                                }`}
                              >
                                {isCurrentAudio ? (
                                  <Pause className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Headphones className="w-3.5 h-3.5 text-stone-600" />
                                )}
                                <span className="font-mono-num">
                                  {isCurrentAudio ? 'Playing Audio...' : `Listen (${hero.listenDuration})`}
                                </span>
                              </button>

                              {/* Open TL;DR Timeline Directly */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openArticle(hero.id, 'timeline');
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                              >
                                <GitCommit className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Live Timeline</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => toggleBookmark(e, hero.id)}
                                className={`p-2 rounded-xl border transition-colors ${
                                  isSaved
                                    ? 'bg-stone-900 text-white border-stone-900'
                                    : 'bg-white text-stone-600 border-[#E2DFD7] hover:border-stone-400'
                                }`}
                                title="Save to Reading List"
                              >
                                <Bookmark className="w-3.5 h-3.5" />
                              </button>
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 group-hover:translate-x-0.5 transition-transform">
                                <span>Full Story</span>
                                <ChevronRight className="w-4 h-4" />
                              </span>
                            </div>
                          </div>

                          {/* Collapsible 15-Second AI Summary Drawer */}
                          {isSummaryOpen && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="mt-4 p-4 rounded-xl bg-[#F8F7FC] border border-indigo-200/80 text-stone-800 space-y-2.5 animate-fadeIn"
                            >
                              <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-num font-bold uppercase tracking-wider text-indigo-700">
                                  <Sparkles className="w-3.5 h-3.5" />
                                  Instant Executive Synthesis • 4 Key Facts
                                </span>
                                <span className="text-[11px] font-mono-num text-stone-500">
                                  Key Metric: <strong className="text-stone-900">{hero.keyStat.value}</strong>
                                </span>
                              </div>
                              <ul className="space-y-1.5 text-xs sm:text-[13px] text-stone-700">
                                {hero.aiSummary.map((point, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="font-mono-num font-bold text-indigo-600 mt-0.5">
                                      0{idx + 1}.
                                    </span>
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })()}

                  {/* 2. SECONDARY BENTO GRID (2-COLUMN VISUAL + WIRE CARDS) */}
                  <div
                    className={`grid gap-5 mt-6 ${
                      isMobileSimulated ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                    }`}
                  >
                    {filteredArticles.slice(1).map((article) => {
                      const isSummaryOpen = !!expandedSummaries[article.id];
                      const isSaved = bookmarkedIds.includes(article.id);
                      const isCurrentAudio = audioTrack?.id === article.id && isPlaying;

                      return (
                        <article
                          key={article.id}
                          onClick={() => openArticle(article.id)}
                          className="group bg-white rounded-2xl border border-[#E4E2DA] hover:border-stone-400/80 p-4 sm:p-5 flex flex-col justify-between shadow-[0_2px_8px_rgba(17,19,21,0.02)] hover:shadow-md transition-all cursor-pointer"
                        >
                          <div>
                            {/* Image + Top Category Bar */}
                            <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-stone-900 mb-3.5">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold">
                                  {article.category}
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 text-[10px] font-mono-num font-semibold">
                                  ↗ {article.trendSpike}
                                </span>
                              </div>
                            </div>

                            {/* Meta + Headline */}
                            <div className="flex items-center justify-between text-[11px] font-mono-num text-stone-500 mb-1.5">
                              <span>{article.publishedAt}</span>
                              <span>{article.readTime}</span>
                            </div>

                            <h2 className="font-editorial text-xl sm:text-[22px] leading-[1.2] text-[#111315] group-hover:text-indigo-700 transition-colors">
                              {article.title}
                            </h2>

                            <p className="mt-2 text-xs sm:text-[13px] text-[#57534E] line-clamp-2 leading-relaxed">
                              {article.subtitle}
                            </p>
                          </div>

                          {/* Card Footer Actions */}
                          <div className="mt-4 pt-3 border-t border-[#F0EEE8]">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={(e) => toggleSummary(e, article.id)}
                                  className="px-2.5 py-1 rounded-lg bg-[#F5F4EF] hover:bg-indigo-50 text-stone-800 hover:text-indigo-700 border border-[#E5E3DC] text-[11px] font-semibold transition-colors"
                                >
                                  {isSummaryOpen ? 'Hide AI' : '⚡ AI Brief'}
                                </button>
                                <button
                                  onClick={(e) => startAudio(e, article)}
                                  className="px-2 py-1 rounded-lg bg-[#F5F4EF] hover:bg-stone-200 text-stone-700 text-[11px] font-mono-num flex items-center gap-1"
                                >
                                  {isCurrentAudio ? (
                                    <Pause className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <Play className="w-3 h-3" />
                                  )}
                                  <span>{article.listenDuration}</span>
                                </button>
                              </div>

                              <button
                                onClick={(e) => toggleBookmark(e, article.id)}
                                className={`p-1.5 rounded-lg border ${
                                  isSaved
                                    ? 'bg-stone-900 text-white border-stone-900'
                                    : 'text-stone-500 border-transparent hover:border-stone-300'
                                }`}
                              >
                                <Bookmark className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {isSummaryOpen && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="mt-3 p-3 rounded-xl bg-[#F8F7FC] border border-indigo-100 text-[11px] text-stone-700 space-y-1"
                              >
                                {article.aiSummary.slice(0, 2).map((pt, idx) => (
                                  <p key={idx} className="flex items-start gap-1.5">
                                    <span className="font-mono-num font-bold text-indigo-600">•</span>
                                    <span>{pt}</span>
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {/* 3. CLEAN NATIVE SPONSOR SLOT (DEMONSTRATING HIGH-CTR MONETIZATION) */}
                  <div className="mt-6">
                    <SeoXrayBadge
                      show={seoXray}
                      type="ad"
                      label="HIGH-CTR NATIVE SPONSOR CARD (AdSense Native / MGID / Direct Tech Affiliate)"
                      subtext="Blends with editorial UI • 4x higher CTR than ugly banner ads • Zero CLS"
                    />
                    <div className="bg-gradient-to-r from-[#F3F1EA] to-[#EAE7DD] rounded-2xl border border-[#DCD8CB] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-100 text-[10px] font-mono-num uppercase tracking-wider">
                            Partner Spotlight • Native Ad Slot
                          </span>
                          <span className="text-[11px] font-mono-num text-stone-500">
                            Est. Tech RPM: $6.40
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-stone-900">
                          Deploy Your Next.js Micro-Tools & News API with Zero Cold Starts
                        </h3>
                        <p className="text-xs text-stone-600 max-w-xl">
                          See how native editorial sponsorships and contextual SaaS affiliate placements earn 3x more than intrusive pop-unders while keeping readers happy.
                        </p>
                      </div>
                      <button
                        onClick={() => setSeoXray(true)}
                        className="px-4 py-2 rounded-xl bg-[#111315] hover:bg-indigo-600 text-white text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-colors"
                      >
                        <span>Inspect Ad Architecture</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDEBAR COLUMN (4 COLS ON DESKTOP) */}
                <aside className={isMobileSimulated || isTabletSimulated ? 'space-y-6' : 'lg:col-span-4 space-y-6'}>
                  {/* WIDGET 1: GOOGLE TRENDS BREAKOUT RADAR */}
                  <div className="bg-white rounded-2xl border border-[#E4E2DA] p-5 shadow-[0_2px_10px_rgba(17,19,21,0.02)]">
                    <SeoXrayBadge
                      show={seoXray}
                      type="seo"
                      label="INTERNAL LINKING & BREAKOUT KEYWORD HUB"
                      subtext="Passes crawl equity to fresh trending URLs within 5 minutes"
                    />
                    <div className="flex items-center justify-between pb-3.5 border-b border-[#ECEAE3]">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <h3 className="text-xs font-mono-num font-bold uppercase tracking-wider text-stone-900">
                          Google Trends Breakout Radar
                        </h3>
                      </div>
                      <button
                        onClick={() => setActiveNav('trends')}
                        className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-0.5"
                      >
                        <span>Full Matrix</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="divide-y divide-[#F0EEE8] mt-1">
                      {GOOGLE_TRENDS_RADAR.map((item) => (
                        <div
                          key={item.rank}
                          onClick={() => openArticle(item.articleId)}
                          className="py-3.5 group cursor-pointer flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono-num text-xs font-bold text-stone-400 group-hover:text-indigo-600">
                                {item.rank}
                              </span>
                              <span className="text-xs sm:text-[13px] font-bold text-stone-900 group-hover:text-indigo-600 truncate transition-colors">
                                {item.query}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5 pl-6">
                              {item.whyTrending}
                            </p>
                            <div className="flex items-center gap-2 pl-6 mt-1">
                              <span className="text-[10px] font-mono-num text-stone-500">
                                {item.volume} searches
                              </span>
                              {seoXray && (
                                <span className="text-[10px] font-mono-num px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 font-semibold">
                                  RPM: {item.rpmEstimate}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-end shrink-0">
                            <TrendSparkline data={item.sparkline} />
                            <span className="text-[11px] font-mono-num font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-1">
                              ↗ {item.velocity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WIDGET 2: 60-SECOND VISUAL SWIPE DECK LAUNCHER */}
                  <div className="bg-[#141413] text-white rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-mono-num font-semibold">
                        <Zap className="w-3 h-3" />
                        MOBILE-FIRST ENGAGEMENT
                      </span>
                      <span className="text-[11px] font-mono-num text-stone-400">60-Word Cards</span>
                    </div>
                    <h3 className="font-editorial text-2xl font-normal text-white">
                      Hate Long Articles? Flip Through Today’s Top 5 Stories in 60 Seconds.
                    </h3>
                    <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                      Designed for mobile commuters: crisp 60-word summaries, verified key stats, and one-tap audio playback.
                    </p>
                    <button
                      onClick={() => setActiveNav('shorts')}
                      className="mt-4 w-full py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Launch 60-Word Swipe Deck</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* WIDGET 3: LIVE READER PULSE POLL */}
                  <div className="bg-white rounded-2xl border border-[#E4E2DA] p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono-num font-bold uppercase tracking-wider text-indigo-600">
                        Live Community Pulse
                      </span>
                      <span className="text-[11px] font-mono-num text-stone-400">2,840 Votes</span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 leading-snug">
                      {ARTICLES_DATA[0].poll.question}
                    </h4>

                    <div className="mt-3 space-y-2">
                      {ARTICLES_DATA[0].poll.options.map((opt) => {
                        const selected = pollVotes[ARTICLES_DATA[0].id] === opt.id;
                        const hasVoted = !!pollVotes[ARTICLES_DATA[0].id];
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleVote(ARTICLES_DATA[0].id, opt.id)}
                            className={`w-full text-left p-2.5 rounded-xl border text-xs relative overflow-hidden transition-all ${
                              selected
                                ? 'border-indigo-600 bg-indigo-50/50 font-semibold text-indigo-950'
                                : 'border-[#E5E3DC] hover:border-stone-400 text-stone-800'
                            }`}
                          >
                            {hasVoted && (
                              <div
                                className="absolute inset-y-0 left-0 bg-indigo-500/10 transition-all duration-500"
                                style={{ width: `${opt.votes}%` }}
                              />
                            )}
                            <div className="relative flex items-center justify-between gap-2">
                              <span>{opt.text}</span>
                              {hasVoted && (
                                <span className="font-mono-num font-bold text-indigo-700">
                                  {opt.votes}%
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </main>
        )}

        {/* ===================================================================
            VIEW 2: INTERACTIVE 3-MODE ARTICLE READER
           =================================================================== */}
        {activeNav === 'article' && (
          <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
            {/* Top Back & SEO Route Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#E5E3DC]">
              <button
                onClick={() => setActiveNav('home')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Pulse Feed</span>
              </button>

              <div className="flex items-center gap-2 font-mono-num text-[11px] text-stone-500 bg-[#EFECE6] px-3 py-1 rounded-full">
                <Globe className="w-3 h-3 text-indigo-600" />
                <span className="truncate max-w-[220px] sm:max-w-md">
                  pulsewire.io{currentArticle.slug}
                </span>
              </div>
            </div>

            <SeoXrayBadge
              show={seoXray}
              type="seo"
              label="DEDICATED CLEAN SLUG + NewsArticle JSON-LD + Related Queries Accordion"
              subtext="Ranks for both main headline & 3 long-tail breakout questions"
            />

            {/* Article Header */}
            <article className="bg-white rounded-3xl border border-[#E4E2DA] p-5 sm:p-8 shadow-xs">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-stone-900 text-white text-[11px] font-semibold">
                  {currentArticle.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-mono-num font-semibold">
                  ↗ {currentArticle.trendSpike} Breakout Query
                </span>
                <span className="text-xs font-mono-num text-stone-500 ml-auto">
                  Updated {currentArticle.updatedAt} • {currentArticle.readTime}
                </span>
              </div>

              <h1 className="font-editorial text-2xl sm:text-4xl md:text-[42px] leading-[1.12] text-[#111315]">
                {currentArticle.title}
              </h1>

              <p className="mt-3 text-sm sm:text-base text-[#57534E] leading-relaxed">
                {currentArticle.subtitle}
              </p>

              {/* Author + Interactive Reading Mode Switcher */}
              <div className="mt-6 pt-4 border-t border-[#ECEAE3] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={currentArticle.author.avatar}
                    alt={currentArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-stone-900">
                        {currentArticle.author.name}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <p className="text-[11px] text-stone-500">{currentArticle.author.role}</p>
                  </div>
                </div>

                {/* 3-MODE READING SWITCHER */}
                <div className="flex items-center gap-1 bg-[#F3F1EA] p-1 rounded-xl border border-[#E2DFD7]">
                  <button
                    onClick={() => setReaderMode('editorial')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      readerMode === 'editorial'
                        ? 'bg-white text-stone-950 shadow-xs'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Editorial</span>
                  </button>
                  <button
                    onClick={() => setReaderMode('tldr')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      readerMode === 'tldr'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    <ListChecks className="w-3.5 h-3.5" />
                    <span>5-Bullet TL;DR</span>
                  </button>
                  <button
                    onClick={() => setReaderMode('timeline')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      readerMode === 'timeline'
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    <GitCommit className="w-3.5 h-3.5" />
                    <span>Timeline</span>
                  </button>
                </div>
              </div>

              {/* Embedded Audio Bar + Font Size Adjustment */}
              <div className="mt-4 p-3 rounded-2xl bg-[#F7F6F2] border border-[#E5E3DC] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => startAudio(e, currentArticle)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#111315] hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {audioTrack?.id === currentArticle.id && isPlaying ? (
                      <Pause className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {audioTrack?.id === currentArticle.id && isPlaying
                        ? 'Pause Audio Article'
                        : `Listen to Article (${currentArticle.listenDuration})`}
                    </span>
                  </button>
                  <button
                    onClick={cycleSpeed}
                    className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-xs font-mono-num font-semibold text-stone-700"
                  >
                    {playbackSpeed}x Speed
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-stone-500 mr-1">Text Size:</span>
                  <button
                    onClick={() => setFontScale(0.95)}
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      fontScale === 0.95 ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200'
                    }`}
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setFontScale(1)}
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      fontScale === 1 ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200'
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontScale(1.12)}
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      fontScale === 1.12 ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200'
                    }`}
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* 16:9 Featured Discover Image */}
              <figure className="mt-6">
                <div className="aspect-16/9 w-full rounded-2xl overflow-hidden bg-stone-900">
                  <img
                    src={currentArticle.image}
                    alt={currentArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] font-mono-num text-stone-500">
                  {currentArticle.imageCaption}
                </figcaption>
              </figure>

              {/* KEY IMPACT METRIC CALLOUT */}
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950 to-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono-num uppercase tracking-widest text-indigo-300">
                    Key Number to Know
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono-num font-bold text-white mt-0.5">
                    {currentArticle.keyStat.value}{' '}
                    <span className="text-sm font-sans-ui font-normal text-indigo-200">
                      — {currentArticle.keyStat.label}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-300 sm:max-w-xs leading-relaxed">
                  {currentArticle.keyStat.context}
                </p>
              </div>

              {/* DYNAMIC READER BODY BASED ON SELECTED MODE */}
              <div className="mt-6" style={{ fontSize: `${fontScale}rem` }}>
                {readerMode === 'editorial' && (
                  <div className="space-y-4 text-[#262523] leading-[1.8]">
                    {/* First Paragraph with Lead-In */}
                    {currentArticle.bodyParagraphs.map((para, index) => (
                      <p key={index} className={index === 0 ? 'font-medium text-stone-900' : ''}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {readerMode === 'tldr' && (
                  <div className="p-5 rounded-2xl bg-[#F8F7FC] border border-indigo-200 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono-num font-bold uppercase text-indigo-700">
                      <Sparkles className="w-4 h-4" />
                      <span>Executive 5-Bullet TL;DR Mode</span>
                    </div>
                    <ul className="space-y-2.5 text-stone-800 text-sm">
                      {currentArticle.aiSummary.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-mono-num flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {readerMode === 'timeline' && (
                  <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-[#E2DFD7]">
                    <h3 className="text-xs font-mono-num font-bold uppercase tracking-wider text-stone-700 mb-4">
                      Chronological Event Timeline
                    </h3>
                    <div className="relative pl-6 border-l-2 border-indigo-600 space-y-5">
                      {currentArticle.timeline.map((node, i) => (
                        <div key={i} className="relative">
                          <div className="w-3 h-3 rounded-full bg-indigo-600 border-2 border-white absolute -left-[31px] top-1" />
                          <span className="text-xs font-mono-num font-bold text-indigo-700">
                            {node.time}
                          </span>
                          <h4 className="text-sm font-bold text-stone-900 mt-0.5">{node.title}</h4>
                          <p className="text-xs text-stone-600 mt-0.5">{node.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* PEOPLE ALSO SEARCH ON GOOGLE (LONG-TAIL SEO ACCORDION) */}
              <div className="mt-8 pt-6 border-t border-[#ECEAE3]">
                <SeoXrayBadge
                  show={seoXray}
                  type="seo"
                  label="FAQ & BREAKOUT SUB-QUERIES (Captures Google 'People Also Ask' Featured Snippets)"
                  subtext="Each H3 targets a rising Google Trends long-tail question"
                />
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Breakout Questions People Are Searching Right Now</span>
                </h3>
                <div className="space-y-2.5">
                  {currentArticle.relatedQueries.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#F7F6F2] border border-[#E5E3DC]"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                        Q: {item.q}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-stone-600 mt-1 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* EMOJI REACTIONS & LIVE READER COMMENTS */}
              <div className="mt-8 pt-6 border-t border-[#ECEAE3]">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <span className="text-xs font-bold text-stone-700">
                    What’s your reaction to this story?
                  </span>
                  <div className="flex items-center gap-2">
                    {[
                      { key: 'fire', emoji: '🔥', label: 'Hot' },
                      { key: 'mindblown', emoji: '🤯', label: 'Big Shift' },
                      { key: 'clap', emoji: '👏', label: 'Great Move' },
                      { key: 'lightbulb', emoji: '💡', label: 'Insightful' }
                    ].map((react) => (
                      <button
                        key={react.key}
                        onClick={() => handleReaction(currentArticle.id, react.key)}
                        className="px-3 py-1.5 rounded-full bg-[#F5F4EF] hover:bg-stone-900 hover:text-white border border-[#E2DFD7] text-xs font-medium flex items-center gap-1.5 transition-all"
                      >
                        <span>{react.emoji}</span>
                        <span className="font-mono-num font-semibold">
                          {articleReactions[currentArticle.id]?.[react.key] || 0}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Comment Box */}
                <form onSubmit={handleAddComment} className="flex gap-2 mb-5">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add your perspective to the reader discussion..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#F7F6F2] border border-[#DFDDD4] text-xs text-stone-900 focus:outline-none focus:border-indigo-600"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#111315] hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post</span>
                  </button>
                </form>

                <div className="space-y-3">
                  {comments.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#ECEAE3] text-xs"
                    >
                      <div className="flex items-center justify-between text-stone-500 mb-1">
                        <span className="font-bold text-stone-900">{c.user}</span>
                        <span className="font-mono-num text-[11px]">{c.time}</span>
                      </div>
                      <p className="text-stone-700 leading-relaxed">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </main>
        )}

        {/* ===================================================================
            VIEW 3: 60-WORD VISUAL SWIPE DECK (MOBILE-FIRST "SHORTS FOR NEWS")
           =================================================================== */}
        {activeNav === 'shorts' && (
          <main className="max-w-lg mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[11px] font-mono-num font-bold uppercase tracking-wider text-indigo-600">
                  60-Word Visual Deck
                </span>
                <h2 className="text-lg font-bold text-stone-900">
                  Rapid News Cards ({shortIndex + 1} of {ARTICLES_DATA.length})
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    setShortIndex((prev) => (prev === 0 ? ARTICLES_DATA.length - 1 : prev - 1))
                  }
                  className="p-2 rounded-full bg-white border border-[#DEDBD2] hover:bg-stone-900 hover:text-white transition-colors"
                  title="Previous Card"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setShortIndex((prev) => (prev + 1) % ARTICLES_DATA.length)
                  }
                  className="p-2 rounded-full bg-white border border-[#DEDBD2] hover:bg-stone-900 hover:text-white transition-colors"
                  title="Next Card"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Segmented Story Progress Indicator */}
            <div className="grid grid-cols-5 gap-1.5 mb-4">
              {ARTICLES_DATA.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setShortIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === shortIndex ? 'bg-indigo-600' : idx < shortIndex ? 'bg-stone-400' : 'bg-stone-300'
                  }`}
                />
              ))}
            </div>

            {/* Active 60-Word Visual Card */}
            {(() => {
              const card = ARTICLES_DATA[shortIndex];
              return (
                <div className="bg-white rounded-3xl border border-[#E2DFD7] shadow-lg overflow-hidden">
                  <div className="relative aspect-16/9 bg-stone-900">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 text-white text-[11px] font-semibold">
                        {card.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-950/90 text-emerald-300 text-[11px] font-mono-num font-semibold">
                        ↗ {card.trendSpike}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                      <span className="text-[11px] font-mono-num text-emerald-300">
                        Key Metric: {card.keyStat.value} ({card.keyStat.label})
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="font-editorial text-2xl leading-tight text-stone-950">
                      {card.title}
                    </h3>

                    {/* Crisp 60-Word Summary */}
                    <p className="mt-3 text-sm text-stone-700 leading-relaxed bg-[#F7F6F2] p-4 rounded-2xl border border-[#EAE7DF]">
                      {card.sixtyWordSummary}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-[11px] font-mono-num text-stone-500">
                      <span>Verified by {card.author.name}</span>
                      <span>60 words • {card.publishedAt}</span>
                    </div>

                    {/* Bottom Card Actions */}
                    <div className="mt-5 pt-4 border-t border-[#ECEAE3] flex items-center justify-between gap-2">
                      <button
                        onClick={(e) => startAudio(e, card)}
                        className="px-3.5 py-2 rounded-xl bg-[#F3F1EA] hover:bg-stone-200 text-stone-900 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Headphones className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Listen ({card.listenDuration})</span>
                      </button>

                      <button
                        onClick={() => openArticle(card.id)}
                        className="px-4 py-2 rounded-xl bg-[#111315] hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <span>Read Full Story</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </main>
        )}

        {/* ===================================================================
            VIEW 4: GOOGLE TRENDS LIVE HEATMAP & PUBLISHER OPPORTUNITY MATRIX
           =================================================================== */}
        {activeNav === 'trends' && (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="bg-white rounded-3xl border border-[#E4E2DA] p-5 sm:p-7 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#ECEAE3]">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono-num font-bold uppercase text-emerald-700">
                    <TrendingUp className="w-4 h-4" />
                    Real-Time Search Intelligence
                  </span>
                  <h1 className="font-editorial text-3xl sm:text-4xl text-stone-950 mt-1">
                    Google Trends Breakout Matrix & Publisher RPM Radar
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Click any rising search topic below to open our live breakout coverage optimized for Google Discover.
                  </p>
                </div>

                <button
                  onClick={() => setSeoXray(!seoXray)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-900 border border-indigo-200 text-xs font-semibold"
                >
                  {seoXray ? 'Hide Publisher RPM Data' : 'Show Publisher RPM & Competition'}
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {GOOGLE_TRENDS_RADAR.map((trend) => (
                  <div
                    key={trend.rank}
                    onClick={() => openArticle(trend.articleId)}
                    className="group p-5 rounded-2xl bg-[#FAF9F5] hover:bg-white border border-[#E5E3DC] hover:border-stone-400 transition-all cursor-pointer flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-stone-900 text-white font-mono-num text-xs font-bold">
                            #{trend.rank}
                          </span>
                          <span className="text-xs font-semibold text-stone-500">
                            {trend.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-mono-num text-[11px] font-bold">
                            ↗ {trend.velocity}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-indigo-600 mt-2 transition-colors">
                          "{trend.query}"
                        </h3>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                          {trend.whyTrending}
                        </p>
                      </div>
                      <TrendSparkline data={trend.sparkline} />
                    </div>

                    <div className="pt-3 border-t border-[#EAE7DF] flex flex-wrap items-center justify-between gap-2 text-xs font-mono-num">
                      <div className="flex items-center gap-3 text-stone-600">
                        <span>Vol: <strong>{trend.volume}</strong></span>
                        <span>SEO Comp: <strong className="text-emerald-700">{trend.competition}</strong></span>
                        <span>Est. RPM: <strong className="text-indigo-700">{trend.rpmEstimate}</strong></span>
                      </div>
                      <span className="text-indigo-600 font-sans-ui font-semibold inline-flex items-center gap-1">
                        Read Live Story <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        )}

        {/* ===================================================================
            STICKY GLOBAL AUDIO PLAYER BAR (WHEN ACTIVE)
           =================================================================== */}
        {audioTrack && (
          <div className="fixed bottom-14 md:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl bg-[#141413] text-white rounded-2xl border border-stone-700 shadow-2xl px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shrink-0"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono-num uppercase tracking-wider text-emerald-400">
                    AI Neural Voice • {playbackSpeed}x
                  </span>
                  <span className="text-[10px] font-mono-num text-stone-400">
                    {audioProgress}%
                  </span>
                </div>
                <p className="text-xs font-semibold text-white truncate">{audioTrack.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={cycleSpeed}
                className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-[11px] font-mono-num"
              >
                {playbackSpeed}x
              </button>
              <button
                onClick={() => {
                  setAudioTrack(null);
                  setIsPlaying(false);
                }}
                className="p-1.5 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================
            MOBILE THUMB-ZONE BOTTOM NAVIGATION BAR
            (Visible on Mobile Screens or when Mobile Viewport Switcher is active)
           =================================================================== */}
        <div
          className={`${
            isMobileSimulated ? 'sticky bottom-0' : 'fixed bottom-0 left-0 right-0 md:hidden'
          } z-40 bg-white/95 backdrop-blur-md border-t border-[#E2DFD7] px-4 py-2 flex items-center justify-around`}
        >
          {[
            { id: 'home', label: 'Pulse Feed', icon: Newspaper },
            { id: 'shorts', label: '60w Deck', icon: Zap },
            { id: 'trends', label: 'Trends', icon: TrendingUp },
            { id: 'article', label: 'Reader', icon: BookOpen }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const active = activeNav === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveNav(tab.id)}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-[11px] font-semibold transition-colors ${
                  active ? 'text-indigo-600' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          3. MODAL: INSPECT GOOGLE NEWS JSON-LD SCHEMA & DISCOVER META TAGS
         ===================================================================== */}
      {showSchemaModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans-ui">
          <div className="bg-[#161615] text-stone-100 rounded-2xl border border-stone-700 max-w-2xl w-full p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold">
                  Ready-to-Use Google News & Discover SEO Code (For Current Story)
                </h3>
              </div>
              <button
                onClick={() => setShowSchemaModal(false)}
                className="p-1 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-400 mt-3 leading-relaxed">
              Place this exact block inside the <code className="text-indigo-300">&lt;head&gt;</code> of your article route so Google Search & Google Discover index your trending article within minutes:
            </p>

            <pre className="mt-3 p-4 rounded-xl bg-black/80 border border-stone-800 text-[11px] font-mono-num text-emerald-300 overflow-x-auto max-h-80">
              {generatedSchemaCode}
            </pre>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] text-stone-400">
                Includes <code className="text-stone-200">max-image-preview:large</code> for 16:9 Discover cards
              </span>
              <button
                onClick={copySchemaToClipboard}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSchema ? 'Copied to Clipboard!' : 'Copy SEO Code'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}