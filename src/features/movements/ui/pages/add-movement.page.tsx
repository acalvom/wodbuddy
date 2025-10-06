import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Title } from '@/common/ui/custom-components/title/title.tsx';
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
import { useAddNewMovement } from '@/features/movements/ui/controllers/use-add-new-movement.hook.ts';
import { zodToDomain } from '@/features/movements/ui/mappers/zod-to-domain.mapper.ts';
import { type ZodNewMovement, ZodNewMovementSchema } from '@/features/movements/ui/models/zod-new-movement.ts';

export const AddMovementPage = () => {
	const { user } = useAuth();
	const { mutateAsync: createMovement, isPending } = useAddNewMovement();

	const form = useForm<ZodNewMovement>({
		resolver: zodResolver(ZodNewMovementSchema),
		defaultValues: {
			name: '',
			rm: ''
		}
	});

	const onSubmit = async (data: ZodNewMovement) => {
		if (!user?.id) return;
		const newMovement = zodToDomain(data, user.id);

		console.log('Datos válidos:', newMovement);
		return await createMovement(newMovement);
	};

	return (
		<div className="min-h-screen bg-background px-4 py-6">
			<div className="container mx-auto max-w-sm">
				<Title className="text-center">Nuevo Movimiento</Title>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="glass w-full space-y-6 p-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-foreground font-medium text-sm mb-2 block">Nombre del movimiento</FormLabel>
									<FormControl>
										<Input
											className="bg-card border-border text-foreground placeholder:text-muted-foreground 
											focus:ring-primary focus:border-primary py-4 px-4 text-base rounded-xl
											h-12 w-full touch-manipulation"
											placeholder="Snatch, Clean ..."
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-xs mt-1" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="rm"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-foreground font-medium text-sm mb-2 block">RM (Repetición Máxima)</FormLabel>
									<FormControl>
										<Input
											className="bg-card border-border text-foreground placeholder:text-muted-foreground 
											focus:ring-primary focus:border-primary py-4 px-4 text-base rounded-xl
											h-12 w-full touch-manipulation"
											placeholder="100.5 kg"
											inputMode="decimal"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-xs mt-1" />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							disabled={isPending}
							className="glow w-full py-4 px-6 text-base font-semibold mt-8 
							h-12 rounded-xl touch-manipulation active:scale-95 transition-transform"
						>
							Añadir movimiento
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};
