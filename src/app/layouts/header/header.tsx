import { LogOut } from 'lucide-react';
import { Link } from 'react-router';
import logo from '@/assets/images/logo.png';
import { Button } from '@/common/ui/shade-ui/components/ui/button.tsx';
import { useAuth } from '@/features/auth/ui/hooks/use-auth.hook.tsx';

export const Header = () => {
	const { isAuthenticated, user, onLogout } = useAuth();

	return (
		<header className="flex items-center justify-between bg-sidebar px-6 py-4 shadow-md">
			<Link to="/" className="flex items-center space-x-2">
				<img src={logo} alt="Logo" className="h-8 w-8 cursor-pointer" />
			</Link>

			{isAuthenticated && (
				<div className="flex items-center space-x-4 text-primary">
					<span className="text-sm">{user?.email}</span>

					<Button
						className=" bg-sidebar-primary cursor-pointer text-sm text-sidebar-primary-foreground  hover:bg-sidebar-accent transition"
						variant="ghost"
						size="sm"
						onClick={onLogout}
					>
						<LogOut strokeWidth={2} /> Log Out
					</Button>
				</div>
			)}
		</header>
	);
};
