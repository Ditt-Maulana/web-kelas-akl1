import React, { useState, useEffect, useCallback } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_UPLOADS_PER_DAY = 20;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

function UploadImage() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const showError = useCallback((text) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text,
      customClass: { container: "sweet-alert-container" }
    });
  }, []);

  const listImages = useCallback(async () => {
    try {
      const imageListRef = ref(storage, "images/");
      const response = await listAll(imageListRef);
      const urls = await Promise.all(
        response.items.map(item => getDownloadURL(item))
      );
      setImageList(urls);
    } catch (error) {
      console.error("Error listing images:", error);
      showError("Failed to load images");
    }
  }, [showError]);

  useEffect(() => {
    listImages();
  }, [listImages]);

  const validateUpload = useCallback(() => {
    if (!imageUpload) return false;

    const uploadedImagesCount = parseInt(localStorage.getItem("uploadedImagesCount")) || 0;
    const lastUploadDate = localStorage.getItem("lastUploadDate");
    const isNewDay = lastUploadDate && 
      new Date(lastUploadDate).toDateString() !== new Date().toDateString();

    if (isNewDay) {
      localStorage.setItem("uploadedImagesCount", "0");
    }

    if (uploadedImagesCount >= MAX_UPLOADS_PER_DAY) {
      showError("You have reached the maximum uploads for today.");
      return false;
    }

    if (imageUpload.size > MAX_FILE_SIZE) {
      showError("The maximum size for a photo is 10MB");
      return false;
    }

    if (!ACCEPTED_TYPES.includes(imageUpload.type)) {
      showError("Please upload only JPG, PNG or GIF images");
      return false;
    }

    return true;
  }, [imageUpload, showError]);

  const uploadImage = async () => {
    if (!validateUpload()) return;

    try {
      setIsUploading(true);
      const uploadedImagesCount = parseInt(localStorage.getItem("uploadedImagesCount")) || 0;
      const imageRef = ref(storage, `images/${imageUpload.name}-${uuidv4()}`);
      
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      
      setImageList(prev => [...prev, url]);
      localStorage.setItem("uploadedImagesCount", (uploadedImagesCount + 1).toString());
      localStorage.setItem("lastUploadDate", new Date().toISOString());
      
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your image has been successfully uploaded.",
        customClass: { container: "sweet-alert-container" }
      });
      
      setImageUpload(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      showError("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setImageUpload(file);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center mb-4">
        <h1 className="text-1xl md:text-2xl md:px-10 font-bold mb-4 w-full text-white">
          Upload Your Classroom Memories
        </h1>
      </div>

      <div className="mx-auto p-4">
        <form onSubmit={e => e.preventDefault()}>
          <div className="mb-4">
            <input 
              type="file" 
              id="imageUpload" 
              className="hidden" 
              onChange={handleImageChange}
              accept={ACCEPTED_TYPES.join(',')}
            />
            <label
              htmlFor="imageUpload"
              className="cursor-pointer border-dashed border-2 border-gray-400 
                       rounded-lg p-4 w-56 h-auto flex items-center justify-center
                       hover:border-gray-300 transition-colors"
            >
              {imageUpload ? (
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={URL.createObjectURL(imageUpload)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="text-center px-5 py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-12 w-12 mx-auto text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <p className="text-white opacity-60">
                    Click to select an image
                  </p>
                  <p className="text-white opacity-40 text-xs mt-2">
                    Max size: 10MB
                  </p>
                </div>
              )}
            </label>
          </div>
        </form>
      </div>

      <button
        type="button"
        disabled={!imageUpload || isUploading}
        onClick={uploadImage}
        className={`
          py-2.5 w-[60%] mb-0 md:mb-2 text-sm font-medium rounded-lg
          transition-all duration-200 focus:outline-none focus:ring-4
          ${isUploading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-white hover:bg-gray-100 hover:text-blue-700'
          }
          dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
          dark:hover:text-white dark:hover:bg-gray-700
        `}
      >
        {isUploading ? 'UPLOADING...' : 'UPLOAD'}
      </button>
    </div>
  );
}

export default UploadImage;
