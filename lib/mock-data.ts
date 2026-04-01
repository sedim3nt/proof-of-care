export type Category =
  | 'Mentorship'
  | 'Emergency Aid'
  | 'Community Service'
  | 'Emotional Support'
  | 'Physical Help'
  | 'Skill Sharing'
  | 'Caregiving'
  | 'Mutual Aid'
  | 'Other';

export const CATEGORIES: Category[] = [
  'Mentorship',
  'Emergency Aid',
  'Community Service',
  'Emotional Support',
  'Physical Help',
  'Skill Sharing',
  'Caregiving',
  'Mutual Aid',
  'Other',
];

export const CATEGORY_EMOJI: Record<Category, string> = {
  Mentorship: '📚',
  'Emergency Aid': '🚨',
  'Community Service': '🌱',
  'Emotional Support': '❤️‍🔥',
  'Physical Help': '🏠',
  'Skill Sharing': '🤝',
  Caregiving: '🫶',
  'Mutual Aid': '🌐',
  Other: '✨',
};

export const CATEGORY_COLOR: Record<Category, string> = {
  Mentorship: '#C3B1E1',
  'Emergency Aid': '#EF476F',
  'Community Service': '#06D6A0',
  'Emotional Support': '#F47D31',
  'Physical Help': '#FFD166',
  'Skill Sharing': '#0EA5E9',
  Caregiving: '#FFB88C',
  'Mutual Aid': '#34D399',
  Other: '#A0A3BD',
};

export interface Attestation {
  id: string;
  from: string;
  fromName: string;
  to: string;
  toName: string;
  category: Category;
  description: string;
  date: string;
  bilateral: boolean;
  txHash: string;
}

export const MOCK_ATTESTATIONS: Attestation[] = [
  {
    id: 'attest-001',
    from: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    fromName: 'Maya Chen',
    to: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c',
    toName: 'Jordan Rivers',
    category: 'Mentorship',
    description: 'Jordan spent 6 months mentoring me through a career transition into Web3. Weekly calls, code reviews, and endless patience. Life-changing.',
    date: '2025-03-15',
    bilateral: true,
    txHash: '0xabc123def456',
  },
  {
    id: 'attest-002',
    from: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
    fromName: 'Tomás García',
    to: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e',
    toName: 'Nia Okafor',
    category: 'Emergency Aid',
    description: 'Nia showed up at 2am when my apartment flooded. Helped move everything, stayed until 5am, and brought food the next day. Never asked for anything.',
    date: '2025-03-10',
    bilateral: true,
    txHash: '0xbcd234efa567',
  },
  {
    id: 'attest-003',
    from: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
    fromName: 'Priya Sharma',
    to: '0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a',
    toName: 'Community Garden Collective',
    category: 'Community Service',
    description: 'Organized 40+ volunteers over 3 seasons to maintain the Riverside Community Garden. Over 2,000 lbs of produce donated to food pantries.',
    date: '2025-02-28',
    bilateral: false,
    txHash: '0xcde345fab678',
  },
  {
    id: 'attest-004',
    from: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
    fromName: 'Sam Kowalski',
    to: '0x8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c',
    toName: 'River Stone',
    category: 'Emotional Support',
    description: 'River checked in on me every day for 3 months after my mom passed. Not advice — just presence. That kind of care is rarer than gold.',
    date: '2025-02-20',
    bilateral: true,
    txHash: '0xdef456abc789',
  },
  {
    id: 'attest-005',
    from: '0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
    fromName: 'Amara Johnson',
    to: '0xa0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9',
    toName: 'Marcus Webb',
    category: 'Physical Help',
    description: 'Marcus helped me move to my new apartment — 4 flights of stairs, no elevator, July heat. Refused payment, just said "pay it forward."',
    date: '2025-02-14',
    bilateral: true,
    txHash: '0xefa567bcd890',
  },
  {
    id: 'attest-006',
    from: '0xb1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0',
    fromName: 'Devon Park',
    to: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    toName: 'Maya Chen',
    category: 'Skill Sharing',
    description: 'Maya taught me Figma and design fundamentals over 8 sessions. Now I can actually contribute to our DAO\'s design work. Incredibly generous with her time.',
    date: '2025-02-10',
    bilateral: true,
    txHash: '0xfab678cde901',
  },
  {
    id: 'attest-007',
    from: '0xc2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1',
    fromName: 'Zara Ahmed',
    to: '0xd3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2',
    toName: 'Lena Russo',
    category: 'Caregiving',
    description: 'Lena provided in-home care for my grandmother 3 days a week for 6 months while I was recovering from surgery. Gentle, professional, and truly kind.',
    date: '2025-01-30',
    bilateral: true,
    txHash: '0xabc789def012',
  },
  {
    id: 'attest-008',
    from: '0xe4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3',
    fromName: 'Kwame Asante',
    to: '0xf5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4',
    toName: 'Boulder Mutual Aid Network',
    category: 'Mutual Aid',
    description: 'This network coordinated delivery of groceries and medicine to 60+ elderly residents during the January ice storm. Community infrastructure at its finest.',
    date: '2025-01-25',
    bilateral: false,
    txHash: '0xbcd890efa123',
  },
  {
    id: 'attest-009',
    from: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c',
    fromName: 'Jordan Rivers',
    to: '0xc2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1',
    toName: 'Zara Ahmed',
    category: 'Mentorship',
    description: 'Zara connected me with three key people who changed the trajectory of my career. She asks nothing in return — she just builds the web.',
    date: '2025-01-20',
    bilateral: true,
    txHash: '0xcde901fab234',
  },
  {
    id: 'attest-010',
    from: '0xa0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9',
    fromName: 'Marcus Webb',
    to: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
    toName: 'Tomás García',
    category: 'Community Service',
    description: 'Tomás organized a neighborhood tree-planting day that brought 30 strangers together. He handled permits, tools, and follow-up watering for a month after.',
    date: '2025-01-15',
    bilateral: true,
    txHash: '0xdef012abc345',
  },
  {
    id: 'attest-011',
    from: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e',
    fromName: 'Nia Okafor',
    to: '0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
    toName: 'Amara Johnson',
    category: 'Emotional Support',
    description: 'Amara talked me through the scariest night of my life when I was questioning everything. She listened without judgment. I wouldn\'t be here without that call.',
    date: '2025-01-10',
    bilateral: true,
    txHash: '0xefa123bcd456',
  },
  {
    id: 'attest-012',
    from: '0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a',
    fromName: 'Community Garden Collective',
    to: '0xb1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0',
    toName: 'Devon Park',
    category: 'Skill Sharing',
    description: 'Devon taught our whole collective how to use composting systems and built us a tool library app. Turned our chaos into a real organization.',
    date: '2025-01-05',
    bilateral: true,
    txHash: '0xfab234cde567',
  },
  {
    id: 'attest-013',
    from: '0x8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c',
    fromName: 'River Stone',
    to: '0xe4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3',
    toName: 'Kwame Asante',
    category: 'Physical Help',
    description: 'Kwame and his crew rebuilt our community center\'s roof for free after the storm damage. Two weekends of hard labor. Transformative.',
    date: '2024-12-28',
    bilateral: true,
    txHash: '0xabc345def678',
  },
  {
    id: 'attest-014',
    from: '0xd3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2',
    fromName: 'Lena Russo',
    to: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
    toName: 'Priya Sharma',
    category: 'Mutual Aid',
    description: 'Priya coordinated a mutual aid fund that kept 12 families afloat during the city\'s eviction wave. Zero admin overhead — every dollar went to people.',
    date: '2024-12-20',
    bilateral: true,
    txHash: '0xbcd456efa789',
  },
  {
    id: 'attest-015',
    from: '0xf5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4',
    fromName: 'Boulder Mutual Aid Network',
    to: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
    toName: 'Sam Kowalski',
    category: 'Caregiving',
    description: 'Sam has volunteered with our network every week for 2 years. He knows every elder on our list by name. That consistency is irreplaceable.',
    date: '2024-12-15',
    bilateral: true,
    txHash: '0xcde567fab890',
  },
  {
    id: 'attest-016',
    from: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    fromName: 'Maya Chen',
    to: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e',
    toName: 'Nia Okafor',
    category: 'Skill Sharing',
    description: 'Nia rewrote our entire onboarding documentation and trained 20 new contributors. Single-handedly doubled our DAO\'s effective capacity.',
    date: '2024-12-10',
    bilateral: false,
    txHash: '0xdef678abc901',
  },
  {
    id: 'attest-017',
    from: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c',
    fromName: 'Jordan Rivers',
    to: '0x8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c',
    toName: 'River Stone',
    category: 'Emotional Support',
    description: 'River organized a grief circle after our community lost three members in one month. Created space for collective healing that no institution offered.',
    date: '2024-12-05',
    bilateral: true,
    txHash: '0xefa789bcd012',
  },
  {
    id: 'attest-018',
    from: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
    fromName: 'Tomás García',
    to: '0xd3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2',
    toName: 'Lena Russo',
    category: 'Emergency Aid',
    description: 'Lena translated medical information for my family when we had no Spanish-speaking staff available. Showed up on her day off and stayed 6 hours.',
    date: '2024-11-30',
    bilateral: true,
    txHash: '0xfab890cde123',
  },
  {
    id: 'attest-019',
    from: '0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
    fromName: 'Amara Johnson',
    to: '0xc2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1',
    toName: 'Zara Ahmed',
    category: 'Mentorship',
    description: 'Zara saw something in me before I saw it in myself. Her mentorship over 18 months was the most ROI-positive relationship I\'ve ever had — and she never talked about ROI.',
    date: '2024-11-25',
    bilateral: true,
    txHash: '0xabc901def234',
  },
  {
    id: 'attest-020',
    from: '0xb1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0',
    fromName: 'Devon Park',
    to: '0xf5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4',
    toName: 'Boulder Mutual Aid Network',
    category: 'Community Service',
    description: 'This network is the immune system of our city. Invisible when things are fine, essential when they\'re not. Support them however you can.',
    date: '2024-11-20',
    bilateral: false,
    txHash: '0xbcd012efa345',
  },
  {
    id: 'attest-021',
    from: '0xe4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3',
    fromName: 'Kwame Asante',
    to: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    toName: 'Maya Chen',
    category: 'Mutual Aid',
    description: 'Maya organized a skill-swap market where 80 community members traded services without money changing hands. Pure Ostrom commons in action.',
    date: '2024-11-15',
    bilateral: true,
    txHash: '0xcde123fab456',
  },
  {
    id: 'attest-022',
    from: '0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a',
    fromName: 'Community Garden Collective',
    to: '0xa0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9',
    toName: 'Marcus Webb',
    category: 'Physical Help',
    description: 'Marcus maintains our garden tools for free and has rebuilt three of our raised beds from salvaged wood. Does it quietly, never seeks recognition.',
    date: '2024-11-10',
    bilateral: true,
    txHash: '0xdef234abc567',
  },
];

// Profile mock data
export const MOCK_PROFILES: Record<string, {
  address: string;
  name: string;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  totalAttestations: number;
  bilateralCount: number;
  categoryBreakdown: Partial<Record<Category, number>>;
  joinedDate: string;
}> = {
  '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b': {
    address: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    name: 'Maya Chen',
    score: 94,
    grade: 'A',
    totalAttestations: 18,
    bilateralCount: 15,
    categoryBreakdown: {
      Mentorship: 6,
      'Skill Sharing': 5,
      'Mutual Aid': 4,
      'Community Service': 3,
    },
    joinedDate: '2024-06-01',
  },
  '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c': {
    address: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c',
    name: 'Jordan Rivers',
    score: 87,
    grade: 'B',
    totalAttestations: 14,
    bilateralCount: 11,
    categoryBreakdown: {
      Mentorship: 7,
      'Emotional Support': 4,
      'Skill Sharing': 3,
    },
    joinedDate: '2024-07-15',
  },
  '0xc2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1': {
    address: '0xc2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1',
    name: 'Zara Ahmed',
    score: 96,
    grade: 'A',
    totalAttestations: 22,
    bilateralCount: 20,
    categoryBreakdown: {
      Mentorship: 10,
      'Mutual Aid': 5,
      'Emotional Support': 4,
      'Community Service': 3,
    },
    joinedDate: '2024-05-01',
  },
  '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d': {
    address: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
    name: 'Tomás García',
    score: 78,
    grade: 'B',
    totalAttestations: 11,
    bilateralCount: 8,
    categoryBreakdown: {
      'Community Service': 5,
      'Emergency Aid': 3,
      'Physical Help': 3,
    },
    joinedDate: '2024-09-01',
  },
};

// Stats
export const MOCK_STATS = {
  totalAttestations: 1247,
  uniqueAddresses: 486,
  bilateralRate: 0.73,
  topCategories: ['Mentorship', 'Emotional Support', 'Community Service'],
};
