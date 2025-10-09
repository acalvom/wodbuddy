import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { InputFormItem } from '@/common/ui/custom-components/form-items/input-form-item.tsx';
import { Button } from '@/common/ui/shade-ui/components/ui/button.tsx';
import { Form } from '@/common/ui/shade-ui/components/ui/form.tsx';
import { type ZodLogin, ZodLoginSchema } from '@/features/auth/ui/models/zod-login.ts';

type LoginFormProps = {
	onSubmit: (data: ZodLogin) => Promise<void>;
	isLoading?: boolean;
};

// TODO: refactorizar en componentes Input, Button...

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
	const form = useForm<ZodLogin>({
		resolver: zodResolver(ZodLoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="glass w-full max-w-md space-y-6 p-6">
				<h1 className="text-2xl font-bold text-primary mb-6 text-center">Iniciar sesión</h1>

				<InputFormItem
					control={form.control}
					name="email"
					label="Email"
					placeholder="tu@email.com"
				/>
				<InputFormItem
					control={form.control}
					name="password"
					label="Contraseña"
					placeholder="••••••••"
					type="password"
				/>
				<Button
					type="submit"
					disabled={isLoading}
					className="glow w-full py-4 px-6 text-base font-semibold mt-8 
								h-12 rounded-xl touch-manipulation active:scale-95 transition-transform"
				>
					{isLoading ? 'Cargando...' : 'Entrar'}
				</Button>

				<p className="mt-6 text-center text-sm text-muted-foreground">
					¿No tienes cuenta?{' '}
					<Link to="/signup" className="font-semibold text-primary hover:underline">
						Regístrate
					</Link>
				</p>
			</form>
		</Form>
	);
};
