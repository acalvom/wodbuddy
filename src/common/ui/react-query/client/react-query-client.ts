import { type DefaultOptions, QueryClient } from '@tanstack/react-query';
import { HttpError, HttpStatusCodes } from './http-error.ts';

const defaultOptions: DefaultOptions = {
	queries: {
		refetchOnWindowFocus: false
	},
	mutations: {
		onError: (error: unknown): void => {
			if (!(error instanceof HttpError)) {
				console.error(error);
				return;
			}

			if (error.status === HttpStatusCodes.Unauthorized) {
				return;
			}

			if (error.message) {
				console.error(error.message);
				return;
			}

			console.error(error);
		}
	}
};

const queryClient = new QueryClient({
	defaultOptions
});

export { queryClient };
