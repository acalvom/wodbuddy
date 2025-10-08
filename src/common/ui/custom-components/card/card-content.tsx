import type { PropsWithChildren } from 'react';
import { cn } from '@/common/ui/shade-ui/components/lib/utils';

export interface CardContentProps {
	className?: string;
}

export const CardContent = ({ children, className }: PropsWithChildren<CardContentProps>) => {
	return (
		<div className={cn('w-full flex flex-row flex-wrap justify-between gap-4 p-4 text-primary text-sm', className)}>
			{children}
		</div>
	);
};
