import React, { useEffect, useState } from "react"
import { Backdrop, Box, Modal, Typography } from "@mui/material"
import { useSpring, animated } from "@react-spring/web"
import CloseIcon from "@mui/icons-material/Close"
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from "firebase/storage"

const ButtonRequest = () => {
	const [open, setOpen] = useState(false)
	const [images, setImages] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const fade = useSpring({
		opacity: open ? 1 : 0,
		config: { duration: 200 }
	})

	const fetchImagesFromFirebase = async () => {
		try {
			setIsLoading(true)
			setError(null)
			
			const storage = getStorage()
			const storageRef = ref(storage, "images/")
			const imagesList = await listAll(storageRef)

			const imagePromises = imagesList.items.map(async (item) => {
				const [url, metadata] = await Promise.all([
					getDownloadURL(item),
					getMetadata(item)
				])

				return {
					url,
					timestamp: metadata.timeCreated
				}
			})

			const imageURLs = await Promise.all(imagePromises)
			setImages(imageURLs.sort((a, b) => a.timestamp - b.timestamp))
		} catch (error) {
			console.error("Error fetching images:", error)
			setError("Gagal memuat gambar. Silakan coba lagi.")
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchImagesFromFirebase()
	}, [])

	const handleRefresh = () => {
		fetchImagesFromFirebase()
	}

	return (
		<div>
			<button
				onClick={() => setOpen(true)}
				className="flex items-center space-x-2 text-white px-6 py-4 hover:opacity-90 transition-opacity"
				id="SendRequest"
			>
				<img 
					src="/Request.png" 
					alt="Request Icon" 
					className="w-6 h-6 relative bottom-1" 
				/>
				<span className="text-base lg:text-1xl">Request</span>
			</button>

			<Modal
				aria-labelledby="request-modal-title"
				aria-describedby="request-modal-description"
				open={open}
				onClose={() => setOpen(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}
			>
				<animated.div style={fade}>
					<Box className="modal-container">
						<CloseIcon
							className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-gray-200 transition-colors"
							onClick={() => setOpen(false)}
						/>
						
						<Typography id="request-modal-description" sx={{ mt: 2 }}>
							<h6 className="text-center text-white text-2xl mb-5">Request</h6>
							
							<div className="h-[22rem] overflow-y-scroll overflow-y-scroll-no-thumb">
								{isLoading ? (
									<div className="text-white text-center py-4">Memuat...</div>
								) : error ? (
									<div className="text-red-400 text-center py-4">{error}</div>
								) : images.length === 0 ? (
									<div className="text-white text-center py-4">Belum ada request</div>
								) : (
									[...images].reverse().map((imageData, index) => (
										<div
											key={`image-${index}`}
											className="flex justify-between items-center px-5 py-2 mt-2 hover:bg-white/5 transition-colors"
											id="LayoutIsiButtonRequest"
										>
											<img
												src={imageData.url}
												alt={`Request ${index + 1}`}
												className="h-10 w-10 blur-sm"
												loading="lazy"
											/>
											<span className="ml-2 text-white">
												{new Date(imageData.timestamp).toLocaleString('id-ID')}
											</span>
										</div>
									))
								)}
							</div>

							<div className="flex justify-between items-center mt-5">
								<div className="text-white text-[0.7rem]">
									Note: Jika tidak ada gambar yang sudah anda upload silahkan refresh
								</div>
								<button 
									onClick={handleRefresh}
									className="text-white text-sm hover:underline"
									disabled={isLoading}
								>
									{isLoading ? 'Memuat...' : 'Refresh'}
								</button>
							</div>
						</Typography>
					</Box>
				</animated.div>
			</Modal>
		</div>
	)
}

export default ButtonRequest
