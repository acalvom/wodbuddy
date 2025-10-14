import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { InputFormItem } from '@/common/ui/custom-components/form-items/input-form-item';
import { SubmitButton } from '@/common/ui/custom-components/form-items/submit-button-item';
import { Form } from '@/common/ui/shade-ui/components/ui/form';
import { type ZodLogin, ZodLoginSchema } from '@/features/auth/ui/models/zod-login';

type LoginFormProps = {
	onSubmit: (data: ZodLogin) => Promise<void>;
	isLoading?: boolean;
};

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

				<InputFormItem control={form.control} name="email" label="Email" placeholder="tu@email.com" />
				<InputFormItem control={form.control} name="password" label="Contraseña" placeholder="••••••••" type="password" />

				<SubmitButton isLoading={isLoading}>Entrar</SubmitButton>

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
