import React, { useState } from "react"

const NAV_ITEMS = [
	{ href: "#", label: "Home" },
	{ href: "#Gallery", label: "Gallery" },
	{ href: "#Tabs", label: "Structure & Schedule" }
];

const NavLink = ({ href, children, className }) => (
	<li className="mb-4">
		<a 
			href={href}
			className={`text-white opacity-80 hover:opacity-100 transition-opacity ${className}`}
		>
			{children}
		</a>
	</li>
);

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<>
			{/* Mobile Navigation */}
			<nav className="flex justify-between relative top-3 lg:hidden">
				<button 
					className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-white/10 transition-colors"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-label="Toggle menu"
				>
					<img 
						src="/NavIcon.png" 
						alt="Menu" 
						className="w-6 h-6" 
					/>
				</button>

				<div className={`text-center text-white ${isMenuOpen ? "hidden" : ""}`}>
					<div className="text-[0.7rem]">Hi, VISITOR!</div>
					<div className="font-bold text-[1rem]">WELCOME</div>
				</div>

				<div className="w-10 h-10 rounded-full flex justify-center items-center">
					<img 
						src="/user.svg" 
						alt="User Profile" 
						className="w-6 h-6" 
					/>
				</div>

				{/* Backdrop */}
				{isMenuOpen && (
					<div 
						className="fixed inset-0 bg-black/50 z-10"
						onClick={() => setIsMenuOpen(false)}
						aria-hidden="true"
					/>
				)}

				{/* Mobile Menu */}
				<div
					className={`fixed top-0 left-0 h-full w-64 shadow-lg transform 
								transition-transform duration-300 ease-in-out bg-gray-900/95
								${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
					id="IsiNavbar"
				>
					<ul className="mt-8 px-6">
						{NAV_ITEMS.map(({ href, label }) => (
							<NavLink 
								key={label}
								href={href}
								className="text-lg font-bold"
							>
								{label}
							</NavLink>
						))}
					</ul>
				</div>
			</nav>

			{/* Desktop Navigation */}
			<nav className="flex justify-between relative top-3 hidden lg:flex">
				<div>
					<img 
						src="/akl.png" 
						className="w-12 h-12 rounded-full" 
						alt="Logo" 
					/>
				</div>
				<ul className="mt-2 flex gap-5">
					{NAV_ITEMS.map(({ href, label }) => (
						<NavLink 
							key={label}
							href={href}
							className="text-[1rem] font-semibold"
						>
							{label}
						</NavLink>
					))}
				</ul>
			</nav>
		</>
	)
}

export default Navbar
