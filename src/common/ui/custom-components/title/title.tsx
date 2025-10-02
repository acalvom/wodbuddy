import type { PropsWithChildren } from 'react';

type TitleProps = {
	className?: string;
};

export const Title = ({ className, children }: PropsWithChildren<TitleProps>) => {
	const titleClassName = `text-3xl text-shadow-lg font-bold uppercase text-destructive mb-4 ${className || ''}`;

	return <h2 className={titleClassName}>{children}</h2>;
};
