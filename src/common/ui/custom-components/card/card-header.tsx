import type { ReactNode } from 'react';

export const CardHeader = ({ children }: { children: ReactNode }) => {
	return <div className="items-center flex flex-col my-2">{children}</div>;
};
