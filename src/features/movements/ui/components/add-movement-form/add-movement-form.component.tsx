import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputFormItem } from '@/common/ui/custom-components/form-items/input-form-item';
import { SubmitButton } from '@/common/ui/custom-components/form-items/submit-button-item';
import { Form } from '@/common/ui/shade-ui/components/ui/form';
import { type ZodNewMovement, ZodNewMovementSchema } from '@/features/movements/ui/models/zod-new-movement';

type AddMovementFormProps = {
	onSubmit: (data: ZodNewMovement) => Promise<void>;
	isPending?: boolean;
};

export const AddMovementForm = ({ onSubmit, isPending = false }: AddMovementFormProps) => {
	const form = useForm<ZodNewMovement>({
		resolver: zodResolver(ZodNewMovementSchema),
		defaultValues: {
			name: '',
			rm: ''
		}
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="glass w-full max-w-md space-y-6 p-6">
				<InputFormItem control={form.control} name="name" label="Nombre del movimiento" placeholder="Snatch, Clean ..." />

				<InputFormItem control={form.control} name="rm" label="RM (Repetición Máxima)" placeholder="🔥 100.5 kg" />

				<SubmitButton isLoading={isPending}>Añadir movimiento</SubmitButton>
			</form>
		</Form>
	);
};
