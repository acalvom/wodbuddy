import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import logo from '@/assets/images/logo.png';
import { Button } from '@/common/ui/shade-ui/components/ui/button.tsx';
import { useAuthEvents } from '@/features/auth/ui/controllers/use-auth.events.ts';
import { useGetCurrentUser } from '@/features/auth/ui/controllers/use-get-current-user.hook.ts';
import { useLogout } from '@/features/auth/ui/controllers/use-logout.hook.ts';

export const Header = () => {
	useAuthEvents();
	const navigate = useNavigate();
	const { data: currentUser } = useGetCurrentUser();
	const { mutateAsync: logout } = useLogout();

	const onLogout = async () => {
		await logout();
		navigate('/login');
	};

	return (
		<header className="flex items-center justify-between bg-slate-100 px-6 py-4 shadow-md">
			<Link to="/" className="flex items-center space-x-2">
				<img src={logo} alt="Logo" className="h-8 w-8 cursor-pointer" />
			</Link>

			{currentUser && (
				<div className="flex items-center space-x-4 text-primary">
					<span className="text-sm">{currentUser.email}</span>

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
