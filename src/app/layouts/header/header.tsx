import { LogOut } from 'lucide-react';
import { Link } from 'react-router';
import logo from '@/assets/images/logo.png';
import { Button } from '@/common/ui/shade-ui/components/ui/button.tsx';
import { useAuth } from '@/features/auth/ui/hooks/use-auth.hook.tsx';

export const Header = () => {
	const { isAuthenticated, user, onLogout } = useAuth();

	return (
		<header className="flex items-center justify-between bg-slate-100 px-6 py-4 shadow-md">
			<Link to="/" className="flex items-center space-x-2">
				<img src={logo} alt="Logo" className="h-8 w-8 cursor-pointer" />
			</Link>

			{isAuthenticated && (
				<div className="flex items-center space-x-4 text-primary">
					<span className="text-sm">{user?.email}</span>

					<Button
						className=" bg-slate-200  cursor-pointer text-sm text-primary font-normal hover:bg-slate-300 transition"
						variant="ghost"
						size="sm"
						onClick={onLogout}
					>
						<LogOut strokeWidth={1.5} /> Log Out
					</Button>
				</div>
			)}
		</header>
	);
};
