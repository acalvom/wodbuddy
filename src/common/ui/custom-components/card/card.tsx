import type { ReactNode } from 'react';

export const Card = ({ children }: { children: ReactNode }) => {
	return (
		<div className="max-w-[350px] rounded-2xl bg-card p-6 shadow-lg transition border flex flex-col items-center">
			{children}
		</div>
	);
};
