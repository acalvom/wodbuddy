import type { PropsWithChildren } from 'react';
import { cn } from '@/common/ui/shade-ui/components/lib/utils';

export interface CaptionProps {
	className?: string;
}

export const Caption = ({ className, children }: PropsWithChildren<CaptionProps>) => {
	return <h4 className={cn('text-md font-semibold text-muted-foreground mb-2', className)}>{children}</h4>;
};
