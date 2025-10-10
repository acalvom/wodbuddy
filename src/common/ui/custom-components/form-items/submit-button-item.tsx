import type { PropsWithChildren } from 'react';
import { cn } from '../../shade-ui/components/lib/utils';
import { Button } from '../../shade-ui/components/ui/button';
import { Spinner } from '../../shade-ui/components/ui/spinner';

type SubmitButtonProps = {
	className?: string;
	isLoading?: boolean;
};

export const SubmitButton = ({ className, isLoading, children }: PropsWithChildren<SubmitButtonProps>) => {
	return (
		<Button
			type="submit"
			disabled={isLoading}
			className={cn(
				'glow w-full py-4 px-6 text-base font-semibold mt-8 h-12 rounded-xl touch-manipulation active:scale-95 transition-transform',
				className
			)}
		>
			{isLoading ? <Spinner /> : children}
		</Button>
	);
};
