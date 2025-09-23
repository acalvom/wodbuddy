import {
	type MutateOptions,
	type MutationFunction,
	type UseMutationOptions,
	type UseMutationResult,
	useMutation
} from '@tanstack/react-query';

export type UseMutation<TData, TError, TVariables, TContext> = {
	throwableMutateAsync: (
		variables: TVariables,
		options?: MutateOptions<TData, TError, TVariables, TContext>
	) => Promise<TData>;
	mutateAsync: (
		variables: TVariables,
		options?: MutateOptions<TData, TError, TVariables, TContext>
	) => Promise<TData | undefined>;
} & Omit<UseMutationResult<TData, TError, TVariables, TContext>, 'mutateAsync'>;

const useMutationWrapper = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
	mutationFn: MutationFunction<TData, TVariables>,
	options?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutation<TData, TError, TVariables, TContext> => {
	const mutation = useMutation<TData, TError, TVariables, TContext>({ ...options, mutationFn });

	const mutateAsync = async (
		variables: TVariables,
		options?: MutateOptions<TData, TError, TVariables, TContext>
	): Promise<TData | undefined> => {
		try {
			return await mutation.mutateAsync(variables, options);
		} catch (err) {
			return undefined;
		}
	};

	return {
		...mutation,
		throwableMutateAsync: mutation.mutateAsync,
		mutateAsync
	};
};

export { useMutationWrapper };
