import { AlertTriangle, CheckCircle, Info, XCircle, XIcon } from 'lucide-react';
import { type JSX, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/common/ui/shade-ui/components/ui/button';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

type TypeConfig = Record<ToastType, { icon: JSX.Element; className: string }>;

const typeConfig: TypeConfig = {
	success: {
		icon: <CheckCircle size={20} />,
		className: 'bg-success text-white'
	},
	error: {
		icon: <XCircle size={20} />,
		className: 'bg-destructive text-white'
	},
	info: {
		icon: <Info size={20} />,
		className: 'bg-info text-white'
	},
	warning: {
		icon: <AlertTriangle size={20} />,
		className: 'bg-warning text-white'
	}
};

export interface ToastProps {
	type: ToastType;
	title: string;
	description?: string;
	open: boolean;
}

export const Toast = ({ type, title, description, open }: ToastProps) => {
	useEffect(() => {
		if (open) {
			toast.custom(
				(t) => (
					<div role="alert" className={`flex items-start gap-3 rounded shadow-lg px-4 py-3 ${typeConfig[type].className}`}>
						<div className="pt-1">{typeConfig[type].icon}</div>
						<div>
							<div className="text-sm font-bold">{title}</div>
							{description && <div className="text-xs mt-1">{description}</div>}
						</div>
						<Button variant="ghost" onClick={() => toast.dismiss(t.id)} className="pt-1">
							<XIcon />
						</Button>
					</div>
				),
				{
					duration: 2000
				}
			);
		}
	}, [open, type, title, description]);
	return null;
};
