import type { PropsWithChildren } from 'react';

type SubtitleProps = {
	className?: string;
};

export const Subtitle = ({ className, children }: PropsWithChildren<SubtitleProps>) => {
	const subtitleClassName = `text-base font-semibold text-secondary mb-3 ${className || ''}`;

	return <h3 className={subtitleClassName}>{children}</h3>;
};
