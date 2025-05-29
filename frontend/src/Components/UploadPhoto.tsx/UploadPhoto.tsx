import { CheckCircle, Upload } from "lucide-react";
import type { UploadComponentProps } from "../../Types/upload-image.types";
import { useState } from "react";
import { validateImage } from "../../Validation/image.validation";
import toast from "react-hot-toast";
import CropModal from "../CropImage/CropImage";
import ImageCropModal from "../CropImage/CropImage";

// export default ParsedData
export const UploadPhoto: React.FC<UploadComponentProps> = ({
  isProcessing,
  onProcess,
}) => {
  const [frontImage, setFrontImage] = useState<any>(null);
  const [backImage, setBackImage] = useState<any>(null);
  const [frontPreview, setFrontPreview] = useState("");
  const [backPreview, setBackPreview] = useState("");
  const [cropModal, setCropModal] = useState<{
    isOpen: boolean;
    imageSrc: File | null;
    side: string;
  }>({
    isOpen: false,
    imageSrc: null,
    side: "",
  });

  const openCropModal = (file: File, side: string) => {
    const result = validateImage(file);
    if (!result) {
      toast.error("Invalid Image Type");
      return;
    }

    setCropModal({
      isOpen: true,
      imageSrc: file,
      side,
    });
  };

  const handleCropComplete = (croppedImage: File) => {
    if (cropModal.side === "front") {
      setFrontImage(croppedImage);
      setFrontPreview(URL.createObjectURL(croppedImage));
    } else {
      setBackImage(croppedImage);
      setBackPreview(URL.createObjectURL(croppedImage));
    }
  };

  const closeCropModal = () => {
    setCropModal({
      isOpen: false,
      imageSrc: null,
      side: "front",
    });
  };

  //   const setImage = (image: File, side: string) => {
  //     const result = validateImage(image as File);
  //     if (!result) return toast.error("Invalid Image Type");
  //     if (image) {
  //       if (side == "front") {
  //         setFrontImage(image);
  //         setFrontPreview(URL.createObjectURL(image));
  //       } else {
  //         setBackImage(image);
  //         setBackPreview(URL.createObjectURL(image));
  //       }
  //     }
  //   };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const side = e.target.name;
    if (!file) return;
    openCropModal(file, side);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, side: string) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;
    openCropModal(droppedFile, side);
  };

  const onReset = () => {
    setFrontImage(null);
    setFrontPreview("");
    setBackImage(null);
    setBackPreview("");
  };

  const extractImage = async () => {
    await onProcess(frontImage, backImage);
  };

  const UploadArea: React.FC<{
    side: "front" | "back";
    preview: string | null;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }> = ({ side, preview, onUpload }) => (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
        preview
          ? "border-green-400 bg-green-50"
          : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
      }`}
      onDrop={(e) => onDrop(e, side)}
      onDragOver={onDragOver}
    >
      {preview ? (
        <div className="space-y-4">
          <img
            src={preview}
            alt={`${side} side`}
            className="max-w-full max-h-48 mx-auto rounded-lg shadow-md"
          />
          <div className="flex items-center justify-center text-green-600">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">
              {side === "front" ? "Front" : "Back"} side uploaded
            </span>
          </div>
          <input
            type="file"
            hidden
            id={`${side + "-image"}`}
            name={side}
            onChange={onUpload}
          />
          <label
            htmlFor={`${side + "-image"}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Change Image
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Upload {side === "front" ? "Front" : "Back"} Side
            </h3>
            <p className="text-gray-500 mb-4">
              Drag and drop your image here, or click to browse
            </p>
            <input
              type="file"
              hidden
              id={`${side + "-image"}`}
              name={side}
              onChange={onUpload}
            />
            <label
              htmlFor={`${side + "-image"}`}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Choose File
            </label>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white w-[50%] shadow-xl p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Upload Aadhaar Card Images
      </h3>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <UploadArea
          side="front"
          preview={frontPreview}
          onUpload={onImageChange}
        />
        <UploadArea
          side="back"
          preview={backPreview}
          onUpload={onImageChange}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={extractImage}
          disabled={!frontPreview || !backPreview || isProcessing}
          className={`px-8 py-3 rounded-lg font-semibold transition-all ${
            frontPreview && backPreview && !isProcessing
              ? "bg-green-600 text-white hover:bg-green-700 transform hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            "Extract Information"
          )}
        </button>

        <button
          onClick={onReset}
          className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
        >
          Reset
        </button>
      </div>
      <ImageCropModal
        isOpen={cropModal.isOpen}
        onClose={closeCropModal}
        onSave={handleCropComplete}
        imageFile={cropModal.imageSrc}
      />
    </div>
  );
};
