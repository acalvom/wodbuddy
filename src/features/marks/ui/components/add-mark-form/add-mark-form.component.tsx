import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DatePickerFormItem } from '@/common/ui/custom-components/form-items/datepicker-form-item';
import { InputFormItem } from '@/common/ui/custom-components/form-items/input-form-item';
import { SubmitButton } from '@/common/ui/custom-components/form-items/submit-button-item';
import { Form } from '@/common/ui/shade-ui/components/ui/form';
import { type ZodNewMark, ZodNewMarkFormSchema } from '../../models/zod-new-mark';

type AddMarkFormProps = {
	onSubmit: (data: ZodNewMark) => void;
	isPending?: boolean;
};

export const AddMarkForm = ({ onSubmit, isPending = false }: AddMarkFormProps) => {

	const form = useForm<ZodNewMark>({
		resolver: zodResolver(ZodNewMarkFormSchema),
		defaultValues: {
			value: '',
			createdOn: undefined
		}
	});

	const handleSubmit = (data: ZodNewMark) => {
		onSubmit(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="glass w-full max-w-md space-y-6 p-6">
				<InputFormItem control={form.control} name="value" label="¿Peso?" placeholder="🏋🏻 102.5 kg" />
				<DatePickerFormItem control={form.control} name="createdOn" label="¿Cuándo?" placeholder="DD/MM/YYYY" />
				<SubmitButton isLoading={isPending}>Añadir marca</SubmitButton>
			</form>
		</Form>
	);
};
