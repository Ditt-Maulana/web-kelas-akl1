import * as React from "react"
import PropTypes from "prop-types"
import { Backdrop, Box, Modal, Button, Typography } from "@mui/material"
import { useSpring, animated } from "@react-spring/web"
import CloseIcon from "@mui/icons-material/Close"
import Chat from "./ChatAnonim"

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

const BoxTextAnonim = () => {
	const [open, setOpen] = React.useState(false)
	
	return (
		<div>
			<div 
				onClick={() => setOpen(true)}
				className="cursor-pointer hover:opacity-90 transition-opacity"
			>
				<div id="BoxTextAnonim">
					<div className="flex justify-between items-center">
						<img 
							src="/paper-plane.png" 
							alt="Paper Plane Icon" 
							className="w-auto h-6" 
						/>
						<img 
							src="/next.png" 
							alt="Next Arrow" 
							className="h-3 w-3" 
						/>
					</div>
					<h1 className="capitalize text-white text-left pr-5 text-base font-semibold mt-5">
						Text Anonim
					</h1>
				</div>
			</div>

			<Modal
				aria-labelledby="anonymous-text-modal"
				aria-describedby="anonymous-text-chat"
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
					<Box id="modal-container-chat">
						<Button 
							onClick={() => setOpen(false)}
							className="absolute top-[2%] right-0"
							sx={{ 
								color: 'white', 
								opacity: 0.7,
								'&:hover': {
									opacity: 1
								}
							}}
						>
							<CloseIcon />
						</Button>
						<Typography 
							id="anonymous-text-chat" 
							sx={{ mt: 3 }}
						>
							<Chat />
						</Typography>
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}

export default BoxTextAnonim

