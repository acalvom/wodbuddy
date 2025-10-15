import type { PropsWithChildren } from 'react';
import { cn } from '@/common/ui/shade-ui/components/lib/utils';

export interface SubtitleProps {
	className?: string;
}

export const Subtitle = ({ className, children }: PropsWithChildren<SubtitleProps>) => {
	return <h3 className={cn('text-base font-semibold text-secondary mb-3', className)}>{children}</h3>;
};
