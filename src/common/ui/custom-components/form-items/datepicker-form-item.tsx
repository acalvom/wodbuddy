import { CalendarIcon } from 'lucide-react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { DateFormatter } from '@/common/domain/date/date';
import { cn } from '@/common/ui/shade-ui/components/lib/utils';
import { Button } from '@/common/ui/shade-ui/components/ui/button';
import { Calendar } from '@/common/ui/shade-ui/components/ui/calendar';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/common/ui/shade-ui/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/common/ui/shade-ui/components/ui/popover';

interface DatePickerFormItemProps<T extends FieldValues> {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
	placeholder?: string;
	className?: string;
	minDate?: Date;
	maxDate?: Date;
}

export const DatePickerFormItem = <T extends FieldValues>({
	control,
	name,
	label,
	placeholder = 'DD/MM/YYYY',
	className,
	minDate = new Date('1900-01-01'),
	maxDate = new Date()
}: DatePickerFormItemProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel className="text-foreground font-medium text-sm mb-2 block">
						{label}
					</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant="outline"
									className={cn(
										'bg-card border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary py-4 px-4 text-base rounded-xl h-12 w-full touch-manipulation justify-start text-left font-normal',
										!field.value && 'text-muted-foreground',
										className
									)}
								>
									{field.value ? DateFormatter.format(field.value) : <span>{placeholder}</span>}
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={field.value}
								onSelect={field.onChange}
								disabled={(date) => date > maxDate || date < minDate}
								captionLayout="dropdown"
							/>
						</PopoverContent>
					</Popover>
					<FormMessage className="text-xs mt-1" />
				</FormItem>
			)}
		/>
	);
};