import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSignup } from '../controllers/use-signup.hook';

const signupSchema = z.object({
	firstName: z.string().min(2, 'El nombre es demasiado corto'),
	lastName: z.string().min(2, 'El apellido es demasiado corto'),
	email: z.email('Email inválido'),
	password: z.string().min(6, 'Mínimo 6 caracteres')
});

type SignupInputs = z.infer<typeof signupSchema>;

export function SignupForm() {
	const { mutateAsync: signup, isPending, error } = useSignup();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<SignupInputs>({
		resolver: zodResolver(signupSchema)
	});

	const onSubmit = (data: SignupInputs) => {
		signup(data);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg">
				<h1 className="text-2xl font-bold text-gray-800">Crear cuenta</h1>

				{/* Nombre */}
				<div>
					<label className="block text-sm font-medium text-gray-700">Nombre</label>
					<input
						type="text"
						placeholder="Juan"
						{...register('firstName')}
						className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					{errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
				</div>

				{/* Apellidos */}
				<div>
					<label className="block text-sm font-medium text-gray-700">Apellidos</label>
					<input
						type="text"
						placeholder="Pérez Gómez"
						{...register('lastName')}
						className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					{errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
				</div>

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
					className="w-full rounded-lg bg-green-600 py-2.5 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
				>
					{isPending ? 'Creando cuenta...' : 'Registrarse'}
				</button>

				{/* Error global */}
				{error && <p className="mt-2 text-sm text-red-500">{(error as Error).message}</p>}
			</form>
		</div>
	);
}
