import type { IAuthUser } from '@/features/auth/domain/interfaces/auth-user.ts';
import type { AuthUserPrimitives } from '@/features/auth/domain/interfaces/auth-user-primitives.ts';

export class AuthUser implements IAuthUser {
	id: string;
	email: string;
	createdAt: Date;
	token: string;

	constructor({ id, email, createdAt, token }: IAuthUser) {
		this.id = id;
		this.email = email;
		this.createdAt = createdAt;
		this.token = token;
	}

	static fromPrimitives(value: AuthUserPrimitives): AuthUser {
		return new AuthUser({
			id: value.id,
			email: value.email,
			token: value.token ?? undefined,
			createdAt: new Date(value.createdAt) // TODO: parser de fechas en common/domain
		});
	}
}
