const BoxClassIg = () => {
	const INSTAGRAM_URL = "https://www.instagram.com/xiiaccountingone_1/?hl=id";
	
	return (
		<div id="BoxClassIg">
			<a 
				href={INSTAGRAM_URL}
				className="relative block transition-opacity hover:opacity-90"
				target="_blank"
				rel="noopener noreferrer"
			>
				<div className="flex justify-between relative ">
					<img src="/Instagram.svg" alt="" className="w-auto h-10" />
					<img src="/next.png" alt="" className="h-4 w-4" />
				</div>
				<h1 className="text-white text-lg font-semibold pr-3 mt-3 absolute bottom-10">
					Class Instagram
				</h1>
				<div className="text-white flex py-2 opacity-60 absolute bottom-1 text-xs">View More</div>
			</a>
		</div>
	)
}

export default BoxClassIg
