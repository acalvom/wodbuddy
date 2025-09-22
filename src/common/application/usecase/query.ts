import type { UseCase } from './use-case';

export interface Query<Result = void, Params = void> extends UseCase<Params, Result> {}
