import BoxClassIg from "../components/BoxClassIg"
import BoxOldWeb from "../components/BoxOldWeb"
import BoxTextAnonim from "../components/BoxTextAnonim"
import Navbar from "../components/Navbar"



const Home = () => {
	return (
		<div className="relative w-full h-screen" id="Home">
			<img 
				src="/aesthetic.jpg" 
				alt="Welcome" 
				className="absolute inset-0 w-full h-full object-cover" 
			/>
			<Navbar className="fixed top-0 left-0 w-full z-20" />
			<div className="relative z-10 flex flex-col justify-center items-center h-full text-center mt-20">
				<h5 className="text-[1.4rem] font-semibold text-white">Hi, Visitor!</h5>
				<h1 className="text-7xl font-extrabold text-white" id="Glow">WELCOME</h1>
				<h6 className="text-sm text-white" style={{ letterSpacing: "5px" }}>
					TO XII AKL 1
				</h6>
			</div>
		</div>
	)
}

export default Home
