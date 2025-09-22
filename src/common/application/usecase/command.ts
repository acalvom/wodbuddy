import type { UseCase } from './use-case';

export interface Command<Params = void, Result = void> extends UseCase<Params, Result> {}
