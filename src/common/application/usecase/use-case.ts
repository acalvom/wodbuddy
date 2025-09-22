export interface UseCase<Params = void, Result = void> {
	execute(params: Params): Promise<Result>;
}
