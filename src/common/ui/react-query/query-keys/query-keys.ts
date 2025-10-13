export const LOGIN_KEY = 'login-key';
export const LOGOUT_KEY = 'logout-key';
export const SIGNUP_KEY = 'signup-key';
export const AUTH_USER_KEY = 'auth-user-key';
export const MOVEMENTS_KEY = 'movements-key';
export const MOVEMENT_KEY = 'movement-key';
export const MARKS_KEY = 'marks-key';
export const MARK_KEY = 'mark-key';

export const MarkQueryKeys = {
	all: () => [MARKS_KEY] as const,
	byMovementId: (movementId: number) => [MARKS_KEY, 'by-movement', movementId] as const,
	currentPrByMovementId: (movementId: number) => [MARKS_KEY, 'current-pr', movementId] as const,
	currentRmByMovementId: (movementId: number) => [MARKS_KEY, 'current-rm', movementId] as const
} as const;

export const MovementQueryKeys = {
	all: () => [MOVEMENTS_KEY] as const,
	byId: (id: number) => [MOVEMENTS_KEY, 'detail', id] as const
} as const;

export const AuthQueryKeys = {
	user: () => [AUTH_USER_KEY] as const,
	login: () => [LOGIN_KEY] as const,
	logout: () => [LOGOUT_KEY] as const,
	signup: () => [SIGNUP_KEY] as const
} as const;
