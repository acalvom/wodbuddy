import type { PropsWithChildren } from 'react';

type TitleProps = {
	className?: string;
};

export const Title = ({ className, children }: PropsWithChildren<TitleProps>) => {
	const titleClassName = `text-xl font-bold uppercase text-primary mb-3 text-high-contrast ${className || ''}`;

	return <h2 className={titleClassName}>{children}</h2>;
};
