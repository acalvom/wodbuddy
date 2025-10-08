import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/images/colored-icon.svg';
import { useScroll } from '@/common/ui/hooks/use-scroll.hook';
import { Button } from '@/common/ui/shade-ui/components/ui/button.tsx';
import { useAuth } from '@/features/auth/ui/hooks/use-auth.hook.tsx';

export const Header = () => {
	const { isAuthenticated, user, onLogout } = useAuth();
	const isScrolled = useScroll(10);

	return (
		<header
			className={`sticky top-0 z-50 w-full glass-header flex items-center justify-between px-4 py-3 shadow-lg border-b border-border/30 backdrop-blur-md ${isScrolled ? 'scrolled' : ''}`}
		>
			<Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity touch-manipulation">
				<img src={logo} alt="Logo" className="h-7 w-7 cursor-pointer drop-shadow-lg" />
			</Link>

			{isAuthenticated && (
				<div className="flex items-center space-x-3">
					<span className="text-xs text-foreground/90 font-medium truncate max-w-[120px]">{user?.email}</span>

					<Button
						className="glow text-xs font-medium px-3 py-2 transition-all duration-200 h-8 active:scale-95"
						variant="ghost"
						size="sm"
						onClick={onLogout}
					>
						<LogOut strokeWidth={2} className="mr-1 h-3 w-3" />
						Salir
					</Button>
				</div>
			)}
		</header>
	);
};
