import { Toast } from '@/common/ui/custom-components/toast/toast';
import { LoginForm } from '@/features/auth/ui/components/login-form.component.tsx';
import { useAuth } from '../hooks/use-auth.hook';
import { zodToDomain } from '../mappers/zod-to-domain.mapper';
import type { ZodLogin } from '../models/zod-login';

export function LoginPage() {
	const { onLogin, isLoading, error } = useAuth();

	const onSubmit = async (data: ZodLogin) => {
		try {
			const loginRequest = zodToDomain(data);
			return await onLogin(loginRequest);
		} catch {}
	};

	return (
		<div className="min-h-screen bg-background px-4 py-6">
			<div className="container mx-auto max-w-sm">
				<LoginForm onSubmit={onSubmit} isLoading={isLoading} />
				<Toast type="error" title="Error al iniciar sesión" description={error?.message} open={!!error} />
			</div>
		</div>
	);
}
