import type { ReactNode } from 'react';

export const CardFooter = ({ children }: { children: ReactNode }) => {
	return <div className="px-4 py-2 border-primary">{children}</div>;
};
