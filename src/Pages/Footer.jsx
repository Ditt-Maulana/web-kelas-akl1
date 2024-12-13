import Rating from "../components/Rating"

const SOCIAL_LINKS = [
	{
		name: "Instagram",
		url: "https://www.instagram.com/adi7_ya/",
		icon: "instagram.svg"
	},
	{
		name: "TikTok",
		url: "https://www.tiktok.com/@adtzen",
		icon: "tiktok.svg"
	},
	{
		name: "GitHub",
		url: "https://github.com/Ditt-Maulana",
		icon: "github.svg"
	}
];

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-900" id="Footer">
			<div className="mx-auto w-full max-w-screen-xl px-8 py-6 lg:py-8">
				<div className="md:flex md:justify-between">
					<div className="mb-6 md:mb-0">
						<a 
							href="#" 
							className="flex items-center hover:opacity-90 transition-opacity"
							aria-label="Go to homepage"
						>
							<img
								src="cuy.jpg"
								alt="AKL Logo"
								className="h-[4.5rem] w-[4.5rem] -right-2 relative rounded-full 
										 brightness-200 hover:brightness-150 transition-all"
								loading="lazy"
							/>
						</a>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
						<div>
							<h2 className="mb-4 text-sm font-semibold uppercase text-white">
								CREATED BY Ditt Maulana
							</h2>
							<ul className="text-gray-400 font-medium space-y-2">
								{/* Tambahkan informasi creator jika diperlukan */}
							</ul>
						</div>
						<div>
							<h2 className="mb-4 text-sm font-semibold uppercase text-white">
								Follow us
							</h2>
							<ul className="text-gray-400 font-medium space-y-2">
								{SOCIAL_LINKS.map(({ name, url }) => (
									<li key={name}>
										<a 
											href={url}
											className="hover:underline hover:text-white transition-colors
												 inline-flex items-center gap-2"
											target="_blank"
											rel="noopener noreferrer"
										>
											{name}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div className="hidden md:block">
							<Rating />
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center mt-8 md:hidden">
					<Rating />
				</div>
				<hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
				<div className="flex justify-center sm:justify-between items-center">
					<p className="text-[0.7rem] text-white opacity-70 hover:opacity-100 
								 transition-opacity text-center">
						© {currentYear} Kelas XII AKL 1 | Di Kelola oleh{" "}
						<a 
							href="https://github.com/Ditt-Maulana"
							className="hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							Ditt Maulana
						</a>
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
