import type { PropsWithChildren } from 'react';

type SubtitleProps = {
	className?: string;
};

export const Subtitle = ({ className, children }: PropsWithChildren<SubtitleProps>) => {
	const subtitleClassName = `text-lg font-semibold text-info mb-4 ${className || ''}`;

	return <h3 className={subtitleClassName}>{children}</h3>;
};
