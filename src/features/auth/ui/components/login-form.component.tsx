import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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
import { type ZodLogin, ZodLoginSchema } from '@/features/auth/ui/models/zod-login.ts';

type LoginFormProps = {
	onSubmit: (data: ZodLogin) => Promise<void>;
	isLoading?: boolean;
};

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
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

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-foreground font-medium text-sm mb-2 block">Email</FormLabel>
							<FormControl>
								<Input
									className="bg-card border-border text-foreground placeholder:text-muted-foreground 
											focus:ring-primary focus:border-primary py-4 px-4 text-base rounded-xl
											h-12 w-full touch-manipulation"
									placeholder="tu@email.com"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-xs mt-1" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-foreground font-medium text-sm mb-2 block">Contraseña</FormLabel>
							<FormControl>
								<Input
									type="password"
									className="bg-card border-border text-foreground placeholder:text-muted-foreground 
											focus:ring-primary focus:border-primary py-4 px-4 text-base rounded-xl
											h-12 w-full touch-manipulation"
									placeholder="••••••••"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-xs mt-1" />
						</FormItem>
					)}
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
}
