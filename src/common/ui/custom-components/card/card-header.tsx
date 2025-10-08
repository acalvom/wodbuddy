import type { PropsWithChildren } from 'react';
import { cn } from '@/common/ui/shade-ui/components/lib/utils';

export interface CardHeaderProps {
	className?: string;
}

export const CardHeader = ({ className, children }: PropsWithChildren<CardHeaderProps>) => {
	return <div className={cn('items-center flex flex-col my-2', className)}>{children}</div>;
};
