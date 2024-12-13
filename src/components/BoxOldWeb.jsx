const BoxOldWeb = () => {
	const OLD_WEBSITE_URL = "https://smkswadaya.sch.id/";

	return (
		<div id="BoxOldWeb">
			<a 
				href={OLD_WEBSITE_URL}
				className="block hover:opacity-90 transition-opacity"
				target="_blank"
				rel="noopener noreferrer"
			>
				<div className="flex justify-between items-center">
					<img 
						src="/link.png" 
						alt="Link Icon" 
						className="w-auto h-6" 
					/>
					<img 
						src="/next.png" 
						alt="Next Arrow" 
						className="h-3 w-3" 
					/>
				</div>

				<h1 className="text-white text-base font-semibold pr-0 mt-5">
					Website Sekolah
				</h1>
			</a>
		</div>
	);
};

export default BoxOldWeb;
