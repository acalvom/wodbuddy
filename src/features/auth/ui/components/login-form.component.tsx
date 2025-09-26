import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { Button } from '@/common/ui/shade-ui/components/ui/button.tsx';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/common/ui/shade-ui/components/ui/form.tsx';
import { Input } from '@/common/ui/shade-ui/components/ui/input.tsx';
import { useAuth } from '@/features/auth/ui/hooks/use-auth.hook.tsx';
import { zodToDomain } from '@/features/auth/ui/mappers/zod-to-domain.mapper.ts';
import { type ZodLogin, ZodLoginSchema } from '@/features/auth/ui/models/zod-login.ts';

export function LoginForm() {
	const { onLogin, isLoading, error } = useAuth();
	const form = useForm<ZodLogin>({
		resolver: zodResolver(ZodLoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit = async (data: ZodLogin) => {
		const loginRequest = zodToDomain(data);
		return await onLogin(loginRequest);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-accent">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full max-w-md space-y-6 rounded-2xl bg-background p-8 shadow-lg"
				>
					<h1 className="text-2xl font-bold text-primary">Iniciar sesión</h1>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input className="shadow-sm py-6 mt-1" placeholder="tu@email.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input className="shadow-sm py-6 mt-1" placeholder="••••••" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						disabled={isLoading}
						className="w-full rounded-lg bg-info py-6 text-primary-foreground cursor-pointer"
					>
						{isLoading ? 'Cargando...' : 'Entrar'}
					</Button>

					<p className="mt-4 text-center text-sm text-primary">
						¿No tienes cuenta?{' '}
						<Link to="/signup" className="font-semibold text-info hover:underline">
							Regístrate
						</Link>
					</p>

					{error && <p className="mt-2 text-sm text-destructive">{(error as Error).message}</p>}
				</form>
			</Form>
		</div>
	);
}
