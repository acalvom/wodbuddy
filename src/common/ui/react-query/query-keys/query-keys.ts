import type { Id } from '@/common/domain/interfaces/id';

const LOGIN_KEY = 'login-key';
const LOGOUT_KEY = 'logout-key';
const SIGNUP_KEY = 'signup-key';
const AUTH_USER_KEY = 'auth-user-key';
const MOVEMENTS_KEY = 'movements-key';
const MARKS_KEY = 'marks-key';

/**
 * Keys para autenticación
 */
export const AuthQueryKeys = {
	user: () => [AUTH_USER_KEY] as const,
	login: () => [LOGIN_KEY] as const,
	logout: () => [LOGOUT_KEY] as const,
	signup: () => [SIGNUP_KEY] as const
} as const;

/**
 * Keys para movimientos
 * Estructura: ['movements', ...params]
 */
export const MovementQueryKeys = {
	all: () => [MOVEMENTS_KEY] as const,
	byId: (id: Id) => [MOVEMENTS_KEY, id] as const
} as const;

/**
 * Keys jerárquicas para marcas
 * Estructura: ['marks', ...params]
 */
export const MarkQueryKeys = {
	all: () => [MARKS_KEY] as const,
	byMovementId: (movementId: Id) => [MARKS_KEY, 'by-movement', movementId] as const,
	currentPrByMovementId: (movementId: Id) => [MARKS_KEY, 'current-pr', movementId] as const,
	currentRmByMovementId: (movementId: Id) => [MARKS_KEY, 'current-rm', movementId] as const
} as const;
