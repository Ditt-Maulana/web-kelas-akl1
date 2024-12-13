const BoxGallery = ({ onGalleryClick }) => {
	return (
		<div 
			id="BoxGallery" 
			className="cursor-pointer hover:opacity-90 transition-opacity p-4 rounded-lg bg-opacity-10 bg-white"
			onClick={onGalleryClick}
			role="button"
			tabIndex={0}
		>
			<div className="flex justify-between items-center">
				<img 
					src="/upload.png" 
					alt="Upload Icon" 
					className="w-auto h-10" 
					loading="lazy"
				/>
				<img 
					src="/next.png" 
					alt="Next Arrow" 
					className="h-5 w-5" 
					loading="lazy"
				/>
			</div>

			<h1 className="text-white text-xl pr-3 mt-3 font-semibold">
				Class Gallery
			</h1>
		</div>
	)
}

BoxGallery.defaultProps = {
	onGalleryClick: () => {}
};

export default BoxGallery
