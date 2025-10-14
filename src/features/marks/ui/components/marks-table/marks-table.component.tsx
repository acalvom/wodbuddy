import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable
} from '@tanstack/react-table';
import { ArrowUpDown, Target, Trash2, Trophy } from 'lucide-react';
import { useState } from 'react';
import { DateFormatter } from '@/common/domain/date/date';
import { Button } from '@/common/ui/shade-ui/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/common/ui/shade-ui/components/ui/table';
import type { Mark } from '@/features/marks/domain/entities/mark';

// TODO: refactorizar
interface MarksTableProps {
	marks: Mark[];
	isDeletingMark: boolean;
	onDeleteMark: (markId: number, markValue: number) => Promise<void>;
}

export const MarksTable = ({ marks, isDeletingMark, onDeleteMark }: MarksTableProps) => {
	const [sorting, setSorting] = useState<SortingState>([]);

	const columns: ColumnDef<Mark>[] = [
		{
			accessorKey: 'createdOn',
			header: ({ column }) => {
				return (
					<Button
						className="h-auto p-0 hover:bg-transparent font-semibold"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Fecha
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => {
				const date = row.getValue('createdOn') as Date | undefined;
				return date ? DateFormatter.format(date) : 'Sin fecha';
			}
		},
		{
			accessorKey: 'value',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className="h-auto p-0 hover:bg-transparent font-semibold"
					>
						Peso
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => {
				const mark = row.original;
				return (
					<div className="flex items-center gap-2">
						<span className="font-medium">{mark.value} kg</span>
						{mark.isPr && (
							<div className="flex items-center gap-1">
								<Trophy className="h-4 w-4 text-icon-secondary-foreground" />
								<span className="text-xs font-semibold text-icon-secondary-foreground bg-icon-secondary-background px-2 py-0.5 rounded-full">
									PR
								</span>
							</div>
						)}
						{mark.isRm && (
							<div className="flex items-center gap-1">
								<Target className="h-4 w-4 text-icon-primary-foreground" />
								<span className="text-xs font-semibold text-icon-primary-foreground bg-icon-primary-background px-2 py-0.5 rounded-full">
									RM
								</span>
							</div>
						)}
					</div>
				);
			}
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				const mark = row.original;
				return (
					<div className="text-right">
						<Button
							variant="ghost"
							size="sm"
							className="text-destructive hover:text-destructive/80 h-8 w-8 p-0"
							disabled={isDeletingMark}
							onClick={() => onDeleteMark(mark.id, mark.value)}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				);
			}
		}
	];

	const table = useReactTable({
		data: marks || [],
		columns,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: { sorting },
		initialState: {
			pagination: {
				pageSize: 10
			}
		}
	});

	const totalMarks = marks?.length || 0;

	return (
		<div className="w-full">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className="border-b">
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id} className="h-12">
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} className="border-b hover:bg-muted/50" data-state={row.getIsSelected() && 'selected'}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className="py-4">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No hay marcas registradas.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			<div className="mt-8 space-y-4">
				<div className="flex items-center justify-center space-x-8">
					<Button
						className="border-primary"
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Anterior
					</Button>
					<div className="flex items-center space-x-1">
						<p className="text-sm font-medium">
							Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
						</p>
					</div>
					<Button
						className="border-primary"
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Siguiente
					</Button>
				</div>

				<div className="text-center">
					<p className="text-sm text-muted-foreground">
						Mostrando {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} a{' '}
						{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, totalMarks)} de{' '}
						{totalMarks} resultados
					</p>
				</div>
			</div>
		</div>
	);
};
