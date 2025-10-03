import { Loader2Icon } from 'lucide-react';

export const Loading = () => {
	return (
		<div className="flex items-center justify-center h-full" data-testid="loading">
			<Loader2Icon className="animate-spin h-8 w-8" />
		</div>
	);
};
