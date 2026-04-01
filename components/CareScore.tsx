'use client';

interface CareScoreProps {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  size?: number;
}

const GRADE_COLORS: Record<string, string> = {
  A: '#06D6A0',
  B: '#0EA5E9',
  C: '#FFD166',
  D: '#F47D31',
  F: '#EF476F',
};

export default function CareScore({ score, grade, size = 160 }: CareScoreProps) {
  const color = GRADE_COLORS[grade];
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
    }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--warm-gray)"
            strokeWidth="8"
          />
          {/* Fill */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
        </svg>

        {/* Grade */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
        }}>
          <span style={{
            fontFamily: 'DM Serif Display, Georgia, serif',
            fontSize: size * 0.3,
            lineHeight: 1,
            color: color,
          }}>
            {grade}
          </span>
          <span style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: size * 0.12,
            fontWeight: 600,
            color: 'var(--text-muted)',
          }}>
            {score}/100
          </span>
        </div>
      </div>

      <span style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: '13px',
        fontWeight: 600,
        color: color,
        letterSpacing: '0.05em',
        textTransform: 'uppercase' as const,
      }}>
        Care Score
      </span>
    </div>
  );
}
