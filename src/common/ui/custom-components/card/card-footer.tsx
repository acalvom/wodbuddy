import type { PropsWithChildren } from 'react';
import { cn } from '@/common/ui/shade-ui/components/lib/utils';

export interface CardFooterProps {
	className?: string;
}

export const CardFooter = ({ children, className }: PropsWithChildren<CardFooterProps>) => {
	return <div className={cn('px-4 py-2 border-primary', className)}>{children}</div>;
};
