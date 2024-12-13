import * as React from "react"
import PropTypes from "prop-types"
import { Backdrop, Box, Modal, Button, Typography } from "@mui/material"
import { useSpring, animated } from "@react-spring/web"
import CloseIcon from "@mui/icons-material/Close"
import UploadImage from "./UploadImage"

const Fade = React.forwardRef(function Fade(props, ref) {
	const { 
		children, 
		in: open, 
		onClick, 
		onEnter, 
		onExited, 
		...other 
	} = props

	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		config: {
			duration: open ? 200 : 50,
		},
		onStart: () => {
			if (open && onEnter) onEnter(null, true)
		},
		onRest: () => {
			if (!open && onExited) onExited(null, true)
		},
	})

	return (
		<animated.div ref={ref} style={style} {...other}>
			{React.cloneElement(children, { onClick })}
		</animated.div>
	)
})

Fade.propTypes = {
	children: PropTypes.element.isRequired,
	in: PropTypes.bool,
	onClick: PropTypes.any,
	onEnter: PropTypes.func,
	onExited: PropTypes.func,
}

const ButtonSend = () => {
	const [open, setOpen] = React.useState(false)

	return (
		<div>
			<Button 
				onClick={() => setOpen(true)}
				className="hover:opacity-90 transition-opacity"
			>
				<div 
					className="flex items-center space-x-2 text-white px-6 py-4" 
					id="SendImg"
				>
					<span className="text-base lg:text-1xl">Send</span>
					<img 
						src="/upload.png" 
						alt="Upload Icon" 
						className="w-6 h-6" 
					/>
				</div>
			</Button>

			<Modal
				aria-labelledby="upload-modal-title"
				aria-describedby="upload-modal-description"
				open={open}
				onClose={() => setOpen(false)}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						TransitionComponent: Fade,
					},
				}}
			>
				<Fade in={open}>
					<Box className="modal-container">
						<Button 
							onClick={() => setOpen(false)}
							className="absolute top-2 right-2"
							sx={{ 
								color: 'grey',
								'&:hover': {
									color: 'white'
								}
							}}
						>
							<CloseIcon />
						</Button>
						
						<Typography 
							id="upload-modal-description" 
							sx={{ mt: 2 }}
						>
							<UploadImage />
						</Typography>
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}

export default ButtonSend
