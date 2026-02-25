import cn from '@/common/utils/tailwindcss/cn';

interface ISearchCountIndicatorProps {
  className?: string;
  label: string;
  count: number;
}

function SearchCountIndicator(props: ISearchCountIndicatorProps) {
  const {
    className,
    label,
    count,
  } = props;

  return (
    <div className={cn(
      'flex items-center gap-4',
      'text-cdri-primary-2 leading-6 font-medium',
      className
    )}>
      <div className={cn(
        ''
      )}>
        {label}
      </div>
      <div className={cn(
        // 
      )}>
        총 <span className="text-cdri-primary">{count}</span>건
      </div>
    </div>
  );
}

export default SearchCountIndicator;
