import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import { useLogin } from '../controllers/use-login.hook';

const loginSchema = z.object({
	email: z.email('Email inválido'),
	password: z.string().min(6, 'Mínimo 6 caracteres')
});

type LoginInputs = z.infer<typeof loginSchema>;

export function LoginForm() {
	const navigate = useNavigate();
	const { mutateAsync: login, isPending, error } = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginInputs>({
		resolver: zodResolver(loginSchema)
	});

	const onSubmit = async (data: LoginInputs) => {
		await login(data);
		navigate('/home');
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg">
				<h1 className="text-2xl font-bold text-gray-800">Iniciar sesión</h1>

				{/* Email */}
				<div>
					<label className="block text-sm font-medium text-gray-700">Email</label>
					<input
						type="email"
						placeholder="tu@email.com"
						{...register('email')}
						className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					{errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
				</div>

				{/* Password */}
				<div>
					<label className="block text-sm font-medium text-gray-700">Contraseña</label>
					<input
						type="password"
						placeholder="••••••"
						{...register('password')}
						className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					{errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
				</div>

				{/* Submit */}
				<button
					type="submit"
					disabled={isPending}
					className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
				>
					{isPending ? 'Cargando...' : 'Entrar'}
				</button>

				{/* Link a signup */}
				<p className="mt-4 text-center text-sm text-gray-600">
					¿No tienes cuenta?{' '}
					<Link to="/signup" className="font-semibold text-blue-600 hover:underline">
						Regístrate
					</Link>
				</p>

				{/* Error global */}
				{error && <p className="mt-2 text-sm text-red-500">{(error as Error).message}</p>}
			</form>
		</div>
	);
}
