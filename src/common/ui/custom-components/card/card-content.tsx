import type { ReactNode } from 'react';

export const CardContent = ({ children }: { children: ReactNode }) => {
	return <div className="w-full flex flex-row flex-wrap justify-between gap-4 p-4 text-primary text-sm">{children}</div>;
};
