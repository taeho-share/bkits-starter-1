import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'high' | 'medium' | 'low' | 'work' | 'personal' | 'health' | 'learning' | 'other';
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-gray-100 text-gray-700',
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
  work: 'bg-blue-100 text-blue-700',
  personal: 'bg-purple-100 text-purple-700',
  health: 'bg-emerald-100 text-emerald-700',
  learning: 'bg-indigo-100 text-indigo-700',
  other: 'bg-gray-100 text-gray-700',
};

const labelMap: Record<string, string> = {
  high: '높음',
  medium: '보통',
  low: '낮음',
  work: '업무',
  personal: '개인',
  health: '건강',
  learning: '학습',
  other: '기타',
};

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant] || variantStyles.default,
        className
      )}
    >
      {labelMap[label] || label}
    </span>
  );
}
