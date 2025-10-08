import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/images/w-bar-logo.svg';
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
			<Link
				to="/"
				className="flex items-center space-x-3 hover:scale-105 transition-all duration-300 touch-manipulation group"
			>
				<img
					src={logo}
					alt="Logo"
					className="h-7 w-7 cursor-pointer drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
				/>
				<span className="hidden md:block text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent tracking-tight drop-shadow-sm hover:drop-shadow-md transition-all duration-300 animate-pulse-slow">
					wodbuddy
				</span>
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
