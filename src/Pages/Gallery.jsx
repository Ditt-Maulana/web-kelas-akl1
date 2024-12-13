import React, { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ButtonSend from "../components/ButtonSend"
import ButtonRequest from "../components/ButtonRequest"
import Modal from "@mui/material/Modal"
import { Box, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useSpring, animated } from "@react-spring/web"

// Import semua gambar
import classmeet1 from './classmeet1.jpg'
import classmeet2 from './classmeet2.jpg'
import classmeet3 from './classmeet3.jpg'
import classmeet4 from './classmeet4.jpg'
import classmeet5 from './classmeet5.jpg'
import classmeet6 from './classmeet6.jpg'
import hariguru from './hariguru.jpg'

// Kumpulkan dalam array
const galleryImages = [
	classmeet1,
	classmeet2,
	classmeet3,
	classmeet4,
	classmeet5,
	classmeet6,
	hariguru
]

const Carousel = () => {
	const [selectedImage, setSelectedImage] = useState(null)
	const [open, setOpen] = useState(false)

	const settings = {
		centerMode: true,
		centerPadding: "30px",
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		dots: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: "50px",
					slidesToShow: 1,
					dots: false,
				},
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: "70px",
					slidesToShow: 1,
					dots: false,
				},
			},
		],
	}

	return (
		<>
			<div className="text-white opacity-60 text-base font-semibold mb-4 mx-[10%] mt-10 lg:text-center lg:text-3xl lg:mb-8" id="Gallery">
				Class Gallery
			</div>
			<div id="Carousel">
				<Slider {...settings}>
					{galleryImages.map((image, index) => (
						<img
							key={index}
							src={image}
							alt={`Gallery image ${index + 1}`}
							onClick={() => {
								setSelectedImage(image)
								setOpen(true)
							}}
							className="cursor-pointer hover:opacity-90 transition-opacity w-full h-64 object-cover"
						/>
					))}
				</Slider>
			</div>

			<div className="flex justify-center items-center gap-6 text-base mt-5 lg:mt-8">
				<ButtonSend />
				<ButtonRequest />
			</div>

			<Modal
				open={open}
				onClose={() => {
					setOpen(false)
					setSelectedImage(null)
				}}
				aria-labelledby="image-modal"
				aria-describedby="image-modal-description"
				className="flex justify-center items-center">
				<animated.div
					style={{
						maxWidth: "90vw",
						maxHeight: "auto",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						position: "relative",
					}}
					className="p-2 rounded-lg">
					<IconButton
						edge="end"
						color="inherit"
						onClick={() => {
							setOpen(false)
							setSelectedImage(null)
						}}
						aria-label="close"
						sx={{
							position: "absolute",
							top: "12px",
							right: "23px",
							backgroundColor: "white",
							borderRadius: "50%",
						}}>
						<CloseIcon />
					</IconButton>
					<div className="w-full">
						<img
							src={selectedImage}
							alt="Selected Image"
							style={{ maxWidth: "100%", maxHeight: "100vh" }}
						/>
					</div>
				</animated.div>
			</Modal>
		</>
	)
}

export default Carousel
