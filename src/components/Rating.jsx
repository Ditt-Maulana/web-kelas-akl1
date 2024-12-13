import * as React from "react"
import { Box, Typography, Slider } from "@mui/material"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import Swal from "sweetalert2"

const RATING_IMAGES = [
  "/Rating/1.png",
  "/Rating/2.png", 
  "/Rating/3.png",
  "/Rating/4.png",
  "/Rating/5.png"
]

const DEFAULT_RATING = 5.0
const MAX_RATINGS = 3

const db = getFirestore()

const Rating = () => {
  const [value, setValue] = React.useState(() => {
    const lastRating = localStorage.getItem("lastRating")
    return lastRating ? parseFloat(lastRating) : DEFAULT_RATING
  })

  const [remainingRatings, setRemainingRatings] = React.useState(() => {
    const remaining = localStorage.getItem("remainingRatings")
    return remaining ? parseInt(remaining, 10) : MAX_RATINGS
  })

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleChange = (_, newValue) => {
    if (typeof newValue === "number" && remainingRatings > 0) {
      setValue(newValue)
    }
  }

  const handleSliderChange = async (_, newValue) => {
    if (typeof newValue !== "number" || remainingRatings <= 0 || isSubmitting) return

    try {
      setIsSubmitting(true)
      setValue(newValue)

      const docRef = await addDoc(collection(db, "ratings"), {
        value: newValue,
        timestamp: new Date(),
      })

      const newRemainingRatings = remainingRatings - 1
      setRemainingRatings(newRemainingRatings)

      // Update localStorage
      localStorage.setItem("lastRating", newValue.toString())
      localStorage.setItem("remainingRatings", newRemainingRatings.toString())

      // Tampilkan feedback ke user
      if (newRemainingRatings === 0) {
        Swal.fire({
          icon: "info",
          title: "Rating Limit Reached",
          text: "You have used all your rating attempts for today",
          customClass: { container: "sweet-alert-container" }
        })
      }

    } catch (error) {
      console.error("Error submitting rating:", error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit rating. Please try again.",
        customClass: { container: "sweet-alert-container" }
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const imgIndex = Math.min(Math.floor(value / 2), RATING_IMAGES.length - 1)

  return (
    <Box 
      sx={{ 
        width: 307,
        opacity: remainingRatings === 0 ? 0.7 : 1,
        transition: 'opacity 0.3s'
      }}
    >
      <Typography id="FixTextPoppins" gutterBottom>
        <div className="flex justify-between text-white relative top-3">
          <div className="font-bold text-xs">RATE US</div>
          <div className="font-bold text-xs">
            {value.toFixed(1)} / 10.0
          </div>
        </div>
      </Typography>

      <div className="flex flex-col items-center mb-3">
        <img
          src={RATING_IMAGES[imgIndex]}
          alt={`Rating ${imgIndex + 1} stars`}
          className="w-10 h-10 transition-transform hover:scale-110"
          id="ImgRating"
        />
        {remainingRatings > 0 && (
          <span className="text-white text-xs mt-2 opacity-70">
            {remainingRatings} ratings remaining
          </span>
        )}
      </div>

      <Slider
        value={value}
        min={0}
        step={0.1}
        max={10}
        color="secondary"
        valueLabelDisplay="off"
        onChange={handleChange}
        onChangeCommitted={handleSliderChange}
        disabled={remainingRatings === 0 || isSubmitting}
        sx={{
          "& .MuiSlider-thumb": {
            height: "1.5rem",
            width: "1.5rem",
            border: "none",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
            "&:hover, &.Mui-focusVisible": {
              boxShadow: "0 0 15px rgba(255, 255, 255, 1)",
              transform: "scale(1.1)",
            },
            transition: "transform 0.2s, box-shadow 0.2s",
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "transparent",
          },
          "& .MuiSlider-track": {
            transition: "background-color 0.3s",
          }
        }}
      />
    </Box>
  )
}

export default Rating
