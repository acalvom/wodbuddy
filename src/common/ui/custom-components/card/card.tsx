import type { ReactNode } from 'react';

export const Card = ({ children }: { children: ReactNode }) => {
	return (
		<div
			className="w-full max-w-xs mx-auto p-1 rounded-xl transition-all duration-300
			bg-gradient-to-br from-primary to-secondary
			hover:bg-gradient-to-br hover:from-secondary hover:via-primary hover:to-accent
			shadow-[0_4px_12px_var(--color-shadow-base),0_0_20px_var(--color-shadow-primary)]
			hover:shadow-[0_6px_20px_var(--color-shadow-base-hover),0_0_30px_var(--color-shadow-secondary-hover),0_0_50px_var(--color-shadow-primary-hover)]
			hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
		>
			<div className="bg-card-background rounded-lg p-4 h-full flex flex-col items-center space-y-3">{children}</div>
		</div>
	);
};
