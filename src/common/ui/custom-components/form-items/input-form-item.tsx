import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/common/ui/shade-ui/components/ui/form';
import { Input } from '@/common/ui/shade-ui/components/ui/input';

interface InputFormItemProps<T extends FieldValues> {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
	placeholder?: string;
	type?: string;
	className?: string;
}

export const InputFormItem = <T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	type = 'text',
	className
}: InputFormItemProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className="text-foreground font-medium text-sm mb-2 block">
						{label}
					</FormLabel>
					<FormControl>
						<Input
							className={`bg-card border-border text-foreground placeholder:text-muted-foreground 
									focus:ring-primary focus:border-primary py-4 px-4 text-base rounded-xl
									h-12 w-full touch-manipulation ${className || ''}`}
							placeholder={placeholder}
							type={type}
							{...field}
						/>
					</FormControl>
					<FormMessage className="text-xs mt-1" />
				</FormItem>
			)}
		/>
	);
};