import type { PropsWithChildren } from 'react';
import { cn } from '@/common/ui/shade-ui/components/lib/utils';

export interface TitleProps {
	className?: string;
}

export const Title = ({ className, children }: PropsWithChildren<TitleProps>) => {
	return (
		<h2 className={cn('text-xl font-bold uppercase text-primary mb-3 text-high-contrast', className)}>{children}</h2>
	);
};
